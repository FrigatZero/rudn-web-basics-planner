import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Editor.css'
import { SimpleBox } from './Components/Workspace/SimpleBox';
import { CanvasEngine } from '../../class/CanvasEngine'
import { CanvasRender } from './Components/Canvas/CanvasRender';
import BoxButtonSvg from './assets/box.svg'
import CrossSvg from './assets/cross.svg'
import UndoSvg from './assets/undo.svg'
import RedoSvg from './assets/redo.svg'
import CopySvg from './assets/copy.svg'
import PasteSvg from './assets/paste.svg'
import SearchSvg from './assets/search.svg'
import { Node } from '../../class/Node';

export default function Editor(){
    // Хуки для canvas
    const canvasRef = useRef(null);
    const workspaceCanvasRef = useRef(null);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [canvasHeight, setCanvasHeight] = useState(0);
    // Хуки для элементов рабочей области
    const [objectId, setObjectId] = useState(1);
    // Хуки для элементов панели инструментов
    const [toolboxObjectId, setToolboxObjectId] = useState(0);
    const [toolboxObjects, setToolboxObjects] = useState([]);
    // Значение поиска тулбокса
    const [searchValue, setSearchValue] = useState("");
    
    // Подключаем CanvasEngine
    const [engine, setEngine] = useState(null);
    useEffect (() => {
        const canvasEngine = new CanvasEngine(canvasRef.current);
        setEngine(canvasEngine);
    }, [])


    // Обработчик нажатия на кнопку создания коробки
    const on_click_boxButton_handler = () => {
        engine.appendNode(
            new Node(objectId)
        )
        setObjectId(i => i + 1);
    }
    const on_change_search_handler = (e) => {
        setSearchValue(e.target.value);
    }
    // Обновление canvas
    const updateCanvas = useCallback(() => {
        if (!engine) return;

        engine.render();
        
    }, [engine]);
    // Получение объектов панели инструментов
    const getToolboxObjects = () => {
        function BoxButton() {
            return <>
            {
                toolboxObjects.map(element => 
                    (
                        <div 
                            className='boxButton' 
                            key={element.toolboxObjectId + 'tb'}
                            onClick={on_click_boxButton_handler}
                            >
                                <img 
                                    src={BoxButtonSvg} 
                                    alt='' 
                                    width="30" 
                                    style={{
                                        marginRight: "10px",
                                        verticalAlign: "middle",
                                    }}
                                ></img>
                                Box #{element.toolboxObjectId} 
                        </div>
                    )
                )
            }
            </>
        }

        return <>
        {
            searchValue ? 0 : <BoxButton/>
        }
        </>
    }
    // Добавляем кнопки на страницу
    useEffect(
        () => {
            setToolboxObjects(
                [
                    {toolboxObjectId:1},
                    {toolboxObjectId:2},
                    {toolboxObjectId:3},
                    {toolboxObjectId:4},
                    {toolboxObjectId:5},
                    {toolboxObjectId:6},
                    {toolboxObjectId:7},
                    {toolboxObjectId:8},
                ]
            );
        }, []    
    )
    // Обработчик события ресайза
    useLayoutEffect(
        () => {
            const on_resize_handler = () => {
                const container = workspaceCanvasRef.current
                if (container){
                    setCanvasHeight(container.clientHeight);
                    setCanvasWidth(container.clientWidth);
                }
            }
            addEventListener("resize", on_resize_handler);
            on_resize_handler();
            return () => removeEventListener("resize", on_resize_handler);
        }, []
    );
    // Для обновления канваса
    useLayoutEffect(() => {
        updateCanvas();
    }, [updateCanvas, canvasHeight, canvasWidth]);
    return (
        <div className='editor'>
            <div className='editor__settings'>
                <div className='panel-settings'>
                    Panel settings
                </div>

                <div className='sheet-selector'>
                    <div className='sheet-selector__sheet'>
                        sheet #1
                    </div>
                    <div className='sheet-selector__sheet'>
                        sheet #2
                    </div>
                </div>
                
                <div className='status-bar'>
                    Total:
                    <div className='status-bar__total'>
                        0
                    </div>
                    Running:
                    <div className='status-bar__running'>
                        1
                    </div>
                    Stopped:
                    <div className='status-bar__stopped'>
                        2
                    </div>
                </div>

                <div className='main-menu'>
                    <div className='main-menu__file'>
                        File
                    </div>
                    <div className='main-menu__edit'>
                        Edit
                    </div>
                    <div className='main-menu__help'>
                        Help
                    </div>
                </div>
                {/* TODO */}
            </div>
            <div className='editor__panel'>
                <div className='toolbox'>
                    <div className='toolbox__search'>
                        <input 
                            type='search' 
                            id='tools' 
                            style={{
                                width: '90%',
                                borderRadius: '20px',
                                margin: '5px',
                            }}
                            onChange={on_change_search_handler}
                        >
                            {/* TODO */}
                        </input>
                    </div>
                    <div className='toolbox__list'>
                        {getToolboxObjects()}
                    </div>
                </div>
                <div className='block-details'>
                    <div className='block-details__name'>
                        Details
                        <div style={{
                            height: "11px",
                            width: "11px",
                            cursor: "pointer",
                        }}>
                                <svg width="100%" height="100%" style={{}}>
                                <line x1="1" y1="10"
                                x2="10" y2="1"
                                stroke="rgb(50, 50, 50)"
                                strokeWidth="2"/>
                                <line x1="1" y1="1"
                                x2="10" y2="10"
                                stroke="rgb(50, 50, 50)"
                                strokeWidth="2"/>
                            </svg>
                        </div>
                    </div>
                    {/* TODO */}
                </div>
            </div>
            <div className='editor__workspace'>
                <div className='workspace-canvas' ref={workspaceCanvasRef}>
                    <CanvasRender
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                        canvasRef={canvasRef}
                        canvasEngine={engine}
                    />
                </div>

                {/* {getWorkspaceObjects()} */}
                
                <div className='action-bar'>
                    <div className='action-bar__remove'>
                        <img 
                            src={CrossSvg} 
                            alt='' 
                            width="15" 
                        ></img>
                        {/* TODO */}
                    </div>

                    <div className='action-bar__complex'>
                        <div className='action-bar__complex__undo'>
                            <img 
                                src={UndoSvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                        <div className='action-bar__complex__redo'>
                            <img 
                                src={RedoSvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                    </div>

                    <div className='action-bar__complex'>
                        <div className='action-bar__complex__copy'>
                            <img 
                                src={CopySvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                        <div className='action-bar__complex__paste'>
                            <img 
                                src={PasteSvg} 
                                alt='' 
                                width="15" 
                            ></img>
                            {/* TODO */}
                        </div>
                    </div>
                    <div className='action-bar__search'>
                        <img 
                            src={SearchSvg} 
                            alt='' 
                            width="15" 
                        ></img>
                        {/* TODO */}
                    </div>
                </div>

                <div className='zoom-box'>
                    <button className='zoom-box__In' >+</button>
                    <button className='zoom-box__Out'>-</button>
                </div>
            </div>
        </div>
    )
}