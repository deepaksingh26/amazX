import {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const [register,setRegister]=useState({
         name:"",
         employee_id:"",
         email:"",
         password:"",
         cpassword:"",
         mobile:"",
         profession:""
  })
  const InputChangeHandler=(e)=>{
       setRegister({...register,
        [e.target.name]:e.target.value
      })
  }
  const [registeredSuccessfully,setRegisteredSuccessfully]=useState(false);
  const [registerErr,setRegisterErr]=useState(false);
  const navigate = useNavigate();
  const RegisterHandler=async (e)=>{
      e.preventDefault();
      setRegisteredSuccessfully(false);
      setRegisterErr(false);
      console.log(register);
      const registerResponse=await axios.post("https://amazx-1.onrender.com/registerEmployee",register);
      console.log(registerResponse.data);
      navigate('/employee_dashboard');
      if(registerResponse.data.messege){
        setRegisteredSuccessfully(registerResponse.data.messege);
        setRegisterErr(false);
        navigate('/employee_dashboard');
      }
      else if(registerResponse.data.error){
        setRegisterErr(registerResponse.data.error)
        setRegisteredSuccessfully(false)
      }
  }
    return ( 
        <>
        <div style={{width:'100%',margin:'0 auto',height:'100vh',padding:'10px 20px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:"url('/bg.png') no-repeat",backgroundSize:'cover'}}>
        <div className='card' style={{boxShadow:'0px 0px 3px #333',padding:'40px 30px',borderRadius:'5px',width:'50%',backgroundColor:'whitesmoke'}}>
         <form autoComplete="off" onSubmit={RegisterHandler} method="post">
             <div className='mb-1'>
               {registeredSuccessfully && <p className='text-success'>{registeredSuccessfully}</p>}
               {registerErr && <p className="text-danger">{registerErr}</p>}
             </div>
              <div className="mb-1">
                 <label htmlFor="Name" className="form-label">Name</label>
                 <input type="text" className="form-control" id="Name" aria-describedby="Name" name="name" value={register.name} onChange={InputChangeHandler}/>
             </div>

             <div className="mb-1">
                  <label htmlFor="EmployeeID" className="form-label">User  Name</label>
                  <input type="text" className="form-control" id="EmployeeID" aria-describedby="EmployeeID" name="employee_id" value={register.employee_id} onChange={InputChangeHandler} />
             </div>

             <div className="mb-1">
                 <label htmlFor="email" className="form-label">Email Address</label>
                 <input type="email" className="form-control" id="email" aria-describedby="Email" name='email' value={register.email} onChange={InputChangeHandler}/>
             </div>

             <div className="mb-1">
                <label htmlFor="InputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="InputPassword1" name="password" value={register.password} onChange={InputChangeHandler} />
             </div>

             <div className="mb-1">
                <label htmlFor="ConfirmInputPassword1" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="ConfirmInputPassword1" name="cpassword" value={register.cpassword} onChange={InputChangeHandler}/>
             </div>
             <div className="mb-1">
                <label htmlFor="mobile" className="form-label">Mobile</label>
                <input type="tel" className="form-control" id="mobile" name="mobile" value={register.mobile} onChange={InputChangeHandler}/>
             </div>
             <div className="mb-1">
                <label htmlFor="profession" className="form-label">Profession</label>
                <input type="text" className="form-control" id="professsion" name="profession" value={register.profession} onChange={InputChangeHandler}/>
             </div>
            <button type="submit" className="btn btn-success" >Register</button>
            <div className='d-flex justify-content-center'>
                  <p className='text-dark'>Already have an Account? <Link to="/login" className='btn btn-primary text-light'>Log in</Link></p>
              </div>
        </form>
        </div>
    </div>
        </>
     );
}
 
export default Register;
