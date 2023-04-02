import { useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router";

type Task = {
    id: number;
    title: string;
    body: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
};

export const Home = () => {
    const navigate = useNavigate();
    
    //　タスク登録画面へ
    const addition = () => {
        navigate('/addition')
    }

    // アカウント画面へ
    const account = () => {
        navigate('/account')
    }

    // タスク取得
    const [task, setTask] = useState<Task[]>([]);
    useEffect(() => {
        axios.get<Task[]>('api/user/task').then((res) => {
            setTask(res.data);
            console.log(res.data)
        })
    }, [])

    // 認証ユーザー取得
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get('/api/user').then((res) => {
            setUser(res.data);
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    // ログイン時にトースト表示
    useEffect(() => {
        if (user && from === '/') {
            toast.success(`ようこそ！${user.name}さん`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
        }
    }, [user])

    // タスク削除
    const deleteTask = (id: number) => {
        axios.delete(`/api/user/task/${id}`).then((res) => {
            console.log(res);
            setTask(task.filter((t) => t.id !== id));
            close();
        })
    }
    
    // 削除時モーダル表示
    const [Modal, open, close] = useModal('app', {
        preventScroll: true,
        focusTrapOptions : { 
            clickOutsideDeactivates : false,
        }, 
    });

    // モーダルにidを渡す処理
    const [targetTask, setTargetTask] = useState<Task | undefined>();
    const taskId = (taskId: number) => {
        const target = task.find(t => t.id === taskId);
        setTargetTask(target);
    }

    // 遷移元のpath取得処理
    const location = useLocation();
    const from = location.state?.from;
    console.log(from)

    return (
    <div>
        <ToastContainer hideProgressBar={true}/>
        <div className="bg-white lg:pb-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <header className="flex justify-between items-center py-4 md:py-8">
                    <p className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5" aria-label="logo">
                        <svg width="95" height="94" viewBox="0 0 95 94" className="w-6 h-auto text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                        </svg>
                        タスク一覧
                    </p>                 
                    <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
                        <button onClick={addition} className="inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                            </svg>
                            追加
                        </button>
                        <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2" onClick={account}>
                            アカウント
                        </button>
                    </div>
                </header>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                    <th scope="col" className="text-lg font-bold text-gray-900 px-6 py-4 text-left">
                                        タイトル
                                    </th>
                                    <th scope="col" className="text-lg font-bold text-gray-900 px-6 py-4 text-left">
                                        本文
                                    </th>
                                    <th scope="col" className="text-lg font-bold text-gray-900 px-6 py-4 text-right">
                                        タスク数：{task.length}個
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {task.map((t, index) => (
                                <tr className={index % 2 === 0 ? "bg-gray-100" : "bg-white"} key={t.id}>
                                    <td className="px-6 py-4 whitespace-normal">{t.title}</td>
                                    <td className="px-6 py-4 whitespace-normal">{t.body}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex justify-end">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => navigate('/update/' + t.id)}>
                                                編集
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {open(); taskId(t.id)}}>
                                                削除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>    
                        </table>
                    </div> 
                </div> 
            </div>
        </div>
        <Modal>
            <div className="rounded bg-white px-10 py-10">
                <h1>削除しますか？</h1>
                <hr />
                <br />
                <div className="flex">
                    <button className="text-indigo-600 flex-1" onClick={() => targetTask && deleteTask(targetTask.id)}>はい</button>
                    <button className="text-indigo-600 flex-1" onClick={close}>いいえ</button>
                </div>
            </div>
        </Modal> 
    </div>
    )
}
