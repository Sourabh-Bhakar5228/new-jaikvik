import React from 'react';
import blogs from '../../configs/all-blogs-data';
import BlogCard from '../../components/cards/BlogCard';
import EnquireSection from '../home/EnquireSection';
import OurClients from '../home/OurClients';

const Blogs: React.FC = () => {
  return (
    <>
      {/* Breadcrumb Section */}
      <div className="relative w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1604933762023-7213af7ff7a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ2dpbmd8ZW58MHx8MHx8fDA%3D"
          alt="blogs"
          className="w-full h-[400px] object-cover block md:h-[300px] sm:h-[200px]"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white bg-black/60 bg-opacity-50 p-5 rounded-lg w-auto">
          <h1 className="text-4xl font-bold text-red-600 mb-2.5">
            Explore Jaikvik Technology Blogs
          </h1>
          <p className="text-lg md:text-base sm:text-sm m-0">
            Discover the latest insights, trends, and tips in digital marketing, SEO, web
            development, and more from Jaikvik Technology.
          </p>
        </div>
      </div>

      {/* Blog Page Section */}
      <section className="blogPage container mx-auto px-4 py-8">
        <div className="blogPageHeading text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Latest News</h2>
          <p className="text-lg">
            Our latest news is that we have experienced significant growth in our company's
            revenue for the quarter. We attribute this success to our strategic partnerships
            with key clients, our commitment to providing exceptional customer service, and
            the implementation of innovative marketing techniques.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard
                key={index}
                {...blog}
            />
          ))}
        </div>
      </section>
      <OurClients />
      <EnquireSection />
    </>
  );
};

export default Blogs;