
export default function TypeCard({ img, title, description, onClick }: { img: string, title: string, description: string, onClick: () => void }) {
    return <div onClick={onClick} className="flex gap-8 rounded-2xl py-6 px-4 bg-gradient-to-br from-gray-500 to-purple-1000 w-96 justify-center items-center hover:scale-105 hover:bg-gray-900 transition transform hover:cursor-pointer ">
        <img src={img} alt="Image" className="h-24 w-52 rounded-xl" />
        <div className="flex flex-col justify-center gap-4 w-full">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <h4 className="text-sm text-gray-300">{description}</h4>
        </div>
    </div>
}