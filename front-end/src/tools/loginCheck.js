import axios from "axios";
import BackURL from "./backURL.js";
import frontURL from "./frontURL.js";

const loginCheck = () => {
    axios({
        method: 'GET',
        url: BackURL + 'login.php',
        withCredentials: true,
        headers: {'content-type': 'application/json'},
    })
        .then(res => {
            if(res.data === "error"){
                window.location.replace(frontURL + "#login");
            }
        }, error => {
            console.log('错误', error.message)
        })
}

export default loginCheck;