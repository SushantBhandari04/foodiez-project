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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col gap-40 "
    >
      <Hero />

      <div className="flex flex-col gap-16">
        <h1 className="text-5xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          Explore the varieties
        </h1>
        <div className="relative flex overflow-x-hidden gap-8 py-10 MyGradient" >
          {/* <button
            className="absolute left-4 top-1/3.5 z-100 transform -translate-y-1/2 bg-gray-300 font-bold text-xl text-black p-2 rounded-full cursor-pointer"
            onClick={scrollLeft}
          >
            &lt;
          </button> */}
          <motion.div
            ref={scrollContainerRef}
            className=" flex flex-shrink-0 gap-8 "
            initial={{ x: 0 }}
            animate={{x:"-100%"}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear"  }}
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
          <motion.div
            ref={scrollContainerRef}
            className=" flex flex-shrink-0 gap-8 "
            initial={{ x: 0 }}
            animate={{x:"-100%"}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
          {/* <button
            className="absolute right-4 text-xl top-1/3.5 font-bold transform -translate-y-1/2 bg-gray-300 text-black p-2 rounded-full cursor-pointer"
            onClick={scrollRight}
          >
            &gt;
          </button> */}
        </div>
      </div>

      <motion.div
        id="menu-section"
        className="Menu flex flex-col px-8 gap-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r  from-cyan-500 to-white via-cyan-100">
          {currentType == null ? "All Items" : `${currentType}`}
        </h1>

        {menuItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
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

      <Testimonials />
    </motion.div>
  );
}