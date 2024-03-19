import { Link } from "react-router-dom";


function SideBar() {
    return (
        <div className='h-full max-h-full side-bar w-1/4 flex flex-col justify-between'>
            <div className="top flex flex-col flex-1">
                <Link to='/home' className='py-4 hover:bg-sky-200'>Home</Link>
                <Link to='/explore' className='py-4 hover:bg-sky-200'>Explore</Link>
                <Link to='/notifications' className='py-4 hover:bg-sky-200'>Notifications</Link>
                <Link className='py-4 hover:bg-sky-200'>Profile</Link> 
                <button className='py-4 px-8  hover:bg-sky-400 bg-current'>Post</button>
            </div>
            <div className='flex'>
                <span className='size-8 rounded bg-sky-500'>U</span>
                <div className='flex flex-col '>
                    <span>username</span>
                    <span>@username</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar