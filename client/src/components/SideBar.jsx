import { Link } from "react-router-dom";

function SideBar() {
    return (
        <div className='h-full max-h-full side-bar w-1/4 flex justify-end'>
            <div className="flex flex-col justify-between h-full w-2/3">
                <div className="top flex flex-col flex-1 ">
                    <Link to='/home' className='py-4  px-8 text-4xl cursor-pointer'>
                        <i className="bullseye icon "></i>
                    </Link>
                    <Link to='/home' className='py-4 hover:bg-slate-100 rounded-full px-8 text-2xl'>Home</Link>
                    <Link to='/explore' className='py-4 hover:bg-slate-100 rounded-full px-8 text-2xl'>Explore</Link>
                    <Link to='/notifications' className='py-4 hover:bg-slate-100 px-8 rounded-full text-2xl'>Notifications</Link>
                    <Link className='py-4 hover:bg-slate-100 rounded-full px-8 text-2xl mb-4'>Profile</Link> 
                    <button className='py-4 hover:bg-sky-300 bg-sky-400 rounded-full  text-2xl text-white duration-300'>Post</button>
                </div>
                <div className='flex items-center hover:bg-slate-100 rounded-full px-8 py-2 cursor-pointer'>
                    <span className='size-10 rounded-full bg-sky-500 text-center leading-10 text-white mr-4' >U</span>
                    <div className='flex flex-col'>
                        <span className="text-xl font-bold">username</span>
                        <span>@username</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar