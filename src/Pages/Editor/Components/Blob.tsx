import React from "react";
import { TestComponentProps } from "./test";
import { CONFIG } from "./config.jsx"

export interface BlobProps {
    parentProps: TestComponentProps;
    side: number;
}

export const Blob = (props: BlobProps) => {
    const blobRef = React.useRef<HTMLDivElement>(null);
    const parent = props.parentProps;

    const blobX = ():number => {
        switch(props.side){
                case CONFIG.TOP_LEFT:  case CONFIG.BOTTOM_LEFT:  return - (CONFIG.BLOB_SIZE/2);
                case CONFIG.TOP_RIGHT: case CONFIG.BOTTOM_RIGHT: return parent.size.width - (CONFIG.BLOB_SIZE/2);
                default: return 0;
            }
    }
    const blobY = ():number => {
        switch(props.side){
                case CONFIG.TOP_LEFT:    case CONFIG.TOP_RIGHT:    return - (CONFIG.BLOB_SIZE/2);
                case CONFIG.BOTTOM_LEFT: case CONFIG.BOTTOM_RIGHT: return parent.size.height - (CONFIG.BLOB_SIZE/2);
                default: return 0;
            }
    }

    // обработка событий Blob
    const isBlobDown = React.useRef<boolean>(false);
    const handleBlobDown = (e: React.PointerEvent) => {
        // e.preventDefault();
        e.stopPropagation();
        if (isBlobDown) {
            isBlobDown.current = true;
            blobRef.current?.setPointerCapture(e.pointerId);
        }
    }
    const handleBlobUp = (e: React.PointerEvent) => {
        isBlobDown.current = false;
        blobRef.current?.releasePointerCapture(e.pointerId);
    }
    const handleBlobMove = (e: React.PointerEvent) => {
        if(isBlobDown.current) {
            switch(props.side){
                case CONFIG.TOP_LEFT:
                    parent.onResize(parent.id, {width: parent.size.width - e.movementX, height: parent.size.height - e.movementY});
                    parent.onPositionChange(parent.id, {x: parent.position.x + e.movementX, y: parent.position.y + e.movementY});
                    break;
                case CONFIG.TOP_RIGHT: 
                    parent.onResize(parent.id, {width: parent.size.width + e.movementX, height: parent.size.height - e.movementY});
                    parent.onPositionChange(parent.id, {x: parent.position.x, y: parent.position.y + e.movementY});
                    break;
                case CONFIG.BOTTOM_LEFT:
                    parent.onResize(parent.id, {width: parent.size.width - e.movementX, height: parent.size.height + e.movementY});
                    parent.onPositionChange(parent.id, {x: parent.position.x + e.movementX, y: parent.position.y});
                    break;
                case CONFIG.BOTTOM_RIGHT:
                    parent.onResize(parent.id, {width: parent.size.width + e.movementX, height: parent.size.height + e.movementY});
                    parent.onPositionChange(parent.id, {x: parent.position.x, y: parent.position.y});
                    break;

            }
            
        }
    }

    return <div 
                className="Blob"
                onPointerDown={handleBlobDown}
                onPointerUp={handleBlobUp}
                onPointerMove={handleBlobMove}
                onPointerCancel={handleBlobUp}
                ref={blobRef}

                style={{
                    width:           CONFIG.BLOB_SIZE,
                    height:          CONFIG.BLOB_SIZE,
                    backgroundColor: "brown",
                    borderRadius:    CONFIG.BLOB_SIZE*0.2,
                    position:        "absolute",
                    left:            blobX(),
                    top:             blobY()
                }}
            >
    </div>
}