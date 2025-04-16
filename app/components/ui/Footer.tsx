import Link from "next/link";
import { GithubIcon, InstagramIcon, TwitterIcon, WhatsappIcon } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
    return <>
        <div className="flex md:px-36 px-12 md:py-4 py-2 bg-[url(/footer-image.jpg)] text-white h-96 w-full  bg-cover bg-center bg-no-repeat overflow-hidden">
            <div className="flex flex-col md:gap-12 gap-8 w-full justify-left items-left m-0 p-0">
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <div className=" "><Logo /></div>
                    <div className="text-slate-300 flex gap-4">Designed and developed by :<h1 className="text-red-300">Dheerendra, Devang, Ranjan and Sushant</h1></div>
                </div>

                <div>
                    <div className="flex flex-col gap-2">
                        <div>Address: 123, Main Street, Pahad, Uttarakhand</div>
                        <div className="flex gap-2">Email: <a href="mailto:sushbh2004@gmail.com" className="text-gray-400  hover:text-blue-200">
                            sushbh2004@gmail.com
                        </a></div>
                        <div><Link href="">Contact Us</Link></div>
                        <div><Link href="">About Us</Link></div>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex"><GithubIcon /></div>
                        <div className="flex"><TwitterIcon /></div>
                        <div className="flex"><InstagramIcon /></div>
                        <div className="flex"><WhatsappIcon /></div>
                    </div>

                    <div className="flex justify-between md:w-2/3 w-3/4 text-gray-400">
                        <p>All rights reserved</p>

                        <div className="flex md:gap-4 gap-2 ">
                            <p>Guides</p>
                            <p>Privacy Policy</p>
                            <p>Terms of Service</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </>
}
