import { motion } from "framer-motion"

export default function TypeCard({ img, title, description, onClick }: { img: string, title: string, description: string, onClick: () => void }) {
    return <motion.div whileTap={{scale: 0.95}} onClick={onClick} className="flex lg:gap-8 md:gap-6 gap-4 lg:h-32 md:h-28 lg:w-96 md:w-84 w-72  rounded-2xl py-3 md:p-5 lg:px-4 md:px-3 px-2 bg-gradient-to-br from-gray-500 to-purple-1000  justify-center items-center hover:scale-102 hover:bg-gray-900 hover:cursor-pointer ">
        <img src={img} alt="Image" className="lg:h-20 lg:w-52 md:h-16 md:w-44 h-15 w-20 md:rounded-xl rounded-md" />
        <div className="flex flex-col justify-center md:gap-3 gap-1 w-full">
            <h2 className="md:text-2xl text-lg font-medium bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">{title}</h2>
            <h4 className="md:text-sm text-[12px] text-gray-300">{description}</h4>
        </div>
    </motion.div>
}