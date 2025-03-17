export default function NavbarTags({ title }: { title: string }) {
    return <h1 className="hover:bg-blue-800  cursor-pointer p-2 px-4 rounded-md transition transform ease-in">
        {title}
    </h1>
}