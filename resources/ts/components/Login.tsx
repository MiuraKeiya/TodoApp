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
            navigate('/home', {state: {from: '/'}}) // 遷移元にパスを送る
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
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></img>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">ログイン</h2>
                <hr />
            <form className="mt-8 space-y-6" onSubmit={e => {clearErrors(); handleSubmit(onSubmit)(e)}}>
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label className="sr-only">メールアドレス</label>
                    <input className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" type="email" placeholder='メールアドレス'
                        {...register('email', {required: '必須入力です'})} />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <label className="sr-only">パスワード</label>
                <input placeholder='パスワード' {...register('password', {
                            required: '必須入力です',
                            minLength: {
                            value: 8,
                            message: '8文字以上で入力してください'
                        }
                    })} className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <div>
                <button type="submit" disabled={loading} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    ログイン
                </button>
                <p className="mt-6 text-center font-medium text-indigo-600 hover:text-indigo-500">
                    <Link to="/register">新規登録</Link>
                </p>
                {errors.submit && <p className="text-red-500">{errors.submit.message}</p>}
            </div>
            </form>
            </div>
        </div>
    )
}

