import React from "react";
import CareerForm from "./CareerForm";
import OurClients from "../home/OurClients";
import EnquireSection from "../home/EnquireSection";

const Career: React.FC = () => {
  return (
    <>
      {/* Breadcrumb Section */}
      <div className="relative w-full  h-[60vh] overflow-hidden">
        <img
          src="https://img.freepik.com/premium-photo/human-resources-people-networking-concept_31965-1706.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740"
          alt="breadcrumb"
          className="w-full object-cover"
        />
      </div>

      {/* Career Page Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <div className="order-1 md:order-0">
            <CareerForm />
          </div>
          <div className=" bg-main-secondary rounded-md p-6 flex flex-col gap-3 order-0 md:order-1">
            <h4 className="text-xl text-white">
              Join Our Team and Build the Future
            </h4>
            <p className="text-white font-bold">Current Openings:</p>
            <ul className="list-decimal pl-4 flex flex-col gap-1 text-white">
              <li>Graphic Designer</li>
              <li>Web Developer</li>
              <li>UI/UX Designer</li>
              <li>SEO (Search Engine Optimization)</li>
              <li>Backend Developer</li>
              <li>Sales Manager</li>
            </ul>
            <p className="text-white font-bold">How to Apply</p>
            <p className="text-white">
              Submit your resume and cover letter to{" "}
              <a
                href="mailto:info@jaikviktechnology.com"
                className="font-bold text-main-red"
              >
                info@jaikviktechnology.com
              </a>{" "}
              or apply directly via our website.
            </p>
          </div>
        </div>
      </section>
      <OurClients />
      <EnquireSection />
    </>
  );
};

export default Career;
