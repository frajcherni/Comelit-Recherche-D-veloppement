import React, { useState } from 'react'
import { NavLink ,Navigate,useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {login} from '../auth/auth';
import './Login.css'
import { FormControl } from 'react-bootstrap';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const Login = () => {

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();
    const Navigate = useNavigate();

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };


    const loginuser = async(e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else {
            // console.log("user login succesfully done");


            const data = await fetch("http://localhost:5000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                     email, password
                })
            });

            const res = await data.json();
            //  console.log(res);

            if(res.status === 201){
              const  token=res.result.token
              const  role=res.result.role

                login(token);
                if (role === 'Administrateur') {
                    Navigate('/a'); // redirect to admin dashboard
                  }  else {
                    history('/app/dashboard'); // redirect to regular user dashboard
                  }
                setInpval({...inpval,email:"",password:""});
            }
        }
    }

    return (
        <>



        <section className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="form_data container my-2 px-2 py-2">
                <img src="/img/comelitnoir.png" alt="comelit" style={{ width: "370px", height: "250px", marginBottom: "-30px", marginTop: "-20px" }} />
        
                <form>
                  <div className="col-md-8">
                    <label htmlFor="email">Email</label>
                    <FormControl className="form-control form-control-lg" type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Entrez votre Email" />
                  </div>
        
                  <div className="col-md-8">
                  <div className="form_input">
                                    <label htmlFor="password">Mot de passe</label>
                                    <div className="two">
                                    <FormControl className="form-control form-control-lg" type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder="Entrez votre mot de passe" />
                                    <div className="showpass" onClick={() => setPassShow(!passShow)}>
                          <FontAwesomeIcon icon={!passShow ? faEye : faEyeSlash} />
                                        </div>
                                    </div>
                                </div>
        
        </div>
        <div className='my-3'>
                  <button  className="btn btn-success px-4 mr-6 py-2 col-lg-8" onClick={loginuser}>Se Connecter</button> </div>
                  <p><Link to="/forgetpassword">Mot de passe Oublié ?</Link> </p>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </section>
        
        
        
        
        
        
                </>
    )
}

export default Login 