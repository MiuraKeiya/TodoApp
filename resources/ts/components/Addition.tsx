import { useAuth } from "../AuthContext"
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
type taskData = {
    title: string;
    body: string;
};

export const Addition = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

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

    // useEffect(() => {
    //     axios.get('/api/user').then((res) => {
    //       setUser(res.data)
    //       console.log(res.data)
    //     }).catch((error) => {
    //       setUser(null)
    //       console.log(error)
    //     })
    //   }, [])
    
    //   if(user?.data === null) {
    //     navigate('/home')
    //   } else {
    //     navigate('/addition')
    //   }
      
    return (
        <div className="bg-white lg:pb-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <header className="flex justify-between items-center py-4 md:py-8">
                    <p className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5">
                        タスク追加
                    </p>
                </header>
            </div>
            <form onSubmit={e => {clearErrors(); handleSubmit(onSubmit)(e)}}>
                <div className="flex justify-center">
                    <div className="w-5/6">
                        <label>タイトル</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                        <input {...register('title')} placeholder="タイトル"></input>
                    <div>
                        <label>本文</label>
                        <input {...register('body')} placeholder="本文"></input>
                    </div>
                    <div>
                        <button type="submit">追加する</button>
                    </div>    
                    </div>
                    </div>
                </div>
            </form>
        </div>
        
    )
}