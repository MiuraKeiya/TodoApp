import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";

export const Home = () => {
    const navigate = useNavigate();
    const auth = useAuth(); 

    const logout = () => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            auth?.signOut().then(() => { // 編集
            navigate('/');
        })
        })
    }
    return (
        <div>
            <h1>Todo {auth?.user?.name}</h1>
            <button onClick={logout}>ログアウト</button>
        </div>
    )
}
