type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag,
}
  
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;   // ? 表示 createAt 可以不存在
}

interface Window{
    
}

type Tag = {
    id: string;
    name: string;
}

type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name:string) => 'success' | 'duplicated';   // 联合类型
    update:(id:string,name:string) => 'success' | 'duplicated' | 'not found';
    remove:(id:string) => boolean;
    save: () => void
}