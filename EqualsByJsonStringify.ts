import { Relation } from "./Relation";

export const EqualsByJsonStringify:Relation = (a:any,b:any)=>JSON.stringify(a)===JSON.stringify(b);