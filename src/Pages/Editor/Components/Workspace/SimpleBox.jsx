import './SimpleBox.css'
import { BoxInteractionController } from './BoxInteractionController';

export function SimpleBox(props) {
    //
    //
    // ДЛЯ БУДУЩЕЙ РЕАЛИЗАЦИИ
    //
    //
    return <BoxInteractionController 
                    id={props.id} 
                    position={props.position}
                    size={props.size}
                    onPositionChange={(id, position) => {
                        props.onNewPosition(id,position);
                        console.log("pos:", id, position);
                    }}
                    onResize={(id, size) => {
                        props.onNewSize(id,size);
                        console.log("size:", id, size);
                    }}
                />
} 