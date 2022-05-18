import './style.css'
import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({title, onAdd, showAddTask}) => {
    return (
    <header className="header">
    
    {/* <h2 style={headingStyle}>{title}</h2> */}
        
        <h2>{title} </h2>
        {
             <Button  
                color={showAddTask ? 'red' : 'green'}
                text={showAddTask ? 'Close' : 'Add'} 
                onClick={onAdd}/>
        }
    </header>
  )
}


Header.defaultProps={
    title: 'Task Tracker',
}

// const headingStyle = {
//     color: "red",
//     backgroundColor: "black",
// }


Header.propTypes = {
    title: PropTypes.string.isRequired,
    // so we cannot send without string to title in header
}
export default Header