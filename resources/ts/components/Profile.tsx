import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useForm } from "react-hook-form";
// import TextField from '@mui/material/TextField'; 使う??
import { LoadingButton } from '@mui/lab';
import { useNavigate } from "react-router-dom";

// 型を定義
interface NameAndEmailAndPassword {
    name: string,
    email: string,
    password: string,
    submit: string
};

// ユーザー登録時エラー表示
export const Profile = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<NameAndEmailAndPassword>();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    
    const onSubmit = (data: NameAndEmailAndPassword) => {
        setLoading(true)
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.post('/api/register', data).then(() => {
                navigate('/') // 第一引数に遷移するパス
            }).catch(error => {
                console.log(error)
                setError('submit', {
                type: 'manual',
                message: '登録に失敗しました。再度登録をしてください'
                })
                setLoading(false)
            })
        })
    }
    
    // ユーザー登録画面
    return (
        <div>
            <h1 className="text-center text-xl font-bold">アカウント作成</h1>
            <p className="text-center"><Link to="/" className="text-sm c-link">アカウントを持っている方はこちら</Link></p>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>ユーザー名</label>
                    <input placeholder='ユーザー名' {...register('name', {required: 'ユーザー名を入力してください'})} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
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
                <button>アカウントを作成する</button>
                {/* <LoadingButton type="submit" loading={loading} variant="contained" fullWidth>アカウントを作成する</LoadingButton> */}
                {errors.submit && <p>{errors.submit.message}</p>}
            </div>
            </form>
        </div>
    )
}
    
/* //     return (
//         <div className='signupContainer'>
//             <form>
//                 <h2>アカウント作成</h2>
//                 <Link to="/">アカウントを持っている方はこちら</Link>
//                 <hr />
//                 <div className='uiSignup'>
//                     <div className='signupField'>
//                         <label>ユーザー名</label>
//                         <input type='text' placeholder='ユーザー名' name='username' />
//                     </div>
//                     <div className='signupField'>
//                         <label>メールアドレス</label>
//                         <input type='text' placeholder='メールアドレス' name='mailAddress' />
//                     </div>
//                     <div className='signupField'>
//                         <label>パスワード</label>
//                         <input type='text' placeholder='パスワード' name='password' />
//                     </div>
//                     <button className='submitButton'>アカウントを作成する</button>
//                 </div>
//             </form>
//         </div>
//     );
// }; */