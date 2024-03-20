import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Menu from "./Pages/Menu";
import AdminCategory from "./Pages/AdminCategory";
import AdminMenu from "./Pages/AdminMenu";

function App() {
	return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/menu/" element={<Menu/>}/>
    <Route path="/admin-category/:id" element={<AdminCategory/>}/>
    <Route path="/admin-menu/:id" element={<AdminMenu/>}/>
    </Routes>
    </BrowserRouter>
    </>
		);
}

export default App;
