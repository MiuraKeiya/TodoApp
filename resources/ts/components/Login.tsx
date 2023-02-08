import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
interface LoginData {
    email: string,
    password: string,
    submit: string
}
// ログイン時エラー表示
export const Login = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<LoginData>();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const auth = useAuth()

    const onSubmit = (data: LoginData) => {
        setLoading(true)
        axios.get('/sanctum/csrf-cookie').then(() => {
            auth?.signIn(data).then(() => {
            navigate('/home')
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
                    <button type="submit" disabled={loading}>Login</button>
                </div>
                <p><Link to="/register">新規登録</Link></p>
                {errors.submit && <p>{errors.submit.message}</p>}
            </div>
            </form>
        </div>
    )
}

