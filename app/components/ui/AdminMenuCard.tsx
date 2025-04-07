"use client"

import { MenuItem } from "@/app/config";
import { useMenuItemsStore, useUpdateItemStore, useUpdateModalStore } from "@/store";
import axios from "axios";
import { toast } from "react-toastify";



export default function AdminMenuCard({ menuItem }: { menuItem: MenuItem}) {
    const {menuItems,setItems} = useMenuItemsStore(state=>state);
    const openModal = useUpdateModalStore(state=>state.openModal)
    const setId = useUpdateItemStore(state=>state.setId)



    async function updateItem(){
      setId(menuItem.id);
      openModal();
    }


    async function deleteItem(id:string){
    
        const response = await axios.delete(`/api/menu`,{
            data:{
                id
            }
        })
        console.log(response.data);
    
        if(response){
            const newMenuItems = menuItems.filter(item=>item.id!=id);
            setItems(newMenuItems);
            toast.success("Item removed successfully.",{
                autoClose: 1000,
            })
        }
        else{
            toast.error("Error while removing item!",{
                autoClose: 1000
            })
        }
    }
  return (
    <div className="flex flex-col gap-2 bg-gradient-to-b from-gray-500 text-white to-purple-1000 rounded-2xl pb-4 hover:bg-gray-900 hover:scale-102 transition transform">
      <img src={menuItem.imageUrl} alt="Image" className="h-40 rounded-t-xl" />
      <div className="flex flex-col justify-between gap-4 h-full px-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">{menuItem.name}</h2>
          <h4 className="text-sm text-gray-300">{menuItem.description}</h4>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl flex gap-0.5 text-red-400 font-semibold"><p className="">Rs.</p> {menuItem.price}</h2>
        </div>
        <div className="flex gap-4 w-full justify-center">
            <button onClick={updateItem} className="bg-green-600 w-full py-1 rounded-lg text-white cursor-pointer hover:bg-green-700">Update item</button>
            <button onClick={()=>deleteItem(menuItem.id)} className="bg-red-500 w-full py-2 rounded-lg text-white cursor-pointer hover:bg-red-600">Delete item</button>
        </div>
      </div>
    </div>
  );
}
