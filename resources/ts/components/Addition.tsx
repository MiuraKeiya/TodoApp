import { useAuth } from "../AuthContext"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type taskData = {
    title: string;
    body: string;
};

export const Addition = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    // タスク追加処理
    const onSubmit = (taskData: taskData) => {
        setLoading(true);
        axios.get('/sanctum/csrf-cookie').then(() => {
            auth?.task(taskData).then(() => {
                navigate('/home')
            }).catch((error) => {
                console.log(error);
                setError('submit', {
                    type: 'manual',
                    message: '追加に失敗しました'
                    })
                    setLoading(false)
            })
        })   
    }
    // 戻るボタン
    const home = () => {
        navigate('/home');
    }

    return (
        <div className="bg-white lg:pb-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <header className="flex justify-between items-center py-4 md:py-8">
                    <p className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5">
                        <svg width="95" height="94" viewBox="0 0 95 94" className="w-6 h-auto text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                        </svg>
                        タスク追加
                    </p>
                    <button className="float-left bg-gray-400 text-white px-4 py-2 hover:bg-gray-300 rounded" onClick={home}>戻る</button>
                </header>
            </div>
            <form onSubmit={e => {clearErrors(); handleSubmit(onSubmit)(e)}}>
                <div className="flex justify-center">
                    <div className="w-5/6">
                        <input className="shadow appearance-none border rounded py-2 px-3 mb-8 text-grey-darker" {...register('title', {required: 'タイトルを入力してください'})} placeholder="タイトル"/>
                        {errors.title && <p className="text-indigo-600">{errors.title.message}</p>}
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-grey-darker" {...register('body', {required: '本文を入力してください'})} placeholder="本文"/>
                        {errors.body && <p className="text-indigo-600">{errors.body.message}</p>}
                    <div className="py-5 text-center">
                        <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 
                            text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2" type="submit">
                                追加する
                        </button>
                    </div>
                    </div>
                </div>
            </form>
        </div>     
    )
}