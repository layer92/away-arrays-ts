import { Relation } from "./Relation";

export const EqualsByValueOf:Relation = (a:any,b:any)=>a.valueOf()===b.valueOf();