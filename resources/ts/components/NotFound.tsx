import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
            <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                ページが見つかりません
            </div>
            <div className="mt-10">
                <Link to="/" className="text-[#FF6A3D] text-lg font-medium hover:text-white">
                    <span className="border-b-2 border-[#FF6A3D] hover:border-white">
                        戻る
                    </span>
                </Link>
            </div>
        </main>
    );
}