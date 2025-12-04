import { Position, Link } from "../Types";
import { Node } from "./Node";



export class CanvasEngine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private captured: Node | null = null;
    private initMousePos: Position = {x: 0, y: 0};
    private startPos: Position = {x: 0, y: 0};
    private isDown: boolean = false;

    private nodeArray: Node[] = [];
    private linkArray: Link[] = [
        {from: 1, to: 4},
        {from: 1, to: 5},
        {from: 1, to: 0},
        {from: 2, to: 4},
    ];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        
        this.nodeArray = [
            new Node(0)
        ]
        this.render();
    }

    nodeInPoint(_x: number, _y: number): boolean {
        this.captured = this.nodeArray.findLast(node => 
            node.position.x <= _x &&
            node.position.x + node.size.width >= _x &&
            node.position.y <= _y &&
            node.position.y + node.size.height >= _y 
        ) || null
        return !!this.captured
    }
    
    moveTop(): boolean {
        if (!this.captured) return false;

        const currentIndex = this.nodeArray.findLastIndex(x => x.key == this.captured!.key);
        if (currentIndex == -1 || currentIndex == (this.nodeArray.length - 1)) return false;

        this.nodeArray.push(
            this.nodeArray.splice(currentIndex, 1)[0]
        )
        return true;
    }

    handlePointerDown = (_x: number, _y: number) => {
        this.nodeInPoint(_x, _y);
        this.moveTop();
        if (!this.isDown && !!this.captured) {
            this.isDown = true;
            this.initMousePos.x = _x;
            this.initMousePos.y = _y;
            this.startPos.x = this.captured!.position.x;
            this.startPos.y = this.captured!.position.y;

            this.render();
        }
    }
    handlePointerUp = (_x: number, _y: number) => {
        this.isDown = false;
        this.initMousePos.x = 0;
        this.initMousePos.y = 0;
        
        this.render();
        // this.captured = null;
    }
    handlePointerMove = (_x: number, _y: number) => {
        if (this.isDown) {
            const dx = _x - this.initMousePos.x;
            const dy = _y - this.initMousePos.y;
            this.captured!.position = {x: this.startPos.x + dx, y: this.startPos.y + dy}
            this.render();
        }
    }

    // Add Node to the Node Array
    addNode(b: Node) {
        this.nodeArray.push(b);
        this.render();
    }

    // Main render method
    render() {
        console.log("render")
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Load Links if present
        if (this.linkArray.length > 0) {
            this.linkArray.map(link => {
                const parent = this.nodeArray.find(x => x.key == link.from)
                const child = this.nodeArray.find(x => x.key == link.to)
                if (parent && child){

                    this.ctx.lineWidth = 4;
                    this.ctx.strokeStyle = "#000000"
                    this.ctx.beginPath();
                    this.ctx.moveTo(parent.position.x, parent.position.y);
                    this.ctx.lineTo(child.position.x, child.position.y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            })
        }
        // Load Nodes if present
        if (this.nodeArray.length > 0) {
            this.nodeArray.map(node => {
                if (this.captured?.key == node.key) {this.captured.drawBorder(this.ctx)}
                node.draw(this.ctx);

                this.ctx.font = "30px system-ui";
                this.ctx.fillStyle = "#000000"
                this.ctx.fillText(String(node.key), node.position.x, node.position.y + node.size.height);
            })
        }   
    }
}