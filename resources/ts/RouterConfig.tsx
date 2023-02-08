import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Register } from './components/Register';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { ProvideAuth,PrivateRoute } from "./AuthContext";

export const RouterConfig = () => {
    return (
        <ProvideAuth>
            <BrowserRouter>
                <Routes>              
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path="/home/" element ={
                        <PrivateRoute redirect="/" component={<Home />} />
                        } />
                </Routes>
            </BrowserRouter>
        </ProvideAuth>
    )
};