import React, { useEffect, useState } from 'react'
// import styles from "./Login.module.css"
import InputControl from '../InputControl/InputControl'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../../Firebase'

const Login = () => {

    const navigate = useNavigate();

    const [fetchingUser, setFetchinUser] = useState(true)

    const [values, setValues] = useState({
        email: "",
        pass: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission =()=> {
        if (!values.email || !values.pass){
            setErrorMsg("Fill all fields");
            return
        }


        setErrorMsg("");

        setSubmitButtonDisabled(true)
        
        signInWithEmailAndPassword(auth, values.email, values.pass).then(async(res) =>{
            setSubmitButtonDisabled(false)
            
            navigate("/")
           
        
        })
        .catch((err) => {
            setSubmitButtonDisabled(false)
            setErrorMsg(err.message)
        })
    }



     
   useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        navigate('/')
      }
      setFetchinUser(false)
    })
   },[])

  return (
    <>
    {
        fetchingUser ? <div>Loading...</div> : 
        <div >
        <div className='w-96 h-[300px]  rounded-lg mt-5 m-auto text-center' style={{border:"1px solid black"}}>
            <h1 className='w-full bg-purple-400 p-2 rounded-lg' > 
                Login
            </h1>
            <InputControl label = "Email"
            onChange={event => 
                setValues((prev)=>({...prev, email:event.target.value}))
            }
            className="pb-3 mt-5 pl-24 justify-center rounded-lg h-8"style={{border:"1px solid black"}} 
            placeholder ="Enter Email address"/>
            <InputControl label = "Password"
            onChange={event=>setValues((prev)=>({...prev, pass:event.target.value}))}
            placeholder ="Enter Password"
            className="pb-3 mt-5 pl-24 justify-center rounded-lg h-8"style={{border:"1px solid black"}} 
            />

            <div >
                <b>{errorMsg}</b>
                <button disabled ={submitButtonDisabled} onClick={handleSubmission} className='bg-blue-500 text-black font-medium px-5 py-1  mt-2 rounded-md ml-2'
>Login</button>
                <p> 
                    Already have an account ?
                    <span>
                        <Link className='font-medium' to = "/signup">Sign up</Link>
                        <hr className='w-52 m-auto black'/>
                        </span>
                    </p>
            </div>

        </div>
    </div>
    }
       
    </>
  )
}

export default Login