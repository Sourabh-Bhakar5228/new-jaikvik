import { useState } from "react";
import "../../styles/enquire-form.css";

interface FormData {
    fname: string;
    phone: string;
    email: string;
    resume: File | null;
    position: string;
    msg: string;
}

const CareerForm = () => {
    const [formData, setFormData] = useState<FormData>({
        fname: '',
        phone: '',
        email: '',
        resume: null,
        position: '',
        msg: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({ ...formData, resume: file });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Replace with actual form submission logic (e.g., API call)
        console.log('Form submitted:', formData);
    };

    return <>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            Full Name
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
                            Phone Number
                        </label>
                    </div>
                </div>
                <div className="relative sm:col-span-2">
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
                            Email Address
                        </label>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                        className="w-full border border-white px-4 py-2 bg-transparent text-white focus:border-red-600 focus:outline-none"
                    />
                </div>
                <div className="relative sm:col-span-2">
                    <div className="input-contain">
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder=" "
                            required
                            autoComplete="off"
                            aria-label="Position Applied For"
                        />
                        <label htmlFor="position" className="placeholder-text">
                            Position Applied For
                        </label>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <textarea
                        id="msg"
                        name="msg"
                        rows={2}
                        value={formData.msg}
                        onChange={handleChange}
                        placeholder="Your Message"
                        autoComplete="off"
                        className="w-full border border-white px-4 py-2 bg-transparent text-white focus:border-red-600 focus:outline-none placeholder-white"
                    ></textarea>
                </div>
                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 px-4 font-semibold hover:scale-90 transition-transform duration-300"
                    >
                        Submit Now
                    </button>
                </div>
            </div>
        </form>
    </>
}

export default CareerForm