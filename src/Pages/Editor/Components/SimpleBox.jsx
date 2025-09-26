import { useEffect, useRef } from "react";
import './SimpleBox.css'
import { TestComponent } from './test';

export function SimpleBox(props) {
    // const ref = useRef(null);
    // useEffect(() => {
    //     const element = ref.current;
    //     const handle = () => {
    //         console.log("workk!", props);
    //     }
    //     if (element) {
    //         element.addEventListener('click', handle);

    //         return () => {
    //             element.removeEventListener('click', handle);
    //         }
    //     }
    // }, [])
    return <TestComponent 
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