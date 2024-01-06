import "./login.css";
import axios from "axios";
import BackURL from "../../tools/backURL.js";
import frontURL from "../../tools/frontURL.js";

function App() {
    const loginCheck = () => {
        const username = document.getElementById('username').value;
        const password= document.getElementById('password').value;
        const requestData = {
            username: username,
            password: password
        }
        axios({
            method: 'POST',
            url: BackURL + 'login.php',
            withCredentials: true,
            headers: {'content-type': 'application/json'},
            data: JSON.stringify(requestData)
        })
            .then(res => {
                console.log(res.data);
                if(res.data === "success"){
                    window.location.replace(frontURL + "#admin");
                }else {
                    window.location.replace(frontURL + "#login");
                }
            }, error => {
                console.log('错误', error.message)
            })
    }

    return (
        <div className="xhr-login-01">
            <form>
                <div className="xhr-login-01-segment">
                    <h1>Login</h1>
                </div>

                <label>
                    <input id="username" type="text" placeholder="User Name" />
                </label>
                <label>
                    <input id="password" type="password" placeholder="Password" />
                </label>
                <a href="/#register">Sign up</a>
                <button className="red" type="button" onClick={loginCheck}><i className="icon ion-md-lock"></i>Log in</button>
            </form>
        </div>
    )
}

export default App