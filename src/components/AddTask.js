import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [text,setText] = useState('');
    const [day,setDay] = useState('');
    const [reminder,setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(!text){
            alert('Please add a Task !! ');
            return;
        }

        onAdd({ text, day, reminder})
        
        setText('')
        setDay('')
        setReminder(false)
    }
  return (
    <form onSubmit={ onSubmit } >
        <label htmlFor="Taskname"> Task</label>
        <input type="text" id="Taskname" value={text} placeholder="Add Task"
                onChange={(e)=>setText(`${e.target.value}`)}
                 />

        <label htmlFor="Taskday"> Day & Time</label>
        <input type="text" id="Taskday" value={day} placeholder="Add Day & Time"
                onChange={(e)=>setDay(`${e.target.value}`)}
                />

        <label htmlFor="Reminder"> Set Reminder</label>
        <input type="checkbox" id="Reminder" value={reminder} checked={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}/>

        <input type="submit" value="Add Task"  className="btn-add"/>
    </form>
  )
}

export default AddTask