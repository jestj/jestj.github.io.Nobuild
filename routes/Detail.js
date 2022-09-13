import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { addR } from '../store.js'
import { useDispatch } from "react-redux";

function Detail(props) {



  let {id} = useParams();
  let bag = props.stick.find(x => x.id == id);
  let [alert, setAlert] = useState(true)
  let [tap, setTap] = useState(0)
  let dispatch = useDispatch() 

  useEffect(()=>{
    let out = localStorage.getItem('watched')   
    out = JSON.parse(out)
    out.push(bag.id)
    out = new Set(out)
    out = Array.from(out)
    localStorage.setItem('watched', JSON.stringify(out))

  }, [])



  useEffect(()=> {
    let a = setTimeout(()=>{ setAlert(false)  }, 2000)
    return ()=> {
      clearTimeout(a)
    }

  },[])

    return (
  <div className="container">
    {
      alert == true
    ? <div className="alert alert-warning">
      2초이내 구매시 할인
    </div>
    : null
     }


    <div className="row">
      <div className="col-md-6">
      <img src={'https://raw.githubusercontent.com/jestj/load/main/L' + bag.id + '.jpg'} width="80%" />
      </div>
      <div className="col-md-6">
        <h4 className="pt-5">{bag.title}</h4>
         <p>{bag.content}</p>
         <p>{bag.price}</p>
        <button className="btn btn-danger" onClick={()=>{
          dispatch(addR( {id : 4, name : 'Kneebutton', count : 1} ))
        }}>주문하기</button> 
      </div>
    </div>

    <Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link onClick={() => { setTap(0)}} eventKey="link0">버튼0</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => { setTap(1)}} eventKey="link1">버튼1</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={() => { setTap(2)}} eventKey="link2">버튼2</Nav.Link>
    </Nav.Item>
    </Nav>
    <TabContent stick={props.stick} tap={tap}/>

  </div> 
    )
  }

  function TabContent({tap}){ 

    let [fade, setFade] = useState('') 


    useEffect(()=> {
       setTimeout(()=> { setFade('end')}, 10)

       return ()=>{
       setFade('')
       }
    }, [tap])

    return (<div className={'start ' + fade}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>)
  }

  // function TabContent(props){ 
  //  if (props.tap == 0){ 
  //   return <div>내용0</div>
  // } 
  // if (props.tap == 1){
  //   return <div>내용1</div>
  // } 
  // if (props.tap == 2){
  //   return <div>내용2</div>
  // } 
  // } 

  export default Detail;