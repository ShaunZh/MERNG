import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout() {
    return (
        <div className="flex h-full">
            <SideBar />
            <div className="w-3/4 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}