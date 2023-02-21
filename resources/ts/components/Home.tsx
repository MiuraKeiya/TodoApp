import { useNavigate } from "react-router";

export const Home = () => {
    const navigate = useNavigate();

    const addition = () => {
        navigate('/addition')
    }

    const account = () => {
        navigate('/account')
    }
    
    return (
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
    )
}
