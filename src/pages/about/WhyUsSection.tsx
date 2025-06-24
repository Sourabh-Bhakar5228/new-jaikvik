import { FaArrowRight } from 'react-icons/fa';

const WhyUsSection = () => {
    return <>
        <section className="bg-main-primary py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full lg:w-1/3 px-4">
                        <div
                            className="bg-[url('https://images.unsplash.com/photo-1559165317-9f3837ba893e?w=600&auto=format&fit=crop&q=60')] bg-cover bg-center h-[400px] rounded-lg animate-fadeIn"
                            role="img"
                            aria-label="Digital solutions background"
                        ></div>
                    </div>
                    <div className="w-full lg:w-2/3 px-4">
                        <div>
                            <p className="text-main-red text-lg font-bold uppercase mb-2 animate-fadeIn">What We Do</p>
                            <h2 className="text-4xl font-bold mb-5 animate-fadeIn animation-delay-1200">
                                Comprehensive Digital Solutions
                            </h2>
                            <p className="text-lg mb-5 animate-fadeIn animation-delay-1400">
                                Jaikvik Technology India Private Limited provides a comprehensive suite of services designed to bridge
                                technology and business strategy for your empowerment towards growth.
                            </p>
                            <p className="text-lg mb-5 animate-fadeIn animation-delay-1400">We specialize in:</p>
                            <div className="flex flex-wrap gap-5 justify-center">
                                <div className="bg-main-secondary p-5 rounded-lg w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 animate-fadeInUp animation-delay-1600">
                                    <h3 className="text-2xl font-bold text-main-red mb-4">Customised Software Development</h3>
                                    <ul className="list-none">
                                        <li className="text-base mb-2 relative pl-5">
                                            <FaArrowRight className="absolute left-0 top-1 text-main-red" />
                                            Provision of tailor-made software solutions like ERP, CRM, and HRM systems that fit into
                                            operational needs and industry requirements.
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-main-secondary p-5 rounded-lg w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 animate-fadeInUp animation-delay-1600">
                                    <h3 className="text-2xl font-bold text-main-red mb-4">Mobile Application Development</h3>
                                    <ul className="list-none">
                                        <li className="text-base mb-2 relative pl-5">
                                            <FaArrowRight className="absolute left-0 top-1 text-main-red" />
                                            Development of appealing, easy-to-use apps with a strong business focus towards customer engagement
                                            and streamlining own operations.
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-main-secondary p-5 rounded-lg w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 animate-fadeInUp animation-delay-1600">
                                    <h3 className="text-2xl font-bold text-main-red mb-4">SEO & Digital Marketing Services</h3>
                                    <ul className="list-none">
                                        <li className="text-base mb-2 relative pl-5">
                                            <FaArrowRight className="absolute left-0 top-1 text-main-red" />
                                            Result-driven SEO, content strategies, and all forms of online marketing campaigns to make your
                                            brand shine online and bring traffic and conversion.
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-main-secondary p-5 rounded-lg w-full max-w-xs transition-transform duration-300 hover:-translate-y-2 animate-fadeInUp animation-delay-1600">
                                    <h3 className="text-2xl font-bold text-main-red mb-4">Corporate Film Production</h3>
                                    <ul className="list-none">
                                        <li className="text-base mb-2 relative pl-5">
                                            <FaArrowRight className="absolute left-0 top-1 text-main-red" />
                                            We help tell your brand’s story with engaging visual narratives — from promo videos to bespoke
                                            corporate films your audience will connect with.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default WhyUsSection