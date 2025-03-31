
export default function AddIcon({ onClick }: { onClick?: () => void }) {
    return <img onClick={onClick} src="/plus.svg" alt="" className="h-9 hover:scale-110 transition transform " />
}