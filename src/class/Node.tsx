import { BoxShape } from "./BoxShape";
import { CircleShape } from "./CircleShape";

export class Node extends BoxShape{
    public readonly key: number;
    public linkHostArray: CircleShape[] = [
        new CircleShape(
            {
                x: this.position.x + this.size.width,
                y: this.position.y + this.size.height / 2,
            },
            5
        ),
        new CircleShape(
            {
                x: this.position.x + this.size.width,
                y: this.position.y + this.size.height / 2,
            },
            5
        ),
        new CircleShape(
            {
                x: this.position.x + this.size.width,
                y: this.position.y + this.size.height / 2,
            },
            5
        ),
        
    ];
    
    constructor(key: number){
        super();
        this.key = key;
    }

    draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        let count = 0;
        // Draw Link hosts if
        if (this.linkHostArray.length > 0){
            this.linkHostArray.map(host => {

                host.position = {
                    x: this.position.x + this.size.width,
                    y: this.position.y + this.size.height / (2*this.linkHostArray.length) + count,
                }
                count += this.size.height / this.linkHostArray.length;

                host.draw(ctx);
            })

        }
    }

}   