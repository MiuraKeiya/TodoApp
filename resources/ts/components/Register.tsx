import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { RegisterData } from "../AuthContext";
// 型を定義
interface RegisterForm extends RegisterData{
    name: string,
    submit: string
};

// ユーザー登録
export const Register = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterForm>();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const auth = useAuth() // 追加
    // const instance = axios.create({
    //     baseURL: 'http://localhost:80',
    //     withCredentials: true,
    // });

    const onSubmit = (data: RegisterForm) => {
        setLoading(true)
        axios.get('/sanctum/csrf-cookie').then(() => { // Laravel Sanctumをインストールした時点で専用のエンドポイント(/sanctum/csrf-cookie)が追加されており、認証処理を行う前にこのエンドポイントにリクエストを投げて、アプリケーションのCSRF保護を初期化する必要がある
            auth?.register(data).then(() => {
                navigate('/home') // 第一引数に遷移するパス
            }).catch((error) => {
                console.log(error);
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
        <div className="p-4 max-w-screen-sm mx-auto">
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
                <button type="submit" disabled={loading} >アカウントを作成する</button>
                {errors.submit && <p>{errors.submit.message}</p>}
            </div>
            </form>
        </div>
    )
}
