// import { useEffect, useState } from 'react';
// import './Editor.css'

// export default function Editor(){
//     const [id, setId] = useState(0);
//     const [name, setName] = useState("");
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         setStudents(
//         [
//             {id: 101, name: "abobus1"},
//             {id: 102, name: "abobus2"},
//             {id: 103, name: "abobus3"}
//         ]
//     );

//     }, [])

    
//     const on_button_click_handler = () => {
//         setStudents([...students, {id:id, name:name}])
//         setId(0);
//         setName("");
//     }

//     const getForm = () => {
//         return <div  style={{
//             position: 'sticky',
//             top: 0,
//             width:'100%'
//         }}>
//         <div>
//             <div>
//                 <input type={"text"} value={name} onChange={e => setName(e.target.value)} placeholder='enter name'></input>
//             </div>
//         </div>
        
//         <div>
//             <div>
//                 <input type={"number"} value={id} onChange={e => setId(e.target.value)} placeholder='enter id'></input>
//             </div>
//             <button onClick={on_button_click_handler}>Add</button>
//         </div>

//         </div>
//     }

//     const getStudents = () => {
//         return <div>
//             { students.map(student => (
//                 <div>
//                     <span>{student.id}</span>
//                     <span>{student.name}</span>
//                 </div>
//             )) }
//         </div>
//     }

//     return (
//         <>
//             {getForm()}
//             {getStudents()}
//         </>
//     )
// }