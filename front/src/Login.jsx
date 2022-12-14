import React, { useState ,useContext} from 'react';
import { UserContext } from './App';
import { useNavigate } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

export default function Login() {
const {state,dispatch}=useContext(UserContext);
  let navigate = useNavigate();
  const [data,setData]=useState({
    email: "",
    pass: "",
  });
  const fire = (event) =>{
      const {name, value}= event.target;        //I have destructered the object wrong
      setData((preVal)=>{
        return(
          {
            ...preVal,
            [name]: value,
          }
        )
      })
  }
  const Loginuser =  async (e)=>{
   e.preventDefault();
   console.log(data);
   const res=await axios.post('http://localhost:5000/signin',data);
   console.log(res.data)
   const found=res.data;
   if(res.status===400||!found)
   { 
     window.alert('Invalid Credentials not get response');
   }
   else{
     dispatch({type:"USER",payload:true})
    //  localStorage.setItem("token",res.data.token)
     axios.defaults.headers.common['authorization'] = res.data.token
     window.alert('Login Sucessfull');
     navigate('/');
   }
  }
  // const SubmitEve = (eve) =>{
  //   eve.preventDefault();
  //   alert(`You have email address ${data.email} and your password is ${data.pass}`);
  // }
  return (
    <>
      <div className="my-5">
        <h1 className='text-center'> SignUp </h1>
      </div>  
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
          <form  method="POST" onSubmit={Loginuser}>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" name='email' value={data.email} onChange={fire} placeholder="name@example.com" />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleFormControlInput1" name='pass' value={data.pass} onChange={fire} placeholder="Enter your password" />
            </div>
            <div className="col-12">
              <button className='btn btn-outline-primary' type='submit'>Log in</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
} 
