import { Position, Size } from "../Types";

export class BoxShape {
    public position: Position = {x: 0, y: 0};
    public size: Size = {width: 100, height: 70};
    public color: string = "#FFFFFF";

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(this.position.x, this.position.y, this.size.width, this.size.height, 3);
        ctx.fill();
        ctx.closePath();
    }
    drawBorder(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "#0f99f5ff"
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.roundRect(this.position.x, this.position.y, this.size.width, this.size.height, 4);
        ctx.stroke();
        ctx.closePath();
        this.draw(ctx);
    }
}