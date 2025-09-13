import { Query } from 'mongoose';
interface QueryString {
    keyword?: string;
    page?: string;
    limit?: string;
    [key: string]: any;
}
declare class Apifeatures {
    private query;
    private queryStr;
    constructor(query: Query<any[], any>, queryStr: QueryString);
    search(): Apifeatures;
    filter(): Apifeatures;
    pagination(resultperpage: number): Apifeatures;
}
export default Apifeatures;
//# sourceMappingURL=apifeatures.d.ts.map