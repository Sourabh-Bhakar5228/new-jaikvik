import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa"
import type blogInterface from "../../interfaces/blogInterface"

const BlogCard: React.FC<blogInterface> = ({
    category = "",
    author = "",
    date = "",
    title = "",
    summary = "",
    image = "",
    description = "",
    // link = ""
}) => {
    return <>
        <div className="w-full rounded-lg group p-3 gap-2 flex flex-col justify-start items-start bg-main-secondary/80">
            <div className="w-full overflow-hidden rounded-lg">
                <img
                    src={image as string}
                    alt="image"
                    className="group-hover:scale-110 transition-all duration-300 h-[120px] w-full"
                />
            </div>
            <div className="flex justify-start text-sm w-full items-center gap-x-3">
                <h2>{category}</h2>
                <div className="flex justify-center items-center gap-1">
                    <FaRegUser size={10} className="text-main-red" />
                    <span>{author}</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                    <FaRegCalendarCheck size={10} className="text-main-red" />
                    <span>{date}</span>
                </div>
            </div>
            <div>
                <h4 className="font-extrabold">{title}</h4>
                <p className="text-neutral-100 text-[15px]">{summary && summary !== '' ? summary: (
                    description.substring(0, 100) + '...'
                )}</p>
            </div>
            <button className="rounded-sm bg-main-red text-[15px] text-neutral-50 cursor-pointer py-1 px-4">Read Full Story</button>
        </div>
    </>
}

export default BlogCard