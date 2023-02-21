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
    submit?: string,
    password_confirmation: number | string
};

// ユーザー登録
export const Register = () => {
    const { getValues, register, handleSubmit, setError, formState: { errors } } = useForm<RegisterForm>();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const auth = useAuth() // 追加

    const onSubmit = (data: RegisterForm) => {
        setLoading(true)
        axios.get('/sanctum/csrf-cookie').then(() => { // Laravel Sanctumをインストールした時点で専用のエンドポイント(/sanctum/csrf-cookie)が追加されており、認証処理を行う前にこのエンドポイントにリクエストを投げて、アプリケーションのCSRF保護を初期化する必要がある
            auth?.register(data).then((res) => {
                console.log(res);
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
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
            <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">アカウント作成</h1>
            <p className="mt-2 text-center text-sm text-gray-600">
                <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">アカウントを持っている方はこちら</Link>
            </p>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 m-16">
                <div>
                    <label className="sr-only text-gray-700">ユーザー名</label>
                    <div>
                    <input placeholder='ユーザー名' {...register('name', {required: 'ユーザー名を入力してください'})} className="border rounded-md border-gray-300 w-full p-2 text-lg text-emerald-900"/>
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                </div>
                <div>
                    <label className=" sr-only text-gray-700">メールアドレス</label>
                    <input type="email" placeholder='メールアドレス' {...register('email', {required: 'メールアドレスを入力してください'})} 
                        className="border rounded-md border-gray-300 w-full p-2 text-lg text-emerald-900"/>
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div id="password">
                    <label className="sr-only text-gray-700">パスワード</label>
                    <input placeholder='パスワード' {...register('password', {
                                required: 'パスワードを入力してください',
                                minLength: {
                                value: 8,
                                message: '8文字以上で入力してください'
                            }
                    })} className="border rounded-md border-gray-300 w-full p-2 text-lg text-emerald-900"/>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div>
                    <label className="sr-only text-gray-700">パスワード確認</label>
                    <input placeholder="パスワード確認" {...register('password_confirmation', {
                        required: '入力してください',
                        validate: (value) => {
                            return (
                                value === getValues("password") || "パスワードが一致しません"
                            ); }
                    })} className="border rounded-md border-gray-300 w-full p-2 text-lg text-emerald-900"/>
                    {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}
                </div>        
            <div>
                <button type="submit" disabled={loading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 
                    py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    アカウントを作成する
                </button>
                {errors.submit && <p className="text-red-500">{errors.submit.message}</p>}
            </div>
            </form>
            </div>
        </div>
    )
}
