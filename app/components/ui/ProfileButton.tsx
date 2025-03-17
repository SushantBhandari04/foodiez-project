import { useProfileModalStore } from "@/store"


export default function ProfileButton({ letter, isAdmin }: { letter: string, isAdmin: boolean }) {
    const openModal = useProfileModalStore((state) => state.openModal)

    return <>
        <button onClick={openModal} className={`cursor-pointer  text-white px-4 py-2 rounded-full ${isAdmin ? 'bg-orange-500 hover:scale-105 hover:bg-red-600' :  'bg-green-500 hover:scale-105 hover:bg-green-600'}`}> {letter}</button>
    </>
}