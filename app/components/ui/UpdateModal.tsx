"use client"

import { motion } from "framer-motion"
import { useMenuItemsStore, useUpdateItemStore, useUpdateModalStore } from "@/store";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function UpdateModal() {
    const closeModal = useUpdateModalStore((state) => state.closeModal)
    const { menuItems, setItems } = useMenuItemsStore((state) => state);
    const id = useUpdateItemStore(state=>state.id)

    async function handleSubmit(e: any) {
            e.preventDefault();
            const data = {
                id,
                name: e.target.name.value || undefined,
                description: e.target.description.value || undefined,
                imageUrl: e.target.imageUrl.value || undefined,
                price: e.target.price.value ? parseInt(e.target.price.value) : undefined,
                typeName: e.target.typeName.value || undefined,
              };
            const response = await axios.put("http://localhost:3000/api/menu",data)
            const result = response.data
            if (result) {
                const updatedMenuItems = menuItems.map((item) =>
                    item.id === id ? { id: data.id || item.id, name:  data.name  || item.name, description: data.description || item.description, price: data.price || item.price, typeName: data.typeName || item.typeName,  imageUrl: data.imageUrl || item.imageUrl,  } : item
                );
                setItems(updatedMenuItems);

                Swal.fire({
                    title: "Success!",
                    text: "Item updated successfully.",
                    icon: "success"
                });

                closeModal()
            }
            else {
                toast.error("Error while updating item!", {
                    autoClose: 2000,
                    theme: "colored"
                })
            }
        }

    return <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ fontFamily: "DM Sans" }}
        className="fixed inset-0 flex items-center justify-center   bg-opacity-90 backdrop-filter backdrop-blur-lg">
        <div className="bg-gradient-to-b from-gray-600 to-sky-950  rounded-xl shadow-md shadow-gray-700 w-80 text-center text-white flex flex-col min-w-124 w-fit">
            
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-900 to-violet-950 w-full h-full flex flex-col gap-8 justify-center items-center w-1/3 p-12 rounded-xl ">
                <h1 className="text-3xl font-semibold text-green-300">Update</h1>
                
                
                <div className="flex flex-col gap-2 justify-center w-full">
                    <input type="text" name="name"  placeholder="Name of the item" className="bg-gray-100 text-black p-2 rounded-md" />
                </div>
                <div className="flex flex-col gap-2 justify-center w-full">
                    <input type="text" name="description"  placeholder="Description" className="bg-gray-100 text-black p-2 rounded-md" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center">
                    <input type="number" name="price"  placeholder="Price" className="bg-gray-100 text-black p-2 rounded-md" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center">
                    <input type="text" name="imageUrl"  placeholder="Image Url" className="bg-gray-100 text-black p-2 rounded-md" />
                </div>
                <div className="flex flex-col w-full gap-2 justify-center">
                    <input type="text" name="typeName"  placeholder="Type Name" className="bg-gray-100 text-black p-2 rounded-md" />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-105 cursor-pointer">Submit Form</button>
                <button onClick={closeModal} className="w-full p-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition transform flex justify-center items-center hover:scale-105 cursor-pointer">Close</button>
            </form>
        </div>
    </motion.div>
}