import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Register } from './components/Register';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Addition } from "./components/Addition";
import { Account } from "./components/Account";
import { Update } from "./components/Update";
import { ProvideAuth, PrivateRoute, PublicRoute } from "./AuthContext";
import { NotFound } from "./components/NotFound";

export const RouterConfig = () => {
    return (
        <ProvideAuth>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <PublicRoute redirect='/home' component={<Login />} />                   
                    } />
                    <Route path='/register' element={
                        <PublicRoute redirect='/home' component={<Register />} />
                    } />
                    <Route path='/home/' element={
                        <PrivateRoute redirect='/' component={<Home />} />
                    } />
                    <Route path='/addition' element={
                        <PrivateRoute redirect='/' component={<Addition />} />
                    } />
                    <Route path='/account' element={
                        <PrivateRoute redirect='/' component={<Account />} />
                    } />
                    <Route path='/update/:id' element={
                        <PrivateRoute redirect='/' component={<Update />} />
                    } />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ProvideAuth>
    )
};