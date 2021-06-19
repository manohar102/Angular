export interface INote{
    note_id:number,
    title: string;
    content: string;
    created_date: Date,
    remainder: boolean,
    remainder_date: Date,
    uid: number
}
export class Note implements INote {
    note_id :number;
    title: string;
    content: string;
    created_date: Date;
    remainder: boolean;
    remainder_date: Date;
    uid: number;

    constructor(id:number,title:string,content:string,creation_date:Date,remainder:boolean,remainder_date:Date,uid:number){
        this.note_id=id;
        this.title=title;
        this.content=content;
        this.created_date=creation_date;
        this.remainder=remainder;
        this.remainder_date=remainder_date;
        this.uid=uid;
    }
}
