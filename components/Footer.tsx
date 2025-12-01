import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="mt-5 bg-[#0a0a0a] border-t border-[#2A2F36] text-gray-300 pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8">
      <div className="w-full px-4 sm:px-6 lg:w-[90%] xl:w-[80%] mx-auto">
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="w-full lg:w-auto">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold tracking-tighter text-white inline-block"
            >
              Tech<span className="text-[#3055D4]">Nova</span>
            </Link>
            <p className="mt-3 sm:mt-4 max-w-sm text-sm sm:text-base text-gray-400">
              Your one-stop destination for premium gadgets. We bring the future
              of technology right to your doorstep.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[400px] bg-[#1a1d21] p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-[#2A2F36]">
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
              Subscribe to our newsletter
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Get the latest updates on new products and upcoming sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <EnvelopeIcon className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black border border-[#2A2F36] text-white text-sm sm:text-base py-2 sm:py-2.5 pl-9 sm:pl-10 pr-4 rounded-lg focus:outline-none focus:border-[#3055D4]"
                />
              </div>
              <button className="bg-[#3055D4] hover:bg-blue-600 text-white font-medium text-sm sm:text-base py-2 sm:py-2.5 px-5 sm:px-6 rounded-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">
              Shop
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li>
                <Link href="/shop" className="hover:text-[#3055D4] transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Smartphone"
                  className="hover:text-[#3055D4] transition"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Laptop"
                  className="hover:text-[#3055D4] transition"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Audio"
                  className="hover:text-[#3055D4] transition"
                >
                  Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Gaming"
                  className="hover:text-[#3055D4] transition"
                >
                  Gaming
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">
              Support
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li>
                <Link href="#" className="hover:text-[#3055D4] transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#3055D4] transition">
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#3055D4] transition">
                  Returns & Warranty
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#3055D4] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">
              Legal
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li>
                <Link href="#" className="hover:text-[#3055D4] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#3055D4] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#3055D4] transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-400">
              <li>
                123 Tech Avenue,
                <br />
                Silicon Valley, CA 94000
              </li>
              <li>support@technova.com</li>
              <li>+1 (555) 123-4567</li>

              {/* Social Icons */}
              <li className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all text-sm sm:text-base"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all text-sm sm:text-base"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all text-sm sm:text-base"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all text-sm sm:text-base"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION: COPYRIGHT & PAYMENTS --- */}
        <div className="pt-6 sm:pt-8 border-t border-[#2A2F36] flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} TechNova. All rights reserved.
          </p>

          <div className="flex gap-3 sm:gap-4 text-xl sm:text-2xl text-gray-500">
            <FaCcVisa className="hover:text-white transition cursor-pointer" />
            <FaCcMastercard className="hover:text-white transition cursor-pointer" />
            <FaCcPaypal className="hover:text-white transition cursor-pointer" />
            <FaApplePay className="hover:text-white transition cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
