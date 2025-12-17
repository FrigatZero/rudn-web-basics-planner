import React, { useRef } from "react";
import { CanvasEngine } from "../class/CanvasEngine";

export interface CanvasRenderProps {
    canvasWidth: number;
    canvasHeight: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvasEngine: React.RefObject<CanvasEngine>;
}

export function CanvasRender(props: CanvasRenderProps){
    const handlePointerDown = (e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.current?.handlePointerDown(x, y);
    }
    const handlePointerMove = (e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.current?.handlePointerMove(x, y);
    }
    const handlePointerUp = (e: React.PointerEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.current?.handlePointerUp(x, y);
    }
    const handleWheel = (e: React.WheelEvent) => {
        const { deltaY } = e
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.current?.handleWheel(deltaY, x, y);
    }
    const handleDoubleClick = (e: React.MouseEvent) => {
        const x = e.clientX - e.currentTarget.getBoundingClientRect().x
        const y = e.clientY - e.currentTarget.getBoundingClientRect().y

        props.canvasEngine.current?.handleDoubleClick(x, y);
    }
    return <canvas 
                className='canvas' 
                style={{
                    width:  "100%",
                    height: "100%"
                }}
                width={props.canvasWidth} 
                height={props.canvasHeight}
                ref={props.canvasRef}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                onPointerCancel={handlePointerUp}
                onWheel={handleWheel}
                onDoubleClick={handleDoubleClick}
            />
}