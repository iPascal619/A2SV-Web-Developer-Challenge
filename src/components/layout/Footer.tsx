'use client';

import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      setEmail('');
    }
  };

  return (
    <footer className="food-footer bg-[#212121] text-white py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="max-w-[1518px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-10 sm:gap-12 lg:gap-16 mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <div className="food-footer-menu flex flex-col sm:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            <div className="food-footer-column">
              <h3 className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[22px] font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-10">Company</h3>
              <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-neutral-100">
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Blog</a></li>
              </ul>
            </div>

            <div className="food-footer-column">
              <h3 className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[22px] font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-10">Contact</h3>
              <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-neutral-100">
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Help & Support</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Partner with us</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Ride with us</a></li>
              </ul>
            </div>

            <div className="food-footer-column">
              <h3 className="text-[18px] sm:text-[19px] md:text-[20px] lg:text-[22px] font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-10">Legal</h3>
              <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-neutral-100">
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Refund & Cancellation</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#FFB30E] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="food-footer-subscribe max-w-full lg:max-w-[483px]">
            <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h3 className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-bold uppercase opacity-60 mb-4 sm:mb-5 md:mb-6 lg:mb-10">Follow Us</h3>
              <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl md:text-2xl">
                <a href="#" className="hover:text-[#FFB30E] transition-colors" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" className="hover:text-[#FFB30E] transition-colors" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#" className="hover:text-[#FFB30E] transition-colors" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>

            <div>
              <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-[#BBBBBB] mb-4 sm:mb-5 md:mb-6 lg:mb-10 leading-relaxed">
                Receive exclusive offers in your mailbox
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#424242] text-white placeholder:text-[#ADADAD] px-3 sm:px-4 py-3 sm:py-4 rounded-lg text-[14px] sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FFB30E]"
                />
                <button
                  onClick={handleSubscribe}
                  className="food-subscribe-btn bg-[#FFB30E] hover:bg-[#FFA500] text-[#212121] px-5 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 sm:pt-5 md:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-neutral-100">
            <div className="flex gap-2 items-center text-center sm:text-left">
              <span>All rights Reserved</span>
              <span>©</span>
              <span className="font-bold">Your Company, 2021</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>Made with</span>
              <FiHeart className="text-red-500 fill-red-500" size={14} />
              <span>by</span>
              <span className="font-bold">Themewagon</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
