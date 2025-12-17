import { Link, Position } from "../Types";
import { BoxShape } from "./BoxShape";
import { CircleShape } from "./CircleShape";
import { LinkPort } from "./LinkPort";

export class Node extends BoxShape {
    public readonly key: number;
    public linkPorts: Map<number, LinkPort> = new Map([
        [0, new LinkPort(0)],
    ]);
    
    constructor(
        key: number,
        position?: Position,
    ){
        super(position);
        this.key = key;
    }

    draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        // Draw Link ports if present
        for (const port of this.linkPorts.values()){
            if (port.side === 'east'){
                port.position = {
                    x: this.position.x + this.size.width + 4,
                    y: this.position.y + this.size.height/2,
                }
            }
            port.draw(ctx);
        }
    }
    drawText(ctx: CanvasRenderingContext2D){
        ctx.font = "30px system-ui";
        ctx.fillStyle = "#000000"
        ctx.fillText(String(this.key), this.position.x, this.position.y + this.size.height);
    }

}   