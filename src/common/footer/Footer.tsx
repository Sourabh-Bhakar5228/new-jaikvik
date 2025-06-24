import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelopeOpenText,
  FaPhone,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-main-primary pt-12 px-4 md:px-12 lg:pt-12 lg:px-[28px]">
        {/* Mobile-first layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr_1fr_2fr] gap-6 lg:gap-10">
          {/* Social icons - first on mobile */}
          <div className="flex gap-6 lg:hidden">
            <Link
              to="https://www.facebook.com/jaikviktechnology"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-white text-xl hover:text-main-red" />
            </Link>
            <Link
              to="https://www.instagram.com/jaikviktechnology/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white text-xl hover:text-main-red" />
            </Link>
            <Link
              to="https://twitter.com/jaikvik"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-white text-xl hover:text-main-red" />
            </Link>
            <Link
              to="https://www.youtube.com/@jaikviktechnology"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-white text-xl hover:text-main-red" />
            </Link>
            <Link
              to="https://www.linkedin.com/company/jaikviktechnology/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-white text-xl hover:text-main-red" />
            </Link>
          </div>

          {/* Description paragraph - second on mobile */}
          <div className="lg:hidden">
            <p className="text-main-gray text-[16px]">
              Welcome to Jaikvik Technology India Private Limited, We utilise
              our experience and world-class knowledge to help businesses reach
              at their full online and digital potentials also ensure a steady
              growth. For this, there is a team of highly dedicated and
              &apos;self-confessed&apos; digital marketing geeks
              <Link to="/about" className="text-main-red hover:underline">
                {" "}
                More...
              </Link>
            </p>
          </div>

          {/* Useful Links and Our Services side by side on mobile */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            <div>
              <h3 className="text-lg text-gray-200 mb-2 font-bold">
                Useful Links
              </h3>
              <ul className="list-none p-0 m-0 text-[16px]">
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/about"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/portfolio"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Portfolio
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/blogs"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Our Blogs
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/careers"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Career
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/privacy-policy"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/contact-us"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg text-gray-200 mb-2 font-bold">
                Our Services
              </h3>
              <ul className="list-none p-0 m-0 text-[16px]">
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/digital-marketing"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/coustmised-software"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Software Development
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/film-production"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Film Making
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/seo-services"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    SEO (Search Engine Optimization)
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/web-development"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    E-Commerce
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/web-development"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Website Development
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Get In Touch - last on mobile */}
          <div className="lg:hidden">
            <h3 className="text-lg text-gray-200 mb-2 font-bold">
              Get In Touch
            </h3>
            <ul className="list-none p-0 m-0">
              <li className="flex items-center gap-2 mt-2">
                <FaMapMarkerAlt className="text-main-red" />
                <p className="text-main-gray text-[16px]">
                  Corporate Office - A 82, Sector 63, Noida, UP
                </p>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <FaMapMarkerAlt className="text-main-red" />
                <p className="text-main-gray text-[16px]">
                  Regional Office - 7/1, Marhatta Ditch Lane Kolkata
                </p>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <FaMapMarkerAlt className="text-main-red" />
                <p className="text-main-gray text-[16px]">
                  Regional Office - 304, Peninsula Spenta-1, Senapati Bapat
                  Marg, Lower Parel Mumbai
                </p>
              </li>
              <li className="flex items-center gap-2 mt-2">
                <FaEnvelopeOpenText className="text-main-red" />
                <a
                  href="mailto:info@jaikviktechnology.com"
                  className="text-main-gray hover:underline transition-all duration-300"
                >
                  info@jaikviktechnology.com
                </a>
              </li>
              <li className="flex items-center gap-2 mt-2 text-[16px]">
                <FaPhone className="text-main-red" />
                <ul className="flex flex-wrap gap-2 p-0 m-0 leading-4">
                  <li>
                    <a
                      href="tel:+91-9220826934"
                      className="text-main-gray hover:underline transition-all duration-300"
                    >
                      +91-9220826934
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+91-9718587705"
                      className="text-main-gray hover:underline transition-all duration-300"
                    >
                      +91-9718587705
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:0120-4200970"
                      className="text-main-gray hover:underline transition-all duration-300"
                    >
                      0120-4200970
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Desktop layout (hidden on mobile) */}
          <div className="hidden lg:block">
            <div className="mb-4">
              <div className="flex gap-6 mb-4">
                <Link
                  to="https://www.facebook.com/jaikviktechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="text-white text-xl hover:text-main-red" />
                </Link>
                <Link
                  to="https://www.instagram.com/jaikviktechnology/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-white text-xl hover:text-main-red" />
                </Link>
                <Link
                  to="https://twitter.com/jaikvik"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="text-white text-xl hover:text-main-red" />
                </Link>
                <Link
                  to="https://www.youtube.com/@jaikviktechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="text-white text-xl hover:text-main-red" />
                </Link>
                <Link
                  to="https://www.linkedin.com/company/jaikviktechnology/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="text-white text-xl hover:text-main-red" />
                </Link>
              </div>
              <p className="text-main-gray text-[16px]">
                Welcome to Jaikvik Technology India Private Limited, We utilise
                our experience and world-class knowledge to help businesses
                reach at their full online and digital potentials also ensure a
                steady growth. For this, there is a team of highly dedicated and
                &apos;self-confessed&apos; digital marketing geeks
                <Link to="/about" className="text-main-red hover:underline">
                  {" "}
                  More...
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div>
              <h3 className="text-lg text-gray-200 mb-2 font-bold">
                Useful Links
              </h3>
              <ul className="list-none p-0 m-0 text-[16px]">
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/about"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/portfolio"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Portfolio
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/blogs"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Our Blogs
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/careers"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Career
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/privacy-policy"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/contact-us"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:block">
            <div>
              <h3 className="text-lg text-gray-200 mb-2 font-bold">
                Our Services
              </h3>
              <ul className="list-none p-0 m-0 text-[16px]">
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/digital-marketing"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/coustmised-software"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Software Development
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/film-production"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Film Making
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/seo-services"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    SEO (Search Engine Optimization)
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/web-development"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    E-Commerce
                  </Link>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <Link
                    to="/web-development"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    Website Development
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:block">
            <div>
              <h3 className="text-lg text-gray-200 mb-2 font-bold">
                Get In Touch
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt className="text-main-red" />
                  <p className="text-main-gray text-[16px]">
                    Corporate Office - A 82, Sector 63, Noida, UP
                  </p>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt className="text-main-red" />
                  <p className="text-main-gray text-[16px]">
                    Regional Office - 7/1, Marhatta Ditch Lane Kolkata
                  </p>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <FaMapMarkerAlt className="text-main-red" />
                  <p className="text-main-gray text-[16px]">
                    Regional Office - 304, Peninsula Spenta-1, Senapati Bapat
                    Marg, Lower Parel Mumbai
                  </p>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <FaEnvelopeOpenText className="text-main-red" />
                  <a
                    href="mailto:info@jaikviktechnology.com"
                    className="text-main-gray hover:underline transition-all duration-300"
                  >
                    info@jaikviktechnology.com
                  </a>
                </li>
                <li className="flex items-center gap-2 mt-2 text-[16px]">
                  <FaPhone className="text-main-red" />
                  <ul className="flex flex-wrap gap-2 p-0 m-0 leading-4">
                    <li>
                      <a
                        href="tel:+91-9220826934"
                        className="text-main-gray hover:underline transition-all duration-300"
                      >
                        +91-9220826934
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+91-9718587705"
                        className="text-main-gray hover:underline transition-all duration-300"
                      >
                        +91-9718587705
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:0120-4200970"
                        className="text-main-gray hover:underline transition-all duration-300"
                      >
                        0120-4200970
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-4 py-4">
          <p className="text-main-gray text-[15px]">
            © 2016 All Rights Reserved
            <a
              href="index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-main-red hover:underline ml-1"
            >
              Jaikvik Technology India Pvt Ltd
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
