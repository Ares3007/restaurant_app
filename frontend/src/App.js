import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Menu from "./Pages/Menu";

function App() {
	return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path="/menu/" element={<Menu/>}/>
    </Routes>
    </BrowserRouter>
    </>
		);
}

export default App;
