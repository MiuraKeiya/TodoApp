import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useModal } from "react-hooks-use-modal";

export const Account = ()=> {
    const auth = useAuth();

    const navigate = useNavigate();

    const [Modal, open, close] = useModal('app', {
        preventScroll: true,
        focusTrapOptions : { 
            clickOutsideDeactivates : false , 
        } , 
    });

    const logout = () => {
        axios.get('/sanctum/csrf-cookie').then(() => {
            auth?.signOut().then(() => { 
            navigate('/');
        })
        })
    }

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
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{auth?.user?.name}</dd>
                    </div> 
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">メールアドレス</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{auth?.user?.email}</dd>
                    </div> 
                </dl>
            </div> 
        </div>
        <div className="py-5 text-center">
            <button className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 
                text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-2" onClick={open}>
                ログアウト
            </button>
        </div>
            <Modal>
                <div className="rounded bg-white px-10 py-10">
                    <p>ログアウトしますか？</p>
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