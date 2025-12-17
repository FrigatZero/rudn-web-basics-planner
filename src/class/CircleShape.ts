import { Position, Size } from "../Types";

export class CircleShape {
    public position: Position;
    public radius: number;
    public color: string;

    constructor(
        position: Position = {x: 0, y: 0},
        radius: number = 5,
        color: string = "#FFFFFF",
    ) {
        this.position = position;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D) {
        // ctx.fillStyle = "#000000"
        // ctx.lineWidth = 5;
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, this.radius + 2, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.closePath();
        // ctx.fillStyle = this.color;
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.closePath();
    }
    // drawBorder(ctx: CanvasRenderingContext2D) {
    //     ctx.strokeStyle = "#0f99f5ff"
    //     ctx.lineWidth = 9;
    //     ctx.beginPath();
    //     ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    //     ctx.stroke();
    //     ctx.closePath();
    //     this.draw(ctx);
    // }
}