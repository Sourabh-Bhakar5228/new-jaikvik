import { useState } from "react";
import "../../styles/enquire-form.css";

interface FormData {
    fname: string;
    phone: string;
    email: string;
    subject: string;
    msg: string;
}


const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        fname: '',
        phone: '',
        email: '',
        subject: '',
        msg: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Replace with actual form submission logic (e.g., API call)
        console.log('Form submitted:', formData);
    };


    return <>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <div className="input-contain">
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            value={formData.fname}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            autoComplete="off"
                            aria-label="Full Name"
                        />
                        <label htmlFor="fname" className="placeholder-text">
                            FULL NAME
                        </label>
                    </div>
                </div>
                <div className="relative">
                    <div className="input-contain">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            autoComplete="off"
                            aria-label="Phone Number"
                        />
                        <label htmlFor="phone" className="placeholder-text">
                            PHONE NUMBER
                        </label>
                    </div>
                </div>
                <div className="relative md:col-span-2">
                    <div className="input-contain">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            autoComplete="off"
                            aria-label="Email Address"
                        />
                        <label htmlFor="email" className="placeholder-text">
                            EMAIL ADDRESS
                        </label>
                    </div>
                </div>
                <div className="relative md:col-span-2">
                    <div className="input-contain">
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            autoComplete="off"
                            aria-label="Subject"
                        />
                        <label htmlFor="subject" className="placeholder-text">
                            Your Subject
                        </label>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <textarea
                        name="msg"
                        rows={5}
                        value={formData.msg}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        autoComplete="off"
                        className="w-full border border-white px-4 py-3 bg-transparent text-white focus:border-red-600 focus:outline-none placeholder-white"
                    ></textarea>
                </div>
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 px-4 font-semibold hover:scale-90 transition-transform duration-300"
                    >
                        Send Message
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default ContactForm