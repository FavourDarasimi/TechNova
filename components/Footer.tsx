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
    <footer className="mt-5 bg-[#0a0a0a] border-t border-[#2A2F36] text-gray-300 pt-10 pb-8">
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- TOP SECTION: BRAND & NEWSLETTER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter text-white"
            >
              Tech<span className="text-[#3055D4]">Nova</span>
            </Link>
            <p className="mt-4 max-w-sm text-gray-400">
              Your one-stop destination for premium gadgets. We bring the future
              of technology right to your doorstep.
            </p>
          </div>

          <div className="w-full lg:w-auto bg-[#1a1d21] p-6 rounded-2xl border border-[#2A2F36]">
            <h3 className="text-white font-semibold mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest updates on new products and upcoming sales.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black border border-[#2A2F36] text-white py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:border-[#3055D4]"
                />
              </div>
              <button className="bg-[#3055D4] hover:bg-blue-600 text-white font-medium py-2.5 px-6 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm">
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
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
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
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
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
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                123 Tech Avenue,
                <br />
                Silicon Valley, CA 94000
              </li>
              <li>support@technova.com</li>
              <li>+1 (555) 123-4567</li>

              {/* Social Icons */}
              <li className="flex gap-4 mt-6">
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-[#1a1d21] flex items-center justify-center hover:bg-[#3055D4] hover:text-white transition-all"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION: COPYRIGHT & PAYMENTS --- */}
        <div className="pt-8 border-t border-[#2A2F36] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TechNova. All rights reserved.
          </p>

          <div className="flex gap-4 text-2xl text-gray-500">
            <FaCcVisa className="hover:text-white transition" />
            <FaCcMastercard className="hover:text-white transition" />
            <FaCcPaypal className="hover:text-white transition" />
            <FaApplePay className="hover:text-white transition" />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
