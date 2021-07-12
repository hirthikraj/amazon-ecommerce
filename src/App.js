import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Signup from './components/Signup';
import Login from './components/Login';
import Orders from './components/Orders'
import Payment from './components/Payment';
import Thankyou from './components/Thankyou';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { auth } from './Firebase/Firebase';
import { useStateValue } from './components/StateProvider';


function App() {
  const[{cart},dispatch] = useStateValue();
  const[products,setProducts] = useState([]);
  const[data,setData] = useState([]);

  useEffect( () =>{
    fetch('https://fakestoreapi.com/products/')
        .then(response=>response.json())
        .then(results=>{
          setData(results);
          setProducts(results);
        })
},[])

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{

      if(authUser)
      {
        dispatch({
          type:"SET_USER",
          user:authUser
        });
      }
      else
      {
        dispatch({
          type:"SET_USER",
          user:null
        });
      }
    })
  },[])

const allCategories = ['all',"men's clothing","jewelery","electronics","women's clothing"]
const [categories] = useState(allCategories);

  const filterCategory = (category) => {
    if(category==='all'){
      setProducts(data);
      return;
    }
    const newItems = data.filter((item) => item.category===category)
    setProducts(newItems);
  }


  return (
    <Router>
    <div className="app">
      <Switch>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <Signup/>
      </Route>
      <Route path="/thankyou">
        <Navbar products={products} categories={categories} filterCategory={filterCategory}/>
        <Thankyou/>
      </Route>
      <Route path="/orders">
      <Navbar products={products} categories={categories} filterCategory={filterCategory}/>
        <Orders/>
      </Route>
      <Route path="/payment">
      <Navbar products={products} categories={categories} filterCategory={filterCategory}/>
        <Payment/>
      </Route>
      <Route path="/checkout" >
        <Navbar products={products} categories={categories} filterCategory={filterCategory}/>
        <Checkout/>
      </Route>
      <Route path="/">
        <Navbar products={products} categories={categories} filterCategory={filterCategory}/>
        <Home products={products} />
      </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;

