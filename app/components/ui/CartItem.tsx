import { DeleteIcon } from "./Icons";
import { FC } from "react";
import { deleteCompleteItem } from "@/app/config";



interface CartItemProps {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  price: number;
  quantity: number;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  addItem: () => void;
  deleteItem: () => void;
  onDeleteItem: (itemId: string) => void;
}

export const CartItem: FC<CartItemProps> = ({
  id,
  imageUrl,
  title,
  type,
  price,
  quantity,
  onQuantityChange,
  addItem,
  deleteItem,
  onDeleteItem
}) => {

  return <div className="flex gap-4 w-full bg-blue-100 p-4 py-5 rounded-lg h-40">
    <img src={imageUrl} alt="" className="w-36 rounded-lg" />
    <div className="flex justify-between w-full h-full">
      <div className="flex  justify-between items-center ">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl text-blue-300 font-medium"> {title}</h2>
          <h2 className="">{type} </h2>
          <p>Rs. {price}</p>
        </div>

      </div>
      <div className="flex flex-col justify-between items-end h-full  w-fit">
        <div className="flex w-5"><DeleteIcon onClick={() => {
          onDeleteItem(id)
          deleteCompleteItem(id)
        }} /></div>
        <div className="flex h-fit gap-4">
          <button onClick={() => {
            onQuantityChange(id, quantity >= 1 ? quantity - 1 : 0)
            deleteItem()
          }} className="bg-gray-600 px-2 rounded-sm cursor-pointer hover:scale-110 transition transform hover:bg-slate-500 flex justify-center items-center">-</button>
          <div>{quantity}</div>
          <button onClick={() => {
            onQuantityChange(id, quantity + 1)
            addItem()
          }} className="bg-gray-600 px-2 rounded-sm cursor-pointer hover:scale-110 transition transform hover:bg-slate-500 flex justify-center items-center">+</button>
        </div>
        <h2 className="flex gap-2 text-lg"><p className="text-green-500">Total:</p> {price * quantity}</h2>
      </div>
    </div>

  </div>
}