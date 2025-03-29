import { MenuItem } from "@/app/config";
import AddIcon from "./AddIcon";
import Image from "next/image";

export default function MenuCard({ menuItem, onClick }: { menuItem: MenuItem; onClick?: () => void }) {
  return (
    <div className="flex flex-col gap-4 bg-gradient-to-b from-gray-500 to-purple-1000 rounded-2xl pb-4 hover:bg-gray-900 hover:cursor-pointer hover:scale-105 transition transform">
      <img src={menuItem.imageUrl} alt="Image" className="h-40 rounded-t-xl" />
      <div className="flex flex-col justify-between gap-6 h-full px-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">{menuItem.name}</h2>
          <h4 className="text-sm text-gray-300">{menuItem.description}</h4>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl flex gap-0.5 text-red-400 font-semibold"><p className="">Rs.</p> {menuItem.price}</h2>
          <AddIcon onClick={onClick} />
        </div>
      </div>
    </div>
  );
}