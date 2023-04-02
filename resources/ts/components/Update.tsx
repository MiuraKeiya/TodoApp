import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

type taskData = {
    title:string;
    body:string;
}
export const Update = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [task, setTask] = useState<taskData>({ title: '', body: '' });
    const {handleSubmit, register, setValue, formState: { errors }} = useForm();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    // タスク更新処理,バリデーション
    const updateTask = (taskData: taskData) => {
        if (taskData.title === task.title && taskData.body === task.body) {
            setIsFormSubmitted(true);
        } else {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.put(`/api/task/${id}`, taskData).then(() => {
                navigate('/home');
            }).catch((error) => {
                console.log(error);
            })
        })
        setIsFormSubmitted(false);
    }
}

    // 戻るボタン
    const home = () => {
        navigate('/home');
    }

    // 初回マウント時該当idのタスク取得
    useEffect(() => {
        axios.get(`/api/user/task/${id}`).then((res) => {
            setTask(res.data);
            console.log(res.data);
            setValue('title', res.data.title); // setValueを使用してフォームフィールドに初期値を設定
            setValue('body', res.data.body);
        })
    }, [])

    return (
        <div className="bg-white lg:pb-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <header className="flex justify-between items-center py-4 md:py-8">
                    <p className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5">
                        <svg width="95" height="94" viewBox="0 0 95 94" className="w-6 h-auto text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                        </svg>
                        タスク編集
                    </p>
                    <button className="float-left bg-gray-400 text-white px-4 py-2 hover:bg-gray-300 rounded" onClick={home}>
                        戻る
                    </button>
                </header>
                <form onSubmit={handleSubmit(updateTask)}>
                    <div className="flex justify-center">
                        <div className="w-5/6">
                            <p className="text-lg font-bold mb-3">タイトル</p>
                            <input className="shadow appearance-none border rounded py-2 px-3 mb-10 text-grey-darker" {...register('title')} defaultValue={task.title}/>
                            <p className="text-lg font-bold mb-3">本文</p>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-grey-darker" {...register('body')} defaultValue={task.body} />
                            {isFormSubmitted && (
                                <p className="text-indigo-600">タイトルまたは本文が変更されていません。</p>
                            )}
                            <div className="py-5 text-center">
                                <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 
                                text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2" type="submit">
                                    保存
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}