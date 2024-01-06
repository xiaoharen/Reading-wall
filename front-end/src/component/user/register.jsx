import "./login.css";
import {useEffect, useState} from "react";
import axios from "axios";
import BackURL from "../../tools/backURL.js";
import FrontURL from "../../tools/frontURL.js";

function App() {
    const userRegister = () => {
        const username = document.getElementById('username').value;
        const password= document.getElementById('password').value;
        const requestData = {
            username: username,
            password: password
        }
        axios({
            method: 'POST',
            url: BackURL + 'register.php',
            withCredentials: true,
            headers: {'content-type': 'application/json'},
            data: JSON.stringify(requestData)
        })
            .then(res => {
                if(res.data === "success") {
                    alert("注册成功");
                    window.location.replace(FrontURL + "#login");
                }
            }, error => {
                console.log('错误', error.message)
            })
    };

    return (
        <div className="xhr-login-01">
            <form>
                <div className="xhr-login-01-segment">
                    <h1>Sign up</h1>
                </div>

                <label>
                    <input id="username" type="text" placeholder="User name" />
                </label>
                <label>
                    <input id="password" type="password" placeholder="Password" />
                </label>
                <button className="red" type="button" onClick={userRegister}><i className="icon ion-md-lock"></i>Sign up
                </button>
            </form>
        </div>
    )
}

export default App