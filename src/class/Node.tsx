import { BoxShape } from "./BoxShape";

export class Node extends BoxShape{
    public readonly key;

    constructor(key: number){
        super();
        this.key = key;
    }

}