import axios from 'axios';
import { Link } from "react-router-dom";


export const App: React.FC = () => {
    return (
        <div className='formContainer'>
            <form>
                <h2>ログイン</h2>
                <hr />
                <div className='uiForm'>
                    <div className='formField'>
                        <label>ユーザー名</label>
                        <input type='text' placeholder='ユーザー名' name='username' />
                    </div>
                    <div className='formField'>
                        <label>メールアドレス</label>
                        <input type='text' placeholder='メールアドレス' name='mailAddress' />
                    </div>
                    <div className='formField'>
                        <label>パスワード</label>
                        <input type='text' placeholder='パスワード' name='password' />
                    </div>
                    <button className='submitButton'>LOGIN</button>
                    <Link to="/profile">アカウントを持っていない方はこちら</Link>
                </div>
            </form>
        </div>
    );
};

