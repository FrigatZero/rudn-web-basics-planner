import { useRef } from "react";

interface Position {
    x: number;
    y: number;
}
interface Size {
    width: number;
    height: number;
}
interface Box {
    key: number;
    position: Position;
    size: Size;
    color: string;
}


export class CanvasEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private box: Box[] = [];
    private currentBox: Box | null = null;

    private initMousePos: Position = {x: 0, y: 0};
    private startPos: Position = {x: 0, y: 0};
    private isDown: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        
        this.box = [
            {
                key: 0,
                position: {x: 100, y: 100},
                size: {width: 100, height: 70},
                color: "#FFFFFF"
            }
        ]

        this.render();
    }

    searchBoxInPoint(_x: number, _y: number) {
        this.box.map(b => {
            if (b.position.x <= _x &&
                b.position.x + b.size.width >= _x &&
                b.position.y <= _y &&
                b.position.y + b.size.height >= _y
            ) {this.currentBox = b; return}
        })
    }
    handlePointerDown = (_x: number, _y: number) => {
        this.searchBoxInPoint(_x, _y)
        if (!this.currentBox) return;
        if (!this.isDown) {
            this.isDown = true;
            this.initMousePos.x = _x;
            this.initMousePos.y = _y;
            this.startPos.x = this.currentBox.position.x;
            this.startPos.y = this.currentBox.position.y;
        }
    }
    handlePointerUp = (_x: number, _y: number) => {
        this.isDown = false;
        this.initMousePos.x = 0;
        this.initMousePos.y = 0;
        this.currentBox = null;
    }
    handlePointerMove = (_x: number, _y: number) => {
        console.log(this.currentBox, this.isDown)
        if (this.isDown) {
            const dx = _x - this.initMousePos.x;
            const dy = _y - this.initMousePos.y;
            this.currentBox!.position = {x: this.startPos.x + dx, y: this.startPos.y + dy}
        }
    }

    appendBox(b: Box) {
        this.box.push(b);
        this.render();
    }

    experimental() {

    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const first = this.box[0];
        const fposx = first.position.x + first.size.width/2;
        const fposy = first.position.y + first.size.height;

        this.ctx.lineWidth = 4;
        
        this.ctx.beginPath();
        this.ctx.moveTo(fposx, fposy);
        this.box.slice(1).map(x => {
            this.ctx.lineTo(x.position.x + x.size.width/2, x.position.y + x.size.height/2);
            this.ctx.moveTo(fposx, fposy);
        })
        this.ctx.closePath();
        this.ctx.stroke();


        this.box.map(b => {
            this.ctx.fillStyle = b.color;
            this.ctx.fillRect(b.position.x, b.position.y, b.size.width, b.size.height);

            this.ctx.font = "30px system-ui";
            this.ctx.fillStyle = "#000000"
            this.ctx.fillText(String(b.key), b.position.x, b.position.y + b.size.height);
        })
    }
}