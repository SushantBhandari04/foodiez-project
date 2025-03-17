import { User } from "next-auth"
import { toast } from "react-toastify"
import axios from "axios"

export type Type = {
    id: string,
    name: string,
    description: string
    image: string
}

export type MenuItem = {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    typeName: string
}

export type OrderItem = {
    id: string;
    menuItem: MenuItem;
    menuItemId: string;
    orderId: string;
    quantity: number;
}


export function addItemToCart(itemId: string, user: User) {
    axios.post("/api/order", {
        userId: user?.id,
        itemId: itemId
    }).then((response) => {
        toast.success("Item added to cart.", {
            autoClose: 1000,
            theme: "colored",
            hideProgressBar: true,
        })
        console.log(response.data)
    }).catch((e) => {
        toast.error("Error while adding item to cart.", {
            autoClose: 2000,
            theme: "colored"
        })
        console.log("error while adding item to cart.")
    })
}

export function deleteCompleteItem(itemId: string) {
    axios.delete(`/api/order/delete?itemId=${itemId}`, {
    }).then((response) => {
    }).catch((e) => {
        toast.error("Error while remooving from cart.", {
            autoClose: 2000,
            theme: "colored"
        })
        console.log("error while removing item from cart.")
    })
}

export function deleteItemFromCart(itemId: string) {
    axios.delete(`/api/order?itemId=${itemId}`, {
    }).then((response) => {
    }).catch((e) => {
        toast.error("Error while remooving from cart.", {
            autoClose: 2000,
            theme: "colored"
        })
        console.log("error while removing item from cart.")
    })
}


