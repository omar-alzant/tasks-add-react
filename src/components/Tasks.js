import './style.css'
import * as React from "react";

function FaTimes(props) {
  return <svg stroke="currentColor"  style={{color: 'rgba(239, 85, 85, 0.822)',cursor:"pointer" }} fill="currentColor" strokeWidth={0} viewBox="0 0 352 512" height="1em" width="1em" {...props}><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" /></svg>;
}


const Tasks = ({ tasks, onDelete, onToggle }) => {
    return(
        <div className="task-cont">
        {tasks.map((task) => (

            <div 
                key={`${task.id}`}  
                className={`task ${task.reminder ? 'reminder' : ''}`}  // other method to hide/view the style
                onDoubleClick={()=> onToggle(task.id)}
                 >

                <h3>{task.text} 
                <FaTimes onClick={()=> onDelete(task.id)}/></h3>
                <p>{task.day}</p>

            </div>
        ))}
        </div>
    );
}

export default Tasks;

