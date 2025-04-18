"use client";

import Hero from "@/app/components/ui/Hero";
import TypeCard from "@/app/components/ui/TypeCard";
import { useEffect, useState, useRef } from "react";
import { addItemToCart, MenuItem, Type } from "@/app/config";
import MenuCard from "@/app/components/ui/MenuCard";
import { Session } from "next-auth";
import { motion, useAnimation, useInView } from "framer-motion";
import { useMenuItemsStore } from "@/store";
import Testimonials from "@/app/components/ui/testimonials";
import TypecardMarquee from "@/app/components/ui/TypecardMarquee";
import { SearchIcon } from "@/app/components/ui/Icons";
import toast from "react-hot-toast";

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
  const marqueeRef = useRef<HTMLDivElement>(null);

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
      className="w-full box-border flex flex-col lg:gap-40 md:gap-32 sm:gap-28 gap-20 m-0 p-0 overflow-hidden"
    >

      {/* Hero Section */}
      <Hero />

      {/* TypesCard Section */}
      {/* <TypecardMarquee scrollContainerRef={scrollContainerRef} setCurrentType={setCurrentType} typesData={typesData} /> */}

<TypecardMarquee
    scrollContainerRef={marqueeRef}
    typesData={typesData}
    setCurrentType={setCurrentType}
/>

      <motion.div
        id="menu-section"
        className="Menu w-full flex flex-col px-8 lg:gap-16 md:gap-14 gap-12 justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="lg:text-5xl sm:text-4xl text-3xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          {currentType == null ? "All Items" : `${currentType}`}
        </h1>

        {/* Search bar */}
        <div className="relative w-full sm:max-w-2xl md:max-w-4xl mx-4 bg-indigo-800/20 ">
          <SearchIcon classname="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 md:h-5 h-4" />
          <input
            type="text"
            placeholder="Search the menu"
            className="border-gray-600 border-1 md:p-3 p-2 md:pl-13 pl-12 w-full rounded-full focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-400 shadow-sm"
            onChange={(e) => browseMenu(e.target.value)}
          />
        </div>

        {menuItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="">No items found</div>
          </div>
        ) : (
          <motion.div className=" gap-9 lg:gap-y-28 md:gap-y-20 gap-y-10  w-full h-full py-10 flex flex-wrap justify-center items-center">
            {menuItems.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={item.id + Math.random()}
                whileHover={{ scale: 1.02 }}
                className="flex md:w-72 lg:w-63 "
              >
                <MenuCard
                  menuItem={item}
                  onClick={() => {
                    if (!user || !session) {
                      toast.error("Please login to add items to cart.", {
                        duration: 1200,
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