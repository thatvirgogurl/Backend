import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useState } from 'react'



export default function Register() {
    const history=useHistory()
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:""

    })
//handelr
        const handleInput = (event) => {
            let name = event.target.name
            let value = event.target.value
            setUser({ ...user, [name]: value })
        }


    
    //handel submit
    const handlerSubmit= async (event)=>{
        event.preventDefault();
        const {username,email,password}=user;
        try {
            //itis submited on port 3000port defult which is frontend bt we have sumbit backend port 3001 we need proxy
            const res=await fetch('/register',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username,email,password
                })
            })
            if(res.status===400|| !res){
                window.alert('Already used details')
            }else{
                window.alert('registion succesfull');
                history.push('/login')
            }
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div>
          <div className="container shadow my-5">
              <div className="row justify-content-end">
                  <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
                      <h1 className="display-4 fw-bolder">Hello,</h1>
                      <p className="lead text-center">Enter Your Details To Register</p>
                      <h5 className='mb-4'>OR</h5>
                      <NavLink to='/login' className="btn btn-outline-light rounded-pill pb-2 w-50">Login</NavLink>
                  </div>
                  <div className='col-md-6 p-5'>
                      <form  onSubmit={handlerSubmit} method='POST'>
                          <div class="mb-3">
                              <label for="name" class="form-label">Client Name</label>
                              <input type="text" class="form-control" id="name" name='username' value={user.username} onChange={handleInput}  />
                
                          </div>
                          <div class="mb-3">
                              <label for="exampleInputEmail1" class="form-label">Email address</label>
                              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={user.email} onChange={handleInput} />
                              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                          </div>
                          <div class="mb-3">
                              <label for="exampleInputPassword1" class="form-label">Password</label>
                              <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={user.password} onChange={handleInput} />
                          </div>
                          <div class="mb-3 form-check">
                              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                              <label class="form-check-label" for="exampleCheck1">I Agree Terms and Conditions</label>
                          </div>
                          <button type="submit" class="btn btn-outline-primary w-100 mt-4 rounded-pill">Register</button>
                      </form>
                  </div>
              </div>
          </div>
    </div>
  )
}
