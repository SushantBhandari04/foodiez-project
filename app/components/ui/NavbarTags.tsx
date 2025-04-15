import { ReactElement } from "react";

export default function NavbarTags({ title, icon }: { title: string, icon?:ReactElement }) {
    return <div className="flex text-sm gap-1.5 justify-center items-center hover:bg-blue-800/60  cursor-pointer p-2 px-3 rounded-md transition transform ease-in">
        {icon}
        <h3>{title}</h3>
    </div>
}