import React, { useRef } from "react";
import { IPosition, ISize } from "../BoxInteractionController.tsx";
import { CORNER, BLOB_SIZE } from "../config.ts"
import './Blob.css';
import classNames from "classnames";

export interface BlobProps {
    parentId: number;
    parentPosition: IPosition;
    parentSize: ISize;
    onPositionChange(id: number, newPosition: IPosition): void;
    onResize(id: number, newSize: ISize): void;
    corner: CORNER;
}

export const Blob = (props: BlobProps) => {
    const blobRef = useRef<HTMLDivElement>(null);
    const initMousePos = useRef<IPosition>({x: 0, y: 0});
    const startPos = useRef<IPosition>({x: 0, y: 0});
    const startSize = useRef<ISize>({width: 0, height: 0});
    // обработка событий Blob
    const isBlobDown = React.useRef<boolean>(false);
    const handleBlobDown = (e: React.PointerEvent) => {
        e.stopPropagation();
        if (isBlobDown) {
            isBlobDown.current = true;
            initMousePos.current.x = e.clientX;
            initMousePos.current.y = e.clientY;
            startPos.current.x = props.parentPosition.x;
            startPos.current.y = props.parentPosition.y;
            startSize.current.width = props.parentSize.width;
            startSize.current.height = props.parentSize.height;
            blobRef.current?.setPointerCapture(e.pointerId);
        }
    }
    const handleBlobUp = (e: React.PointerEvent) => {
        isBlobDown.current = false;
        initMousePos.current.x = 0;
        initMousePos.current.y = 0;
        blobRef.current?.releasePointerCapture(e.pointerId);
    }
    const handleBlobMove = (e: React.PointerEvent) => {
        const dx = e.clientX - initMousePos.current.x;
        const dy = e.clientY - initMousePos.current.y;
        const doResize = (newWidth: number, newHeight: number, newX: number, newY: number) => {
            var oldWidth, oldHeight = props.parentSize;
            var oldX, oldY = props.parentPosition;
            props.onResize(
                props.parentId, 
                {
                    width: newWidth, 
                    height: newHeight
                }
            );
            props.onPositionChange(
                props.parentId, 
                {
                    x: newX,
                    y: newY
                }
            );
        }
        if(isBlobDown.current) {
            switch(props.corner){
                case CORNER.TOP_LEFT:
                    doResize(
                        startSize.current.width  - dx,
                        startSize.current.height - dy,
                        startPos.current.x  + dx,
                        startPos.current.y  + dy
                    )
                    break;
                case CORNER.TOP_RIGHT: 
                    doResize(
                        startSize.current.width  + dx,
                        startSize.current.height - dy,
                        startPos.current.x,
                        startPos.current.y  + dy
                    )
                    break;
                case CORNER.BOTTOM_LEFT:
                    doResize(
                        startSize.current.width  - dx,
                        startSize.current.height + dy,
                        startPos.current.x  + dx,
                        startPos.current.y
                    )
                    break;
                case CORNER.BOTTOM_RIGHT:
                    doResize(
                        startSize.current.width  + dx,
                        startSize.current.height + dy,
                        startPos.current.x,
                        startPos.current.y
                    )
                    break;
            }    
        }
    }
    const classBySide = (corner: CORNER) => {
        switch (corner) {
            case CORNER.TOP_LEFT: return '_topLeft'
            case CORNER.TOP_RIGHT: return '_topRight'
            case CORNER.BOTTOM_LEFT: return '_bottomLeft'
            case CORNER.BOTTOM_RIGHT: return '_bottomRight'
            default: return null;
        }
    }
    return <div 
                className={classNames( 
                    "Blob",
                    classBySide(props.corner)
                )} 
                onPointerDown={handleBlobDown}
                onPointerUp={handleBlobUp}
                onPointerMove={handleBlobMove}
                onPointerCancel={handleBlobUp}
                ref={blobRef}

                style={{
                    ['--size']: BLOB_SIZE + 'px',
                    borderRadius:    "20%",
                    position:        "absolute",
                } as React.CSSProperties}
            >
    </div>
}