
import { Relation } from "./Relation";
import { Box } from "away-core/Box";
import { Expect } from "away-core/Expect";
import { OnException } from "away-core/OnException";
import { EqualsByThreeEquals } from "./EqualsByThreeEquals";

export class Arrays{

    static UnboxArray<Item extends Box<any>>(array:Item[]) {
        return array.map(a=>a.getData());
    }
    
    static Includes<Item>(
        array:Item[],
        item:Item,
        doCompare:Relation=EqualsByThreeEquals,
    ){
        return array.some(
            a=>doCompare(a,item)
        );
    }

    static PushIfNotIncludes<Item>(
        array:Item[],
        item:Item,
        doCompare:Relation=EqualsByThreeEquals,
    ){
        if(!Arrays.Includes(array,item,doCompare)){
            array.push(item);
        }
    }
    
    static GetFirst<Item>(array:Item[],onEmptyArray:OnException){
        Expect(array.length,"Array was empty.",onEmptyArray);
        return array[0];
    }

    static GetLast<Item>(array:Item[],onEmptyArray:OnException){
        Expect(array.length,"Array was empty.",onEmptyArray);
        return array.slice(-1)[0];
    }

    static GetRandom<Item>(array:Item[],onEmptyArray:OnException){
        Expect(array.length,"Array was empty.",onEmptyArray);
        const index = Math.floor(Math.random()*array.length);
        return array[index];
    }

    static PushManyIfNotIncludes<Item>(array:Item[],itemsToPush:Item[],doCompare:Relation=EqualsByThreeEquals){
        for(const aItem of itemsToPush){
            Arrays.PushIfNotIncludes(array,aItem,doCompare);
        }
    }

    /** Return a version of the array without duplicates. */
    static MakeUnique<Item>(array:Item[], doCompare:Relation=EqualsByThreeEquals){
        const result:Item[] = [];
        for(const a of array){
            Arrays.PushIfNotIncludes(result,a,doCompare);
        }
        return result;
    }

    /** Returns this array, excluding any items that appear in itemsToExclude. */
    static GetExclusion<Item>(array:Item[], itemsToExclude:any[],doCompare:Relation=EqualsByThreeEquals){
        const exclusion:Item[] = [];
        for(const a of array){
            if(!Arrays.Includes(itemsToExclude,a,doCompare)){
                exclusion.push(a);
            }
        }
        return exclusion;
    }

    /** Returns the elements that are present in both arrays. */
    static GetIntersection<Item>(array:Item[], b:any[],doCompare:Relation=EqualsByThreeEquals) {
        const intersection:Item[] = [];
        for(const a of array){
            if(Arrays.Includes(b,a,doCompare)){
                intersection.push(a);
            }
        }
        return intersection;
    }
    static Intersects<Item>(array:Item[], b:any[],doCompare:Relation=EqualsByThreeEquals) {
        return Arrays.GetIntersection(array,b,doCompare).length!==0;
    }

    static GetItem<Item>(array:Item[], index:number, onOutOfRange:OnException){
        const item = array[index];
        Expect(item,`Index out of range.`,onOutOfRange);
        return item;
    }
    
    static ContainsDuplicates(array:any[], doCompare:Relation=EqualsByThreeEquals){
        for(const aItem of array){
            const matchingItems = array.filter(
                b=>doCompare(aItem,b)
            );
            if(matchingItems.length>1){
                return true;
            }
        }    
        return false;
    }

    static GetSum(array:any[],onEmptyArray:OnException){
        Expect(array.length,"Array was empty.",onEmptyArray);
        return array.reduce(
            (sum,current)=>sum+current,
            0
        )
    }

    static GetAverage(array:any[],onEmptyArray:OnException){
        Expect(array.length,"Array was empty.",onEmptyArray);
        return Arrays.GetSum(array,onEmptyArray)/array.length;
    }
    
    static GetMax(array:any[],onEmptyArray:OnException){
        Expect(array.length,"Array was empty.",onEmptyArray);
        let max = +array[0];
        for(const a of array){
            if(a>max){
                max=a;
            }
        }
        return max;
    }
    
}