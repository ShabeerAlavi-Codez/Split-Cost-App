import React, { useEffect , useState ,useRef} from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { faXmark, faPlus, faArrowsLeftRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ShowList from './ShowList'
import ShowPayer from './ShowPayer';
import Confirm from './Confirm';
import './FormList.css'
const FormList = () => {
    const [input, setInput] = useState({
        payerId:'',
        list:'',
        amount: '',
        payerName:''
    })
    const [allLists, setAllList] = useState([])
    const [name,setName] = useState("")
    const [listName, setListname] = useState([])
    const [btnStatus,setDisable] = useState(true)
    const [cfirmPop,setcfirmPop] = useState(false)
    const [toggleRight,setToggleRight] = useState(true)
    let removePerson = useRef('');

    const handleSubmitform = (e) =>{
        e.preventDefault();
        setAllList((prv) =>{return[...prv, {id:uuidv4(),...input}]})
        setInput({list:'',
        amount:'',payerName:''})

        //clear radio input
        var ele = document.getElementsByName("payer");
        for(var i=0;i<ele.length;i++)
           ele[i].checked = false;
    }
    const handleChangePayer = (e) =>{
        setInput(prv=>{return{...prv,payerName:e.target.value,payerId:e.target.id}})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        (name !== '')  && setListname([{id:uuidv4(),name:name},...listName ])
        setName('')
    }
    const popupconfirm = (id) =>{
        setcfirmPop(true)
        removePerson.current = id
        
    }
    const clearAll = () =>{
        setListname([])
        setAllList([])
        setInput(prv=>{return{...prv,payerId:'',payerName:''}})
    }
    const delName = () =>{ 
        setAllList(current => current.filter(list=>{
            return list.payerId !== removePerson.current
        }))
        setListname(current=>current.filter(list=>{
            return list.id !== removePerson.current;
        }))
        setInput(prv=>{return{...prv,payerName:''}})
        setcfirmPop(false)
    }

    const delList = (id) =>{
        setAllList(current=>current.filter(list=>{
            return list.id !== id;
        }))
    }
    
    const toggletab = () =>{
        const displaysec = document.getElementById("display-sec");
        setToggleRight(!toggleRight)
        if(toggleRight){
            displaysec.style.left = "5%"
        }else{
            displaysec.style.left = "95%"
        }
        
    }
    useEffect(()=>{
        if((input.list !== '') && (input.amount !== '' && input.amount > 0 ) && (input.payerName !== "")){
            setDisable(false)
        }else{
            setDisable(true)
        }
    },[input])
   
  return (
    <div className='form-Component'>
        <div className='container-form'>
            <h1>SPLIT THE COST</h1>
            <form onSubmit={handleSubmitform} className="form-list">
                <label>
                    <p>NEW LIST</p>
                    <input  
                    placeholder='New List'
                    type="text" 
                    value={input.list}
                    onChange={(e) => setInput(prv=>{return{...prv,list:e.target.value}})}
                    />
                </label>
                <label>
                    <p>AMOUNT</p>
                    <input 
                    placeholder='Amount'
                    type="number"
                    value={input.amount}
                    onChange={(e) => setInput(prv=>{return{...prv,amount:+e.target.value}})}/>
                </label>
                <label>
                    <p>CHOOSE A PAYER</p>
                    <div className='wrap-input'>
                        <div className='wrap-addname-input'>
                            <input type="text"
                            id='add'
                            placeholder='Add Name'
                            value={name} 
                            onChange={(e) =>{setName(e.currentTarget.value)}}
                            className="fill-name"/>
                            
                            <button className='btn-add' onClick={handleSubmit}>
                                <FontAwesomeIcon className='add-icon' onClick={handleSubmit} icon={faPlus} />
                            </button>         
                        </div>
                        <ul>
                        {(listName.length !== 0) ? listName.map((list)=> 
                        <li key={list.id}>
                            <input type="radio" id={list.id} name='payer' value={list.name} onChange={handleChangePayer}/>
                            <label className="payeritem" htmlFor={list.id}>
                                
                                {list.name.substring(0, 24)}
                                <FontAwesomeIcon  className='x-icon' onClick={()=>popupconfirm(list.id)} icon={faXmark} />
                            </label>
                        </li>
                        ) 
                        
                        : <p>You haven't added any your friends yet!</p>}
                        {(listName.length !== 0) && 
                        <li><label className='payeritem clearbtn' onClick={()=>clearAll()}>Clear All</label> </li>}
                        </ul>
                    </div>
                    
                </label>

                <input className='btn-Addlist' type="submit" value={"ADD NEW LIST"} disabled={btnStatus}/>
            </form>
            
            <Confirm cfirmPop={cfirmPop} onClose={()=>setcfirmPop(false)}  onConfirm={() => delName()}/>     
        </div>
        <div id="display-sec" className='wrap-right'>
        <FontAwesomeIcon className='tab-icon' onClick={toggletab} icon={faArrowsLeftRight}/>
            <Router>
                <nav>
                    <NavLink className='link' to="/">All List</NavLink>
                    <NavLink className='link' to="/members">Members</NavLink>
                </nav>
                <div className='wrap-contain'>
                    <Routes>
                        <Route exact path="/" element={<ShowList removeList={delList} allList={allLists}/>}/>
                        <Route exact path='/members'element={<ShowPayer allList={allLists} nameList={listName}/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    </div>
    
  )
}

export default FormList
