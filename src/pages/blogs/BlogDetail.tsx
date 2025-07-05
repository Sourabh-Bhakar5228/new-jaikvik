import React from "react";
import { useParams } from "react-router-dom";
import blogs from "../../configs/all-blogs-data";
import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa";
import EnquireSection from "../home/EnquireSection";
import OurClients from "../home/OurClients";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((blog) => blog.id === Number(id));

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Blog not found
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="relative w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[60vh] object-cover block md:h-[60vh] sm:h-[60vh]"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white bg-black/60 bg-opacity-50 p-5 rounded-lg w-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-2.5">
            {blog.title}
          </h1>
          <p className="text-lg md:text-base sm:text-sm m-0">
            {blog.description ? `${blog.description.substring(0, 100)}...` : ""}
          </p>
        </div>
      </div>

      {/* Blog Detail Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-start text-sm w-full items-center gap-x-3 mb-4">
            <h2 className="bg-main-red text-white px-2 py-1 rounded">
              {blog.category}
            </h2>
            <div className="flex justify-center items-center gap-1">
              <FaRegUser size={12} className="text-main-red" />
              <span>{blog.author}</span>
            </div>
            <div className="flex justify-center items-center gap-1">
              <FaRegCalendarCheck size={12} className="text-main-red" />
              <span>{blog.date}</span>
            </div>
          </div>

          <article className="prose lg:prose-xl max-w-none">
            <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto mb-6 rounded-lg"
            />
            <p className="text-lg mb-4">{blog.description}</p>
            {/* Add more content here as needed */}
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in
              nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              Mauris iaculis porttitor posuere.
            </p>
            <p className="text-lg">
              Praesent id metus massa, ut blandit odio. Proin quis tortor orci.
              Etiam at risus et justo dignissim congue. Donec congue lacinia
              dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper
              orci. Quisque eget odio ac lectus vestibulum faucibus eget in
              metus. In pellentesque faucibus vestibulum. Nulla at nulla justo,
              eget luctus tortor.
            </p>
          </article>
        </div>
      </section>

      <OurClients />
      <EnquireSection />
    </>
  );
};

export default BlogDetail;
