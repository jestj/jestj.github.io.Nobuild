import { createContext, useEffect, useState } from 'react';
import './App.css';
import { Button, Navbar, Nav, Container} from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js'
import { useQuery } from 'react-query';




function App() {

  useEffect(()=> {
    localStorage.setItem('watched',JSON.stringify( [] ))
  },[])

  let [ stick, setStick ] = useState(data)

  let navigate = useNavigate();

  let result = useQuery('login', ()=>
    axios.get('https://jestj.github.io/userdata.json').then((a)=>{
      return a.data
    })
  )

  return (

    <div className="App">

      <Navbar bg="white" variant="white">
        <Container>
          <Navbar.Brand href="/">TKgg</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/Cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
          { result.isLoading ? '로딩중' : result.data.name }  
          </Nav>

        </Container>
      </Navbar>
      

      <Routes>
        <Route path="/" element={<><div className="main-bg"></div>
      <div className="container">
        <div className="row">
        { stick.map((a, i)=>{
            return <Card stick={stick[i]} i={i+0} key={i}></Card>
          })}
        </div>
        </div>
        <button onClick={()=>{

        axios.get('https://jestj.github.io/shop.json').then
        ((response)=>{
        let copy = [...stick, ...response.data]
        setStick(copy)
        })

       }}>상품 더보기</button>
        </>
        } />


        <Route path="/Detail/:id" element={<Detail stick={stick}/>} />


        <Route path="/cart" element={  <Cart/>  }/>




        <Route path="/about" element={<About/>}>
         <Route path="member" element={<div>멤버임</div>}/>
         <Route path="location" element={<div>위치정보</div>}/>
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>

        <Route path="*" element={<div>404Page</div>} />
      </Routes>
      </div> 
  );
}

function About(){
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event(){
  return (
    <div>
    <h4>오늘의 이벤트</h4>
    <Outlet></Outlet>
    </div>
  )
}


function Card(props){
  return (
    <div className="col-md-4">
      <Link to={"/detail/" + props.i}>
    <img src={'https://raw.githubusercontent.com/jestj/load/main/L' + props.i + '.jpg'} width="80%" height="60%"/>
    </Link>
    <h1>{props.stick.title}</h1>
    <p>{props.stick.price}</p>
    </div>
  )
}




export default App;
