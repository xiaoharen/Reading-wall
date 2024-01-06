import axios from "axios";
import FrontURL from "./frontURL.js";
import BackURL from "./backURL.js";

const logout = () => {
    axios({
        method: 'GET',
        url: BackURL + 'logout.php',
        withCredentials: true,
    })
        .then(res => {
            console.log(res.data)
            if(res.data === "success") {
                window.location.replace(FrontURL + "#login");
            }
        }, error => {
            console.log('错误', error.message)
        })
}

export default logout;