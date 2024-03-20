import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Menu from "./Pages/Menu";
import AdminCategory from "./Pages/AdminCategory";
import AdminMenu from "./Pages/AdminMenu";
import UserOrder from "./Pages/UserOrder";

function App() {
	return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/user" element={<Menu/>}/>
    <Route path="/admin-category/:id" element={<AdminCategory/>}/>
    <Route path="/admin-menu/:id" element={<AdminMenu/>}/>
    <Route path='/user-order' element={<UserOrder/>}/>
    </Routes>
    </BrowserRouter>
    </>
		);
}

export default App;
