import { Link } from "react-router-dom";


export const Profile = () => {
    return (
        <div className='signupContainer'>
            <form>
                <h2>アカウント作成</h2>
                <Link to="/">アカウントを持っている方はこちら</Link>
                <hr />
                <div className='uiSignup'>
                    <div className='signupField'>
                        <label>ユーザー名</label>
                        <input type='text' placeholder='ユーザー名' name='username' />
                    </div>
                    <div className='signupField'>
                        <label>メールアドレス</label>
                        <input type='text' placeholder='メールアドレス' name='mailAddress' />
                    </div>
                    <div className='signupField'>
                        <label>パスワード</label>
                        <input type='text' placeholder='パスワード' name='password' />
                    </div>
                    <button className='submitButton'>アカウントを作成する</button>
                </div>
            </form>
        </div>
    );
};