import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_recovery_codes: string | null;
    two_factor_secret: string | null;
    created_at: string;
    updated_at: string | null;
}

export const Account = ()=> {
    const auth = useAuth();

    const navigate = useNavigate();

    // ログアウト時モーダル表示
    const [Modal, open, close] = useModal('app', {
        preventScroll: true,
        focusTrapOptions : { 
            clickOutsideDeactivates : false,
        }, 
    });

    // ログアウト処理
    const logout = () => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            auth?.signOut().then(() => { 
            navigate('/');
        })
        })
    }

    // 戻るボタン
    const home = () => {
        navigate('/home');
    }

    // 初回マウント時認証ユーザー情報取得
    const [user, setUser]= useState<User>();
    useEffect(() => {
        axios.get<User>('/api/user').then((res) => {
            setUser(res.data);
        })
    }, [])

    return (
        <>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h1>アカウント</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">個人情報</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="ext-sm font-medium text-gray-500">ユーザー名</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user?.name}</dd>
                    </div> 
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">メールアドレス</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user?.email}</dd>
                    </div> 
                </dl>
            </div> 
        </div>
        <div className="py-5 text-center">
            <button className="float-left bg-gray-400 text-white px-4 py-2 hover:bg-gray-300 rounded" onClick={home}>戻る</button>
            <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 
                text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2" onClick={open}>
                ログアウト
            </button>
        </div>
            <Modal>
                <div className="rounded bg-white px-10 py-10">
                    <h1>ログアウトしますか？</h1>
                    <hr />
                    <br />
                    <div className="flex">
                        <button className="text-indigo-600 flex-1" onClick={logout}>はい</button>
                        <button className="text-indigo-600 flex-1" onClick={close}>いいえ</button>
                    </div>
                </div>
            </Modal> 
        </>
    )
}