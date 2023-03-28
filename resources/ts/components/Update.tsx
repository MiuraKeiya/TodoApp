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
    const {handleSubmit, register, setValue} = useForm();

    const updateTask = (taskData: taskData) => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            axios.put(`/api/task/${id}`, taskData).then(() => {
                navigate('/home');
            })
        })
    }

    useEffect(() => {
        axios.get(`/api/user/task/${id}`).then((res) => {
            setTask(res.data);
            console.log(res.data);
            setValue('title', res.data.title); // setValueを使用してフォームフィールドに初期値を設定
            setValue('body', res.data.body);
        })
    }, [])

    return (
        <div>
            <h1>タスク編集</h1>
                <form onSubmit={handleSubmit(updateTask)}>
                    <div>
                        <input {...register('title')} defaultValue={task.title}/>
                        <input {...register('body')} defaultValue={task.body} />
                        <button type="submit">保存</button>
                    </div>
                </form>
        </div>
    )
}