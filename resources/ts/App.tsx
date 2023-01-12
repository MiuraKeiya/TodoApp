import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useForm } from "react-hook-form";
// import TextField from '@mui/material/TextField'; 使う？？
import { LoadingButton } from '@mui/lab';
import { useNavigate } from "react-router";

interface LoginData {
    email: string,
    password: string,
    submit: string
}
// ログイン時エラー表示
export const App = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<LoginData>();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const onSubmit = (data: LoginData) => {
        setLoading(true)
        axios.get('/sanctum/csrf-cookie').then(() => {
        axios.post('/api/login', data).then(() => {
            navigate('/Home')
        }).catch(error => {
            console.log(error)
            setError('submit', {
            type: 'manual',
            message: 'ログインに失敗しました'
            })
            setLoading(false)
        })
        })
    }

// ログイン画面    
    return (
        <div>
            <h1>ログイン</h1>
            <hr />
            <form onSubmit={e => {clearErrors(); handleSubmit(onSubmit)(e)}}>
            <div>
                <label>メールアドレス</label>
                <input placeholder='メールアドレス' {...register('email', {required: 'メールアドレスを入力してください'})} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>パスワード</label>
                <input placeholder='パスワード' {...register('password', {
                            required: 'パスワードを入力してください',
                            minLength: {
                            value: 8,
                            message: '8文字以上で入力してください'
                        }
                    })} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <div>
                    <button>Login</button>
                    {/* <LoadingButton loading={loading} type="submit" variant="contained" fullWidth>Login</LoadingButton> */}
                </div>
                <p><Link to="/Profile">新規登録</Link></p>
            {errors.submit && <p>{errors.submit.message}</p>}
            </div>
            </form>
        </div>
    )
}

/* // export const App: React.FC = () => {
//     return (
//         <div className='formContainer'>
//             <form>
//                 <h2>ログイン</h2>
//                 <hr />
//                 <div className='uiForm'>
//                     <div className='formField'>
//                         <label>ユーザー名</label>
//                         <input type='text' placeholder='ユーザー名' name='username' />
//                     </div>
//                     <div className='formField'>
//                         <label>メールアドレス</label>
//                         <input type='text' placeholder='メールアドレス' name='mailAddress' />
//                     </div>
//                     <div className='formField'>
//                         <label>パスワード</label>
//                         <input type='text' placeholder='パスワード' name='password' />
//                     </div>
//                     <button className='submitButton'>LOGIN</button>
//                     <Link to="/profile">アカウントを持っていない方はこちら</Link>
//                 </div>
//             </form>
//         </div>
//     );
// }; */

