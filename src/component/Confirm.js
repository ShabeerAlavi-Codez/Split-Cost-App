import React from 'react'
import './Confirm.css'
import { faXmark, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Confirm = (props) => {

    const cfirmPop = props.cfirmPop
    if (!cfirmPop) return null
    // const onRemove = () =>{
        
    // }
  return (
    <div className='confirmPopup'>
        <div className='wrapPopup'>
            <div className='wrap-icon'>
            <FontAwesomeIcon className='warning-icon' icon={faTriangleExclamation}/>
            <FontAwesomeIcon  className='x-icon' onClick={props.onClose} icon={faXmark} />
            </div>
            <section className='message'>
                <h2>Are you sure to remove this guy from your group?</h2>
                <p>This guy will immediately disappear with his expense list. Perhaps he spends his money on something.</p>
            </section>
            <section className='wrap-btn'>
                <button onClick={props.onConfirm}>Remove</button>
                <button onClick={props.onClose}>Cancel</button>
            </section>
        </div>
        
    </div>
  )
}

export default Confirm