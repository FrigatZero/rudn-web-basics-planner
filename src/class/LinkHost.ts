import { CircleShape } from "./CircleShape";
import { Node } from "./Node";

export class LinkHost extends CircleShape {
    public readonly key: number;
    public isOccupied: boolean;
    public owner: number | null = null;
    
    constructor(
        key: number,
        isOccupied: boolean = false,
        owner: number | null = null,
    ){
        super();
        this.key = key;
        this.isOccupied = isOccupied;
        this.owner = owner;
    }
}