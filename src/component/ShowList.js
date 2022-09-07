import React from 'react'
import { faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './ShowList.css'
const ShowList = (props) => {
    let lists = props.allList
    const delList = (id) =>{
        props.removeList(id)
    }
    let Total = 0
    for (let list of lists){Total += list.amount}
   
  return (
    <div className='wrap-alllist'>
       <table className='head-table'>
        <thead>
            <tr>
                <th className='col-list'>Lists</th>
                <th className='col-mem'>Payers</th>
                <th className='col-amount'>Amount(Baht)</th>
                <th className='col-remove'></th>
            </tr>
        </thead>
        <tbody>
            {lists.map((list)=> 
                <tr key={list.id}>
                    <td className='list-item'>{list.list.substring(0, 30)}</td>
                    <td className='name-item'>{list.payerName.substring(0, 30)}</td>
                    <td className='amount-td'>{list.amount}</td>
                    <td><FontAwesomeIcon  className='x-icon' icon={faTrashCan} onClick={()=>delList(list.id)}/></td>
                </tr>
                )}
        </tbody>
       </table>
       <div className='wrapTotal'>
            <p className='total'>Total <span style={{fontWeight:"500"}}>{Total}</span></p>
       </div>
       
    </div>
  )
}

export default ShowList