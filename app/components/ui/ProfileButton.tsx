import { useProfileModalStore } from "@/store"


export default function ProfileButton({ letter, isAdmin, classname }: { letter: string, isAdmin: boolean, classname?: string }) {
    const openModal = useProfileModalStore((state) => state.openModal)

    return <>
        <button onClick={openModal} className={`${classname} cursor-pointer  text-white md:px-3 md:py-1 px-[9px] py-[2px] flex justify-center items-center md:text-md text-sm rounded-full ${isAdmin ? 'bg-orange-500 hover:scale-105 hover:bg-red-600' :  'bg-green-500 hover:scale-105 hover:bg-green-600'}`}> {letter}</button>
    </>
}