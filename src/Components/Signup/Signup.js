import React, { useState } from 'react'
// import styles from "./Signup.module.css"
import InputControl from '../InputControl/InputControl'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase"

const Signup = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return
        }


        setErrorMsg("");

        setSubmitButtonDisabled(true)

        createUserWithEmailAndPassword(auth, values.email, values.pass).then(async (res) => {
            setSubmitButtonDisabled(false)
            const user = res.user;
            await updateProfile(user, {
                displayName: values.name
            });
            navigate("/")
            console.log(user)

        })
            .catch((err) => {
                setSubmitButtonDisabled(false)
                setErrorMsg(err.message)
            })
    }

    return (
        <div >
            <div className='w-96 h-[300px]  rounded-lg mt-5 m-auto text-center' style={{border:"1px solid black"}}>
                <h1 className='w-full bg-purple-400 p-2 rounded-lg' >
                    Signup
                </h1>
                <InputControl  className="pb-3 mt-5 pl-24 justify-center rounded-lg h-8"style={{border:"1px solid black"}} label="Name" placeholder="Enter your name"
                    onChange={event => setValues(prev => ({ ...prev, name: event.target.value }))
                    }
                />
                <InputControl className="pb-3 mt-5 pl-24 justify-center rounded-lg h-8"style={{border:"1px solid black"}} label="Email" placeholder="Enter Email Password"
                    onChange={event => setValues(prev => ({ ...prev, email: event.target.value }))
                    }
                />
                <InputControl className="pb-3 mt-5 pl-24 justify-center rounded-lg h-8"style={{border:"1px solid black"}} label="Password" placeholder="Enter Password"
                    onChange={event => setValues(prev => ({ ...prev, pass: event.target.value }))
                    }
                />

                <div >
                    <b >{errorMsg}</b>
                    <button onClick={handleSubmission}
                        disabled={submitButtonDisabled}
                        className='bg-blue-500 text-black font-medium px-5 py-1  mt-2 rounded-md ml-2'
                    >Signup</button>
                    <p>
                        Already have an account ?
                        <span>
                            <Link className='font-medium' to="/login">Login</Link>
                        <hr className='w-52 m-auto black'/>
                        </span>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Signup