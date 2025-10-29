import './SimpleBox.css'
import { BoxInteractionController } from './BoxInteractionController';
import { Pivot } from './Misc/Pivot';


export function SimpleBox(props) {
    //
    //
    // ДЛЯ БУДУЩЕЙ РЕАЛИЗАЦИИ
    //
    //
    return <div>
        <BoxInteractionController
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
        <Pivot
            parentId={props.id}
            parentPosition={props.position}
            parentSize={props.size}
        />
    </div> 
} 