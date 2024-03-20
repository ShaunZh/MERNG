
function LeftSideBar() {
    return (
        <div className='w-3/4 pl-8 pt-4 h-full'>
            <div className='flex py-3 px-4 bg-slate-100 rounded-full overflow-hidden items-center text-slate-500 text-lg'>
                <i aria-hidden="true" className="search icon pb-6" />
                <input type="text" placeholder="Search"
                    className='w-full  bg-slate-100 h-8 border-0 focus:outline-none' />
            </div>
        </div>
    )
}

export default LeftSideBar