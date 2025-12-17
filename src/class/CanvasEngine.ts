import { Position, Link } from "../Types";
import { LinkPort } from "./LinkPort";
import { Node } from "./Node";


export class CanvasEngine {
    /* ==========================
     * Canvas Context
     * ========================== */
    public canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    /* ==========================
     * Viewport Parameters
     * ========================== */
    private readonly SCROLL_SENSITIVITY = 0.0008;
    private readonly MIN_ZOOM = 1;
    private readonly MAX_ZOOM = 3;
    private transform = {
        originX:   0,
        originY:   0,
        zoomLevel: 1
    }

    /* ==========================
     * Interaction State
     * ========================== */
    private draggedNode: Node | null = null;
    private startMousePosition: Position = {x: 0, y: 0};
    private currentMousePosition: Position = {x: 0, y: 0}
    private nodeStartPosition: Position = {x: 0, y: 0};
    private isMouseDown: boolean = false;
    private isDraggedLocked: boolean = false;
    
    /* ==========================
     * Engine Data Storage
     * ========================== */
    private nodes: Map<number, Node> = new Map();
    private links: Map<number, Link> = new Map();
    private nodeZIndex: number[] = [];
    private nextLinkId: number = 0;

    /* ==========================
     * Engine Constructor
     * ========================== */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        
        this.addNode(new Node(0, {x: 100, y: 100}));
        this.addNode(new Node(1, {x: 300, y: 100}));

        this.addLink(1, 2);
        this.addLink(1, 0);

