import { Position, Size } from "../Types";

export class BoxShape {
    public position: Position;
    public size: Size;
    public color: string;

    constructor(
        position: Position = {x: 0, y: 0}, 
        size: Size = {width: 100, height: 70},
        color: string = "#FFFFFF",
    ) {
        this.position = position;
        this.size = size;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.roundRect(this.position.x, this.position.y, this.size.width, this.size.height, 8);
        ctx.stroke();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(this.position.x, this.position.y, this.size.width, this.size.height, 8);
        ctx.fill();
        ctx.closePath();
    }
    drawBorder(ctx: CanvasRenderingContext2D, color: string = "#0f99f5ff", radius: number = 4.5) {
        ctx.strokeStyle = color;
        ctx.lineWidth = radius*2;
        ctx.beginPath();
        ctx.roundRect(this.position.x, this.position.y, this.size.width, this.size.height, 8);
        ctx.stroke();

        this.draw(ctx);
    }
}