import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import RightSideBar from "./RightSideBar";

export default function Layout() {
    return (
        <div className="flex h-full">
            <div className='h-full max-h-full w-1/4  flex justify-end px-10'>
                <SideBar />
            </div>
            <div className="w-2/4 overflow-y-auto px-8 border-x border-x-slate-100">
                <Outlet />
            </div>
            <div className="h-full max-h-full w-1/4">
                <RightSideBar />
            </div>
        </div>
    )
}