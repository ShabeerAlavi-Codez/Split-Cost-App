import React from 'react'
import './ShowPayer.css'
import {  faBahtSign} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const ShowPayer = (props) => {
    let listName = props.nameList;
    let allList = props.allList;
    let cost = 0;
    let allcost=0;
    listName = listName.map((name) =>{
        cost = 0
        let result  = allList.filter(list=> {
            return list.payerId === name.id
        })
        for(let i=0; i<result.length; i++){
            cost += result[i].amount
            allcost += result[i].amount
        }
        return {...name, paid:cost}
    })
  return (
    <div className='wrap-payerList'>
        <header>
            <div className='wrap'>
                <p className='headline'>Total Expenses</p>
                <p className='number'>{allcost} <FontAwesomeIcon className='baht-icon' icon={faBahtSign} /></p>
                
            </div>
            <div className='wrap'>
                <p className='headline'>Members</p>
                <p className='number'>{listName.length}</p>
            </div>
            <div className='wrap'>
                <p className='headline'>Average per person</p>
                {(!isNaN(allcost/listName.length)) 
                ? <p className='number'>{(allcost/listName.length).toFixed(2)} <FontAwesomeIcon className='baht-icon' icon={faBahtSign} /></p>
                : <p className='number'>-</p> }
            </div>
        </header>
        <table className='head-table'>
            <thead>
                <tr>
                    <th className='col-mem'>Members</th>
                    <th className='col-paid'>Paid (Baht)</th>
                    <th className='col-status'></th>
                    <th className='col-dept'>Recv/Pay (Baht)</th>
                </tr>
            </thead>
            <tbody>
            {(listName.length !== 0) ? listName.map((list)=>                 
                <tr key={list.id} >
                    <td className='showname'>{list.name.substring(0, 13)}</td>
                    <td className='showpaid'>{list.paid}</td>
                    {(list.paid - allcost/listName.length>0) && <td><p className='wrap-status plus'>Overpay</p></td>}
                    {(list.paid - allcost/listName.length<0) && <td><div className='wrap-status minus'>PayMore</div></td>}
                    {(list.paid - allcost/listName.length===0) && <td><div className='wrap-status free'>FreeNow</div></td>}
                    {(list.paid - allcost/listName.length>0) && <td className='plusnum'>+{(list.paid - allcost/listName.length).toFixed(2)} </td>}
                    {(list.paid - allcost/listName.length<0) && <td className='minusnum'>{(list.paid - allcost/listName.length).toFixed(2)}</td>}
                    {(list.paid - allcost/listName.length===0) && <td className='freenum'>{(list.paid - allcost/listName.length).toFixed(2)}</td>}
                </tr>)
                :<tr></tr>}       
                
            </tbody>        
        </table>
        {(listName.length === 0) && <p className='nofriend'>You haven't added your friends yet!!</p>}
    </div>
  )
}

export default ShowPayer