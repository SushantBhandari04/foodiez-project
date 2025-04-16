"use client";

import Hero from "@/app/components/ui/Hero";
import TypeCard from "@/app/components/ui/TypeCard";
import { useEffect, useState, useRef } from "react";
import { addItemToCart, MenuItem, Type } from "@/app/config";
import MenuCard from "@/app/components/ui/MenuCard";
import { Session } from "next-auth";
import { motion, useAnimation, useInView } from "framer-motion";
import { toast } from "react-toastify";
import { useMenuItemsStore } from "@/store";
import Testimonials from "@/app/components/ui/testimonials";
import TypecardMarquee from "@/app/components/ui/TypecardMarquee";
import { SearchIcon } from "@/app/components/ui/Icons";

type Dashboard2Props = {
  session?: Session;
  typesData: Type[];
  menuItemsData: MenuItem[];
};

export default function Dashboard2({
  session,
  typesData,
  menuItemsData,
}: Dashboard2Props) {
  const user = session?.user;

  const [currentType, setCurrentType] = useState<null | string>(null);

  const { menuItems, setItems } = useMenuItemsStore((state) => state);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]); // Added mainControls to the dependency array

  useEffect(() => {
    if (currentType == null) {
      setItems(menuItemsData);
    } else {
      let items: MenuItem[] = [];
      menuItemsData.map((item) => {
        if (item.typeName == currentType) {
          items = [...items, item];
        }
      });
      setItems(items);
    }
  }, [currentType, menuItemsData, setItems]); // Added menuItemsData and setItems to the dependency array

  // const scrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  //   }
  // };


  function browseMenu(searchItem: string) {
    searchItem = searchItem.trim();
    let foundItems;
    if (searchItem == "") {
      if(currentType==null){
        foundItems = menuItemsData
      }else{
        foundItems = menuItemsData.filter(item => {
          return item.typeName === currentType;
        })
      }
    }
    else {
      foundItems = menuItemsData.filter(item => {
        return item.name.toLowerCase().includes(searchItem.toLowerCase());
      })
    }
    setItems(foundItems);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-40 "
    >

      {/* Hero Section */}
      <Hero />

      {/* TypesCard Section */}
      <TypecardMarquee scrollContainerRef={scrollContainerRef} setCurrentType={setCurrentType} typesData={typesData} />


      <motion.div
        id="menu-section"
        className="Menu flex flex-col px-8 gap-16 justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          {currentType == null ? "All Items" : `${currentType}`}
        </h1>

        {/* Search bar */}
        <div className="relative w-full sm:w-6xl mx-4 bg-indigo-800/20 ">
          <SearchIcon classname="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search the menu"
            className="border-gray-600 border-1 p-3 pl-13 w-full rounded-full focus:outline-none focus:ring-1 focus:border-transparent focus:ring-blue-400 shadow-sm"
            onChange={(e) => browseMenu(e.target.value)}
          />
        </div>

        {menuItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="">No items found</div>
          </div>
        ) : (
          <motion.div className=" gap-9 gap-y-28  w-full h-full py-10 flex flex-wrap justify-center">
            {menuItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={item.id + Math.random()}
                whileHover={{ scale: 1.02 }}
                className="flex w-63"
              >
                <MenuCard
                  menuItem={item}
                  onClick={() => {
                    if (!user || !session) {
                      toast.error("Please login to add items to cart.", {
                        autoClose: 2000,
                        theme: "colored",
                      });
                    } else {
                      addItemToCart(item.id, user);
                    }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Testimonials Section */}
      <Testimonials />
    </motion.div>
  );
}