type RecordItem = {
    tags:string[];
    notes:string;
    type:string;
    amount:number;
    createdAt?:Date;   // ? 表示 createAt 可以不存在
}
