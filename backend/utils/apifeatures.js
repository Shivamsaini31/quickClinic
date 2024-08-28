const { json } = require("express");

class Apifeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: "i", // "i" for case insensitive
                  },
              }
            : {};

        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter(){
       const querycopy={...this.queryStr};
       const removefields=["keyword","page","limit"];
removefields.forEach((key)=>delete querycopy[key]);
let queryStr=JSON.stringify(querycopy);
queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);
const parsedQuery = JSON.parse(queryStr);
this.query = this.query.find(parsedQuery);

return this;

    }

    pagination(resultperpage){
const currentperpage=(this.queryStr.page)|| 1;
const skip=resultperpage*(currentperpage-1);
this.query=this.query.limit(resultperpage).skip(skip);
return this;
    }
}

module.exports = Apifeatures;
