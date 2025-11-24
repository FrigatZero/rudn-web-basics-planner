import { useRef } from "react";
import { Position, Size } from "../Types";
import { Node } from "./Node";



export class CanvasEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private objects: Node[] = [];
    private currentBox: Node | null = null;

    private initMousePos: Position = {x: 0, y: 0};
    private startPos: Position = {x: 0, y: 0};
    private isDown: boolean = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        
        this.objects = [
            new Node(0)
        ]

        this.render();
    }

    searchShapeInPoint(_x: number, _y: number) {
        this.objects.map(b => {
            if (b.position.x <= _x &&
                b.position.x + b.size.width >= _x &&
                b.position.y <= _y &&
                b.position.y + b.size.height >= _y
            ) {this.currentBox = b; return}
        })
    }
    handlePointerDown = (_x: number, _y: number) => {
        this.searchShapeInPoint(_x, _y)
        if (!this.currentBox) return;

        this.objects.push(
            this.objects.splice(this.objects.findIndex(
                x => x.key == this.currentBox!.key
            ), 1)[0]
        )

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

    appendNode(b: Node) {
        this.objects.push(b);
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        

        // ///////////////////
        const first = this.objects.find(x => x.key == 0) || this.objects[0];
        const firstIndx = this.objects.findIndex(x => x.key == first.key);
        const fposx = first.position.x + first.size.width/2;
        const fposy = first.position.y + first.size.height;
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "#000000"
        
        this.ctx.beginPath();
        this.ctx.moveTo(fposx, fposy);
        this.objects.map(x => {
            this.ctx.lineTo(x.position.x + x.size.width/2, x.position.y + x.size.height/2);
            this.ctx.moveTo(fposx, fposy);
        })
        this.ctx.closePath();
        this.ctx.stroke();
        // /////////////////// 

        this.objects.map(b => {
            this.ctx.strokeStyle = "#0f99f5ff"
            this.ctx.lineWidth = 10;
            this.ctx.strokeRect(b.position.x, b.position.y, b.size.width, b.size.height);
            this.ctx.fillStyle = b.color;
            this.ctx.fillRect(b.position.x, b.position.y, b.size.width, b.size.height);

            this.ctx.font = "30px system-ui";
            this.ctx.fillStyle = "#000000"
            this.ctx.fillText(String(b.key), b.position.x, b.position.y + b.size.height);
        })
    }
}