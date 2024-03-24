import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { Dropdown } from 'antd'
import { EllipsisOutlined  } from '@ant-design/icons';

import CreatePost from './CreatePost'
import { TOKEN_KEY } from "../utils/constants";
import { useMutation } from "@apollo/client";
import { USER_LOGOUT } from "../graphql/user";
const items = [
    {
        key: 'logout',
        label: <span className="cursor-pointer w-10">logout</span>,
    },
];


function SideBar() {
    const [visibleCreatePost, setVisibleCreatePost] = useState(false)
    const [logout] = useMutation(USER_LOGOUT, {
        onCompleted() {
            sessionStorage.removeItem(TOKEN_KEY)
            navigate('/login')
        },
    });
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        if (e.key === 'logout') {
            logout();
        }
    }
    return (
        <div className='flex flex-col justify-between mb-4 '>
            <div className="top flex flex-col flex-1 ">
                <Link to='/home' className='py-4  px-8 text-4xl cursor-pointer'>
                    <i className="bullseye icon "></i>
                </Link>
                <Link to='/home' className='py-4 hover:bg-slate-100 rounded-full px-8 text-2xl'>Home</Link>
                <Link to='/explore' className='py-4 hover:bg-slate-100 rounded-full px-8 text-2xl'>Explore</Link>
                <Link to='/notifications' className='py-4 hover:bg-slate-100 px-8 rounded-full text-2xl'>Notifications</Link>
                <Link className='py-4 hover:bg-slate-100 rounded-full px-8 text-2xl mb-4'>Profile</Link>
                <button type="primary" className='py-4 hover:bg-sky-300 bg-sky-400 rounded-full  text-2xl text-white duration-300' onClick={() => setVisibleCreatePost(true)}>Post</button>
            </div>
            <div className='flex hover:bg-slate-100 rounded-full px-2 py-2 cursor-pointer items-center justify-between'>
                <span className='size-10 rounded-full bg-sky-500 text-center leading-10 text-white mr-4' >U</span>
                <div className='flex flex-col'>
                    <span className=" font-bold">username</span>
                    <span>@username</span>
                </div>
                <Dropdown
                    menu={{
                        items,
                        onClick: handleMenuClick
                    }}
                >
                    <EllipsisOutlined className="font-medium text-2xl"/>
                </Dropdown>
            </div>
            <CreatePost
                visible={visibleCreatePost}
                handleClose={() => setVisibleCreatePost(false)}
            />
        </div>
    )
}

export default SideBar