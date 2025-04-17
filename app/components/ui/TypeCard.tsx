import { motion } from "framer-motion"

export default function TypeCard({ img, title, description, onClick }: { img: string, title: string, description: string, onClick: () => void }) {
    return <motion.div whileTap={{scale: 0.95}} onClick={onClick} className="flex flex-col lg:gap-8 md:gap-7 gap-5 lg:w-56  md:w-44 w-40  rounded-xl p-5 lg:py-6 lg:px-4 md:px-3 px-2 bg-gray-1000  justify-center items-center hover:scale-102 hover:bg-gray-800/90 hover:cursor-pointer border-1 border-gray-900/80">
        <img src={img} alt="Image" className="lg:h-20 lg:w-32 md:h-17 md:w-24 h-15 w-20 lg:rounded-xl rounded-md" />
        <div className="flex flex-col justify-center items-center md:gap-3 gap-1 w-full">
            <h2 className="lg:text-2xl text-lg font-medium bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">{title}</h2>
            {/* <h4 className="md:text-sm text-[12px] text-gray-300">{description}</h4> */}
        </div>
    </motion.div>
}