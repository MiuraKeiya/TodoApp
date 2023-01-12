import axios from "axios";
import { useNavigate } from "react-router";

export const Home = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios.get('/sanctum/csrf-cookie').then(() => {
        axios.post('/api/logout', {}).then(() => {
            navigate('/');
        })
        })
    }
    return (
        <div>
            <h1>Home</h1>
            <button onClick={logout}>ログアウト</button>
        </div>
    )
}
