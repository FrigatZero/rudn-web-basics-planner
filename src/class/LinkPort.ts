import { CircleShape } from "./CircleShape";
import { Node } from "./Node";

export class LinkPort extends CircleShape {
    public readonly key: number;
    public side: string;
    
    constructor(
        key: number,
        side: string = 'east'
    ){
        super();
        this.key = key;
        this.side = side;
    }
}