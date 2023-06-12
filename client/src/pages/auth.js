import React, { useState } from 'react'; 
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    return  <div className="auth">
                <Login />
                <Register />
            </div>
};


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [cookies ,setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate(); // to take you to a certain page once you loggedIn

    //Api request
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
      const response = await axios.post("http://localhost:3002/auth/login",{username, password})
       setCookies("access_token", response.data.token);
       window.localStorage.setItem("userID", response.data.userID);
       navigate("/");     
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label='Login' onSubmit={onSubmit}/>
    )
}

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    //Api request
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3002/auth/register",{username, password})
            alert("Registration Completed! Now you can login")
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label='Register' onSubmit={onSubmit}/>
    )
}


const Form = ({username,setUsername,password,setPassword, label, onSubmit}) => {
    return (
        <div className="auth-container">
            <form action="" onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button type='submit'>{label}</button>
            </form>
        </div>
        
    )}

