import React from "react";
import { CanvasEngine } from "../../class/CanvasEngine";

export interface CanvasRenderProps {
    canvasWidth: number;
    canvasHeight: number;
    canvasRef: React.Ref<HTMLCanvasElement>;
    canvasEngine: CanvasEngine;
}

export function CanvasRender(props: CanvasRenderProps){
    const handlePointerDown = (e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.handlePointerDown(x, y);
    }
    const handlePointerMove = (e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.handlePointerMove(x, y);
        props.canvasEngine.render();
    }
    const handlePointerUp = (e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.handlePointerUp(x, y);
    }
    return <canvas 
                className='canvas' 
                style={{
                    width: "100%",
                    height: "100%"
                }}
                width={props.canvasWidth} 
                height={props.canvasHeight}
                ref={props.canvasRef}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                onPointerCancel={handlePointerUp}
            />
}