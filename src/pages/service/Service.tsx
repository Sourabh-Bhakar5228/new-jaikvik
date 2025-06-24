// import { useLocation } from "react-router-dom";
// import EnquireSection from "../home/EnquireSection";
// import OurClients from "../home/OurClients";
// import { useMemo } from "react";
// import services from "../../configs/services-data";
// import HoverEffectButton from "../../components/buttons/HoverEffectButton";
// import ServiceSectionCard from "../../components/cards/ServiceSectionCard";

// const Service = () => {
//   // const { pathname } = useLocation();
//   // const data = useMemo(() => {
//   //     let id = pathname.split('/')?.[2];
//   //     return services.filter((item) => item.id === id)?.[0];
//   // }, [pathname]);

//   // console.log(data);

//   return (
//     <>
//       <main className="w-full bg-black text-white font-poppins">
//         {/* Hero Section */}
//         <section className="relative bg-[url('https://plus.unsplash.com/premium_photo-1733306696471-807493ff845b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q1JNfGVufDB8fDB8fHww')] bg-no-repeat bg-center bg-cover h-[70vh] flex items-center justify-center text-center">
//           <div className="absolute inset-0 bg-black/60 z-10"></div>
//           <div className="relative z-20 px-5 max-w-7xl mx-auto">
//             <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold animate-slideIn">
//               {"title"}
//             </h2>
//             <p className="text-lg sm:text-xl mt-5 animate-fadeIn opacity-0 animation-delay-500">
//               {"desc"}
//             </p>
//             <HoverEffectButton>Explore Now</HoverEffectButton>
//           </div>
//         </section>

//         {/* Service Details Section */}
//         <div className="w-full py-10 px-8">
//           <ServiceSectionCard
//             title="What Is CRM?"
//             description="CRM, which stands for Customer Relationship Management, refers to a strategic method of interacting with a company and its present and potential customers. It combines technology, processes, and data to efficiently operate sales, marketing, and consumer care.
// CRMs act as a central house for businesses to keep some vital information on their customers: contact information, sales history, communication logs, etc. It is not merely a large database but a business operation backbone encouraging staff collaboration, automation of mundane tasks, and the construction of a genuine camaraderie with its clientele.
// Modern CRMs feature artificial Intelligence insights as well as the possibility of integrating more advanced ways for achievement purposes, which help a business significantly forward its capacity to make clear, goal-aligning decisions. In the end, it is a principle of a customer strategy applicable to businesses in all territories, regardless of their size or industry.
// At Jaikvik Technology, our CRM solutions are designed to empower businesses by integrating seamlessly with existing systems, offering customizable workflows, and providing real-time insights. Whether you're a small startup or a large enterprise, our CRM adapts to your needs, ensuring you stay connected with your audience at every touchpoint. From lead generation to post-sale support, CRM transforms how businesses nurture relationships and drive growth.
// In today's fast-paced digital landscape, businesses must prioritize customer relationships to stay competitive. A CRM system is not just a tool but a strategic asset that helps companies understand their customers better, anticipate their needs, and deliver exceptional experiences. By leveraging CRM, businesses can foster long-term loyalty, drive repeat sales, and build a strong brand reputation. For instance, a retail business using CRM can analyze customer purchase patterns to offer personalized discounts, while a healthcare provider can use it to send timely reminders for appointments, reducing no-shows and improving patient satisfaction."
//             image="https://img.freepik.com/free-vector/flat-design-crm-illustration_23-2149364431.jpg?uid=R186472209&ga=GA1.1.455755995.1738954286&semt=ais_hybrid&w=740"
//           />
//         </div>
//       </main>
//       <OurClients />
//       <EnquireSection />
//     </>
//   );
// };

// export default Service;
