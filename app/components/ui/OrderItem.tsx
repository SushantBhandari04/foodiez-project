'use client'
import React, { useState } from 'react'

interface OrderItem {
    id: string;
    menuItemId: string;
    quantity: number;
    menuItem: {
        name: string;
        imageUrl: string;
        price: number;
    };
}

interface Order {
    id: string;
    orderId: string;
    totalAmount: number;
    items: OrderItem[];
    createdAt: string;
}

export default function OrderItem({ order }: { order: Order }) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div
            key={order.id}
            className="flex flex-col lg:gap-4 md:gap-3 gap-2 lg:px-7  md:p-6 py-4 px-5 w-[450px] bg-gradient-to-br from-blue-950 to-violet-950/60    shadow-md md:rounded-lg rounded-md h-fit"
        >
            <div className="flex flex-col gap-2">
                <div className="lg:text-xl md:text-md text-sm md:font-semibold font-medium text-red-400 flex md:gap-2 md:flex-row flex-col">
                    Order ID:{" "}
                    <h3 className="text-white lg:text-lg md:text-md text-sm md:font-medium font-normal">
                        {order.orderId}
                    </h3>
                </div>
                <div className="lg:text-xl md:text-md text-sm text-green-500 flex gap-2">
                    Total Amount:{" "}
                    <h3 className="text-white lg:text-lg md:text-md text-sm">
                        Rs. {order.totalAmount}
                    </h3>
                </div>
                <div className="lg:text-md md:text-sm text-xs text-gray-400 flex gap-2">
                    Created At:{" "}
                    <h3 className="text-white">
                        {new Date(order.createdAt).toLocaleString()}
                    </h3>
                </div>
            </div>

            <div className='cursor-pointer hover:underline flex w-fit lg:text-lg md:text-md text-sm text-blue-200 hover:text-white' onClick={()=>setOpen(!open)}>{open ? "Close" : "Items"}</div>

            <div className={`flex flex-col lg:gap-6 md:gap-5 gap-4 ${open ? "flex" : "hidden"}` }>
                {order.items.map((item: OrderItem) => (
                    <div key={item.id} className="flex lg:gap-6 md:gap-5 gap-4 items-center">
                        <img
                            src={item.menuItem.imageUrl}
                            alt={item.menuItem.name}
                            className="lg:w-28 lg:h-19 md:w-24 md:h-16 w-16 h-12 rounded-lg"
                        />
                        <div className="flex flex-col justify-between lg:gap-1 md:gap-0.5">
                            <h4 className="lg:text-lg md:text-md text-sm md:font-semibold font-medium text-blue-200">
                                {item.menuItem.name}
                            </h4>
                            <p className="md:text-sm text-xs">Quantity: {item.quantity}</p>
                            <p className="md:text-sm text-xs">
                                Price: Rs. {item.menuItem.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
