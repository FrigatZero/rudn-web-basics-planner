import { useRef } from "react";

export default function TestPage() {
    const canvasRef = useRef(null);

    function clickHandler() {
        const canvas = canvasRef.current;
        const ctx = canvasRef.current.getContext("2d"); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100, 100);
        ctx.closePath();
        ctx.stroke();
    }

    return <>
        <canvas ref={canvasRef}>
            
        </canvas>

        <button onClick={clickHandler}>Click me</button>
    </>
}