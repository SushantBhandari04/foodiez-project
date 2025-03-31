"use client";

import TypeCard from "@/app/components/ui/TypeCard";
import { useEffect, useState, useRef } from "react";
import {  MenuItem, Type } from "@/app/config";
import { Session } from "next-auth";
import { motion, useAnimation, useInView } from "framer-motion";
import { useMenuItemsStore } from "@/store";
import AdminMenuCard from "@/app/components/ui/AdminMenuCard";

type AdminHomeProps = {
  session?: Session;
  typesData: Type[];
  menuItemsData: MenuItem[];
};

export default function AdminHome({
  typesData,
  menuItemsData,
}: AdminHomeProps   ) {

  const [currentType, setCurrentType] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
  }, [isInView])

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
    setLoading(false);
  }, [currentType]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full overfow-y-scroll no-scrollbar flex flex-col gap-32 mt-16 "
    >

      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          Varieties
        </h1>
        <div className="relative flex justify-center items-center">
          <button
            className="absolute left-4 top-1/3.5 z-100 transform -translate-y-1/2 bg-gray-300 font-bold text-xl text-black p-2 rounded-full cursor-pointer"
            onClick={scrollLeft}
          >
            &lt;
          </button>
          <motion.div
            ref={scrollContainerRef}
            className=" flex gap-8 justify-start overflow-x-auto no-scrollbar overflow-hidden py-8 px-16 mr-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {typesData &&
              typesData.map((type) => (
                <motion.div key={type.id} whileHover={{ scale: 1.02 }}>
                  <TypeCard
                    onClick={() => setCurrentType(type.name)}
                    img={type.image}
                    title={type.name}
                    description={type.description}
                  />
                </motion.div>
              ))}
            <motion.div whileHover={{ scale: 1.02 }}>
              <TypeCard
                onClick={() => setCurrentType(null)}
                key={0}
                img={"/all-items-image.jpg"}
                title={"All Items"}
                description={"Burgers, Pizzas, Paneer, Drinks, and more"}
              />
            </motion.div>
          </motion.div>
          <button
            className="absolute right-4 text-xl top-1/3.5 font-bold transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full cursor-pointer"
            onClick={scrollRight}
          >
            &gt;
          </button>
        </div>
      </div>

      <motion.div
        id="menu-section"
        className="Menu flex flex-col px-16 gap-12"
      >
        <h1 className="text-4xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          {currentType == null ? "All Items" : `${currentType}`}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
          </div>
        ) : (
          <motion.div className="flex gap-12 gap-y-28 justify-center flex-wrap w-full h-full py-10">
            {menuItems.map((item) => (
              <motion.div
                key={item.id + Math.random()}
                className="w-1/5"
              >
                <AdminMenuCard
                  menuItem={item}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

    </motion.div>
  );
}