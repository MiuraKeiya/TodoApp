export const Addition = () => {
    

    return (
        <div className="bg-white lg:pb-12">
            <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                <header className="flex justify-between items-center py-4 md:py-8">
                    <p className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5">
                        タスク追加
                    </p>
                </header>
            </div>
            <form>
                <div className="flex justify-center">
                    <div className="w-5/6">
                        <textarea className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded
                            transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="新しいタスク"/>
                    </div>
                </div>
            </form>
        </div>
        
    )
}