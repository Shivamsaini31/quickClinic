import { Query } from 'mongoose';

interface QueryString {
  keyword?: string;
  page?: string;
  limit?: string;
  [key: string]: any;
}

class Apifeatures {
  private query: Query<any[], any>;
  private queryStr: QueryString;

  constructor(query: Query<any[], any>, queryStr: QueryString) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): Apifeatures {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // "i" for case insensitive
          },
        }
      : {};

    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter(): Apifeatures {
    const querycopy = { ...this.queryStr };
    const removefields = ["keyword", "page", "limit"];
    removefields.forEach((key) => delete querycopy[key]);
    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    const parsedQuery = JSON.parse(queryStr);
    this.query = this.query.find(parsedQuery);

    return this;
  }

  pagination(resultperpage: number): Apifeatures {
    const currentperpage = Number(this.queryStr.page) || 1;
    const skip = resultperpage * (currentperpage - 1);
    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
  }
}

export default Apifeatures;