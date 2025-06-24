const PromotersSection = () => {
  const promoters = [
    {
      name: "Vikas Jaiswal",
      role: "Managing Director",
      image:
        "https://plus.unsplash.com/premium_photo-1669530939363-6dd44d3b3436?w=600&auto=format&fit=crop&q=60",
      bio: [
        "The foundation of Jaikvik Technology India Private Limited rests in the vision and leadership of our Managing Director Mr. Vikas Jaiswal, a seasoned professional with over 15 years of rich experience in the fields of software development and finance.",
        "Mr. Jaiswal has built his expertise through key roles in some of India's most renowned organizations.",
      ],
      companies: [
        "Dell",
        "Airtel",
        "Care Ratings Ltd.",
        "Resurgent India Ltd.",
      ],
      additionalInfo: [
        "Hailing from a background rich in technology and process management, he engaged in a deep understanding of finance, allowing him to pave the way to innovation while ensuring business viability and growth.",
        "His skills, however, beyond technical acumen, germinate from dynamic thought leadership and values that he holds. His style of leadership is one to get his hands dirty, and at all levels, he instils integrity, collaboration, and performance excellence.",
        "Guided by his vision, Jaikvik Technology transitioned from being a partnership firm into a Private Limited Company and set standards in customized software solution.",
      ],
      color: "from-purple-500 to-pink-500",
      accent: "purple-500",
    },
    {
      name: "Kranti Parashar",
      role: "Director & CEO",
      image:
        "https://plus.unsplash.com/premium_photo-1669648880022-5175ad516e04?w=600&auto=format&fit=crop&q=60",
      bio: [
        "The CEO and director of Jaikvik Technology India Private Limited, Mr. Kranti Parashar has emerged as an eminent figure in Indian industry circles with his wide exposure into different domains comprising financial levels, advertising, and communication sectors for nearly over 17 years.",
        "With a great focus on execution, he entered the higher levels of leadership with an MBA background, excelling at strategic planning and relationship building.",
      ],
      companies: [
        "Tata Teleservices Ltd",
        "Kotak Mahindra Bank",
        "Aegon Religare",
        "Care Ratings Ltd.",
        "Indiamart Intermesh Ltd.",
        "Resurgent India Ltd.",
      ],
      additionalInfo: [
        "His professional strengths include Relationship Management, Financial Management, Marketing Strategy, and Team Leadership. Mr. Parashar is strong at networking with key players in the industry.",
        "Mr. Kranti Parashar with his pragmatic approach, cheerful nature, and much zeal joins the purposes of achieving integrated technology and branding solutions for enabling business transformations across sectors.",
        "Currently, under his able leadership, Jaikvik Technology stands as a well-known name in software development, digital marketing, and corporate communication.",
      ],
      color: "from-blue-500 to-cyan-500",
      accent: "blue-500",
    },
  ];

  return (
    <section className="min-h-screen bg-black py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-6xl font-black text-white mb-4 relative">
              Our Leaders
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-gray-300 mt-8 max-w-2xl mx-auto">
            Meet the visionary leaders driving innovation and excellence at
            Jaikvik Technology
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-16">
          {promoters.map((promoter, index) => (
            <div
              key={index}
              className={`group relative ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } flex flex-col lg:flex gap-8 items-center`}
            >
              {/* Image Card */}
              <div className="lg:w-1/2 relative">
                <div
                  className={`bg-gradient-to-br ${promoter.color} p-1 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500`}
                >
                  <div className="bg-white rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      <div
                        className={`w-full h-full bg-gradient-to-br ${promoter.color} rounded-full transform rotate-45`}
                      ></div>
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="relative inline-block mb-6">
                        <img
                          src={promoter.image}
                          alt={promoter.name}
                          className="w-64 h-64 object-cover rounded-2xl mx-auto shadow-xl group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                          className={`absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br ${promoter.color} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <div
                              className={`w-4 h-4 bg-${promoter.accent} rounded-full`}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {promoter.name}
                      </h3>
                      <p
                        className={`text-lg font-semibold bg-gradient-to-r ${promoter.color} bg-clip-text text-transparent mb-6`}
                      >
                        {promoter.role}
                      </p>

                      {/* Companies */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h4 className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wide">
                          Previous Experience
                        </h4>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {promoter.companies.map((company, i) => (
                            <span
                              key={i}
                              className={`bg-gradient-to-r ${promoter.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300`}
                            >
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="lg:w-1/2">
                <div className="bg-gray-900 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-gray-800">
                  <div className="space-y-6">
                    {/* Bio Section */}
                    <div className="space-y-4">
                      {promoter.bio.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-gray-200 leading-relaxed text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Divider */}
                    <div
                      className={`w-24 h-1 bg-gradient-to-r ${promoter.color} rounded-full my-8`}
                    ></div>

                    {/* Additional Info */}
                    <div className="space-y-4">
                      {promoter.additionalInfo.map((paragraph, i) => (
                        <p key={i} className="text-gray-400 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Call to Action */}
                    <div className="pt-6">
                      <button
                        className={`bg-gradient-to-r ${promoter.color} text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
                      >
                        Connect with {promoter.name.split(" ")[0]}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotersSection;
