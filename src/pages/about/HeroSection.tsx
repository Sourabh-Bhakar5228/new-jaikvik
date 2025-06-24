const HeroSection = () => {
  return (
    <>
      <section className="relative h-[60vh] bg-[url('https://images.unsplash.com/photo-1634482899780-6ac6b92c656e?w=600&auto=format&fit=crop&q=60')] bg-cover bg-center flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold animate-fadeInUp">
            About Jaikvik Technology
          </h1>
          <p className="text-lg md:text-xl mt-5 animate-fadeInUp animation-delay-1500">
            Empowering Businesses Through Digital Innovation Since 2016
          </p>
          <a
            href="#about"
            className="inline-block mt-5 bg-red-600 text-white py-2 px-5 rounded-md text-lg transition-transform duration-300 hover:scale-110 animate-fadeInUp animation-delay-2000"
            role="button"
            aria-label="Discover Our Story"
          >
            Discover Our Story
          </a>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
