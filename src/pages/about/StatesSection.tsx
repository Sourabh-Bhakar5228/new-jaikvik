
const StatesSection = () => {
    return <>
        <section className="bg-main-secondary py-20 text-center">
            <div className="px-8">
                <h2 className="text-4xl font-bold mb-10 animate-fadeIn">Our Impact in Numbers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8">
                    <div className="bg-main-primary p-8 rounded-lg w-full max-w-xs animate-fadeInUp animation-delay-1600">
                        <div className="text-5xl font-bold text-main-red mb-2" data-count="9">
                            0
                        </div>
                        <div className="text-lg">Years of Experience</div>
                    </div>
                    <div className="bg-main-primary p-8 rounded-lg w-full max-w-xs animate-fadeInUp animation-delay-1600">
                        <div className="text-5xl font-bold text-main-red mb-2" data-count="500">
                            0
                        </div>
                        <div className="text-lg">Happy Clients</div>
                    </div>
                    <div className="bg-main-primary p-8 rounded-lg w-full max-w-xs animate-fadeInUp animation-delay-1600">
                        <div className="text-5xl font-bold text-main-red mb-2" data-count="1200">
                            0
                        </div>
                        <div className="text-lg">Projects Completed</div>
                    </div>
                    <div className="bg-main-primary p-8 rounded-lg w-full max-w-xs animate-fadeInUp animation-delay-1600">
                        <div className="text-5xl font-bold text-main-red mb-2" data-count="50">
                            0
                        </div>
                        <div className="text-lg">Team Members</div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default StatesSection