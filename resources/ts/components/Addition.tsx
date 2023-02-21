import { useAuth } from "../AuthContext"
import { useForm } from "react-hook-form";
import { useState } from "react";

export const Addition = () => {
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const onSubmit = (data) => {
    
        auth?.task(data).then((res) => {
            console.log(res.title);
        })
    }

    return (
        <div className="bg-white lg:pb-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <header className="flex justify-between items-center py-4 md:py-8">
                    <p className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5">
                        タスク追加
                    </p>
                </header>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                    <div className="w-5/6">
                        <label>タイトル</label>
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
            </form>
        </div>
        
    )
}