        this.render();
    }

    /* ==========================
     * Interaction Handlers
     * ========================== */
    handlePointerDown = (screenX: number, screenY: number) => {
        const { x: canvasX, y: canvasY } = this.screenToCanvas(screenX, screenY, this.transform)

        if (this.isDraggedLocked) {
            const node = this.getNodeAt(canvasX, canvasY);
            if (node && this.draggedNode) {
                this.addLink(
                    this.draggedNode.key,
                    node.key
                )
            }
        } else if (!this.isMouseDown) {
            this.isMouseDown = true;
            this.startMousePosition.x = canvasX;
            this.startMousePosition.y = canvasY;

            this.draggedNode = this.getNodeAt(canvasX, canvasY);
            if (this.draggedNode) {
                this.moveNodeToFront(this.draggedNode.key);
                this.nodeStartPosition.x = this.draggedNode.position.x;
                this.nodeStartPosition.y = this.draggedNode.position.y;

                this.render();
            }
        }
    }

    handleDoubleClick = (screenX: number, screenY: number) => {
        if (this.draggedNode) {
            const { x: canvasX, y: canvasY } = this.screenToCanvas(screenX, screenY, this.transform)
            this.currentMousePosition = { x: canvasX, y: canvasY }
            this.isDraggedLocked = true
            this.render()
        }
    }

    handlePointerUp = (screenX: number, screenY: number) => {
        this.isMouseDown = false;
        this.isDraggedLocked = false;
        this.startMousePosition.x = 0;
        this.startMousePosition.y = 0;
        
        this.render();
    }

    handleWheel = (wheelDeltaY: number, screenX: number, screenY: number) => {
        const { originX, originY, zoomLevel } = this.transform
        
        const newZoomLevel = Math.min(
            Math.max(
                zoomLevel * (1 + wheelDeltaY * this.SCROLL_SENSITIVITY), 
                this.MIN_ZOOM
            ), 
            this.MAX_ZOOM
        )

        const newOriginX = screenX - newZoomLevel*(screenX - originX)/zoomLevel
        const newOriginY = screenY - newZoomLevel*(screenY - originY)/zoomLevel
        this.transform = {
            originX: newOriginX,
            originY: newOriginY,
            zoomLevel: newZoomLevel
        }

        this.render();
    }

    handlePointerMove = (screenX: number, screenY: number) => {
        const { x: canvasX, y: canvasY } = this.screenToCanvas(screenX, screenY, this.transform)
        if (this.isDraggedLocked) {
            this.currentMousePosition = { x: canvasX, y: canvasY }
            this.render()
        }
        else if (this.isMouseDown) {
            const deltaX = canvasX - this.startMousePosition.x;
            const deltaY = canvasY - this.startMousePosition.y;

            if (this.draggedNode) {
                this.draggedNode!.position = {
                    x: this.nodeStartPosition.x + deltaX, 
                    y: this.nodeStartPosition.y + deltaY
                }

                this.render();
            } else {
                this.transform.originX += deltaX
                this.transform.originY += deltaY

                this.render();
            }
        }
    }

    /* ==========================
     * Node Manipulation
     * ========================== */
    getNodeAt(canvasX: number, canvasY: number): Node | null {
        for (let i = this.nodeZIndex.length - 1; i >= 0; --i){
            const node = this.nodes.get(this.nodeZIndex[i]);
            if (!node) continue;
            
            if (
                node.position.x                    <= canvasX &&
                node.position.x + node.size.width  >= canvasX &&
                node.position.y                    <= canvasY &&
                node.position.y + node.size.height >= canvasY 
            ){
                return node;
            }
        }
        return null;
    }
    
    moveNodeToFront(nodeKey: number): boolean {
        const node = this.nodes.get(nodeKey);
        if (!node) {return false;}

        const currentIndex = this.nodeZIndex.indexOf(nodeKey)
        if (currentIndex == -1 || currentIndex == (this.nodeZIndex.length - 1)) return false;

        this.nodeZIndex.push(
            this.nodeZIndex.splice(currentIndex, 1)[0]
        )

        return true;
    }
    // Add Node to the Node Map
    addNode(node: Node) {
        this.nodes.set(node.key, node);
        this.nodeZIndex.push(node.key);
    }
    // Add Link to the Link Map
    addLink(fromNode: number, toNode: number) {
        const link = {
            key: ++this.nextLinkId,
            from: fromNode,
            to: toNode,
            fromPort: 0,
            toPort: 0,
        }
        this.links.set(link.key, link);
    }

    /* ==========================
     * Canvas Rendering
     * ========================== */
    // Main render method
    render() {
        // Set ctx transform
        this.setTransform(this.transform)
        // Clear canvas
        this.clearCanvas();
        // Draw Links if present
        this.drawLinks();
        // Draw Nodes if present
        this.drawNodes();
    
    }

    /* ==========================
     * Canvas Drawing
     * ========================== */
    private clearCanvas(): void {
        this.ctx.fillStyle = '#000000'
        this.ctx.fillRect(-10000, -10000, 20000, 20000)

        this.ctx.clearRect(
            -this.transform.originX/this.transform.zoomLevel,
            -this.transform.originY/this.transform.zoomLevel, 
            this.canvas.width, 
            this.canvas.height
        );
    }
    private drawArrow(
        fromX: number, 
        fromY: number, 
        toX: number, 
        toY: number,
        arrowSize: number
    ): void {
        const moveAndDraw = (x: number, y: number) => {
            this.ctx.lineTo(x, y);
            this.ctx.moveTo(x, y);
        }
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        const angle = Math.atan2(toY - fromY, toX - fromX)
        moveAndDraw(
            toX - arrowSize * Math.cos(angle - Math.PI/6),
            toY - arrowSize * Math.sin(angle - Math.PI/6)
        )
        moveAndDraw(
            toX,
            toY
        )
        moveAndDraw(
            toX - arrowSize * Math.cos(angle + Math.PI/6),
            toY - arrowSize * Math.sin(angle + Math.PI/6)
        )
        this.ctx.moveTo(toX - arrowSize * Math.cos(angle - Math.PI/6), toY - arrowSize * Math.sin(angle - Math.PI/6))
        this.ctx.arcTo(toX, toY, 
            toX - arrowSize * Math.cos(angle + Math.PI/6), toY - arrowSize * Math.sin(angle + Math.PI/6), arrowSize*0.6
        )

        this.ctx.stroke();
        this.ctx.closePath();
    }
    private drawLinks(): void {
        const moveAndDraw = (x: number, y: number) => {
            this.ctx.lineTo(x, y);
            this.ctx.moveTo(x, y);
        }

        if (this.isDraggedLocked) {
            const parent = this.draggedNode
            if (parent){
                const parentPort = parent.linkPorts.get(0)
                if (parentPort){
                    this.ctx.lineWidth = 4;
                    this.ctx.strokeStyle = "#000000"
                    this.ctx.lineCap = 'round'
                    this.ctx.beginPath();
                    
                    const fromX = parentPort.position.x
                    const fromY = parentPort.position.y
                    const toX = this.currentMousePosition.x
                    const toY = this.currentMousePosition.y
                    
                    this.ctx.moveTo(parentPort.position.x, parentPort.position.y);
                    moveAndDraw(toX, toY)
                    this.ctx.stroke();

                    this.drawArrow(fromX, fromY, toX, toY, 12)
                }
            }   
        }

        for (const link of this.links.values()){
            const parent = this.nodes.get(link.from)
            const child = this.nodes.get(link.to)

            if (parent && child){
                let parentPort = parent.linkPorts.get(link.fromPort)
                let childPort = child.linkPorts.get(link.toPort)

                parent.draw(this.ctx)
                child.draw(this.ctx) 

                if (parentPort && childPort){
                    this.ctx.lineWidth = 4;
                    this.ctx.strokeStyle = "#000000"
                    this.ctx.lineCap = 'round'
                    this.ctx.beginPath();
                    
                    const fromX = parentPort.position.x
                    const fromY = parentPort.position.y
                    const toX = childPort.position.x
                    const toY = childPort.position.y
                    
                    this.ctx.moveTo(parentPort.position.x, parentPort.position.y);
                    moveAndDraw(childPort.position.x, childPort.position.y)
                    this.ctx.stroke();

                    this.drawArrow(fromX, fromY, toX, toY, 12)
                }
            }
        }
    }
    private drawNodes(): void {
        for (let i = 0; i < this.nodeZIndex.length; ++i){
            const node = this.nodes.get(this.nodeZIndex[i]);
            node?.draw(this.ctx);
            node?.drawText(this.ctx);
        }

        if (this.draggedNode){
            if (this.isDraggedLocked) {
                this.draggedNode.drawBorder(this.ctx, "#ff17ec", 9);    
            } else {
                this.draggedNode.drawBorder(this.ctx);
            }
            this.draggedNode.drawText(this.ctx);
        }
    }

    /* ==========================
     * Canvas Transform
     * ========================== */
    private setTransform(
        transform: {
            originX: number, 
            originY: number, 
            zoomLevel: number, 
        }
    ): void {
        const rotate = 0;
        const { originX, originY, zoomLevel } = transform;
        const xAxisX = Math.cos(rotate) * zoomLevel;
        const xAxisY = Math.sin(rotate) * zoomLevel;
        this.ctx.setTransform(xAxisX, xAxisY, -xAxisY, xAxisX, originX, originY);
    }
    private screenToCanvas(
        screenX: number, 
        screenY: number,
        transform: {
            originX: number, 
            originY: number, 
            zoomLevel: number, 
        }
    ): Position {
        const { originX, originY, zoomLevel } = transform;
        const canvasX = (screenX - originX) / zoomLevel;
        const canvasY = (screenY - originY) / zoomLevel;
        return { x: canvasX, y: canvasY };
    }
    
}