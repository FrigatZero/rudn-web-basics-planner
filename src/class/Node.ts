import { BoxShape } from "./BoxShape";
import { CircleShape } from "./CircleShape";
import { LinkHost } from "./LinkHost";

export class Node extends BoxShape {
    public readonly key: number;
    public linkHostArray: LinkHost[] = [];
    
    constructor(key: number){
        super();
        this.key = key;
    }

    draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx);
        let count = 0;
        // Draw Link hosts if present
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