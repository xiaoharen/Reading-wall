import {HashRouter, Routes, Route} from "react-router-dom";
import Login from "../component/user/login.jsx";
import Index from "../component/book/bookList01.jsx";
import Admin from "../component/admin/admin.jsx";
import Register from "../component/user/register.jsx";
function route() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/" element={<Index/>}></Route>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </HashRouter>
    );
}

export default route;