"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AddMenuItem() {
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();

  if(!session || session.data?.user.email!=="admin@gmail.com"){
    redirect("/dashboard");
  }

  interface MenuItemData {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    typeName: string;
  }

  interface FormEventTarget extends EventTarget {
    name: { value: string };
    description: { value: string };
    price: { value: string };
    image: { value: string };
    type: { value: string };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const target = e.target as FormEventTarget;

    const data: MenuItemData = {
      name: target.name.value,
      description: target.description.value,
      price: parseInt(target.price.value),
      imageUrl: target.image.value,
      typeName: target.type.value,
    };

    try {
      const response: Response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Menu item added successfully.",
          icon: "success",
        });
      } else {
        toast.error("Error while adding menu item!", {
          duration:1500
        });
      }
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      toast.error("Error while sending request!", {
        duration:1500
      });
    }
  }

  return (
    <div className="w-full justify-center items-center flex flex-col gap-8 py-8">
      <h1 className="text-4xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
        Add items
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-blue-950 to-violet-950 flex flex-col gap-8 justify-center items-center w-2/5 p-12 rounded-xl"
      >
        <div className="flex flex-col gap-2 justify-center w-full">
          <label htmlFor="name" className="text-lg">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Name of the item"
            className="bg-gray-100 text-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center w-full">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <input
            type="text"
            name="description"
            required
            placeholder="Description"
            className="bg-gray-100 text-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full gap-2 justify-center">
          <label htmlFor="price" className="text-lg">
            Price
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="Enter Price"
            className="bg-gray-100 text-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full gap-2 justify-center">
          <label htmlFor="image" className="text-lg">
            Image
          </label>
          <input
            name="image"
            type="text"
            required
            placeholder="Image url"
            className="bg-gray-100 text-black p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col w-full gap-2 justify-center">
          <label htmlFor="type" className="text-lg">
            Type
          </label>
          <input
            name="type"
            type="text"
            required
            placeholder="Type"
            className="bg-gray-100 text-black p-2 rounded-md"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition transform flex justify-center items-center hover:scale-103 cursor-pointer"
        >
           {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                  ></path>
                </svg>
                Adding Item...
              </>
            ) : (
              "Add Item"
            )}
        </button>
      </form>
    </div>
  );
}