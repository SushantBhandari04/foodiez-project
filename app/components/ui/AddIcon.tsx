import Image from "next/image";

export default function AddIcon({ onClick }: { onClick?: () => void }) {
    return <Image onClick={onClick} src="/plus.svg" alt="" className="h-9 hover:scale-110 transition transform " />
}