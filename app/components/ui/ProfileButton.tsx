import { useProfileModalStore } from "@/store"


export default function ProfileButton({ letter, isAdmin, classname }: { letter: string, isAdmin: boolean, classname?: string }) {
    const openModal = useProfileModalStore((state) => state.openModal)

    return <>
        <button
            onClick={openModal}
            className={`
    ${classname}
    cursor-pointer text-white
    w-8.5 h-8.5  // <-- Ensures perfect circle
    flex justify-center items-center
    md:text-md text-sm
    rounded-full
    ${isAdmin ? 'bg-orange-500 hover:scale-105 hover:bg-red-600' : 'bg-green-500 hover:scale-105 hover:bg-green-600'}
  `}
        >
            {letter}
        </button>
    </>
}