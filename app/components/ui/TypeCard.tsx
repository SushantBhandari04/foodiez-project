import { motion } from "framer-motion"

export default function TypeCard({ img, title, description, onClick }: { img: string, title: string, description: string, onClick: () => void }) {
    return <motion.div whileTap={{scale: 0.95}} onClick={onClick} className="flex gap-8 rounded-2xl py-5 px-4 bg-gradient-to-br from-gray-500 to-purple-1000 w-96 justify-center items-center hover:scale-102 hover:bg-gray-900 hover:cursor-pointer ">
        <img src={img} alt="Image" className="h-20 w-52 rounded-xl" />
        <div className="flex flex-col justify-center gap-3 w-full">
            <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">{title}</h2>
            <h4 className="text-sm text-gray-300">{description}</h4>
        </div>
    </motion.div>
}