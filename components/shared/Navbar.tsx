import React from 'react';
import Link from 'next/link';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="px-3 py-2 text-sm font-medium hover:underline">
    {children}
  </Link>
);

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold mr-8">
              Urban Bazaar
            </Link>
            <div className="hidden md:flex space-x-4">
              <NavItem href="/women">WOMEN</NavItem>
              <NavItem href="/men">MEN</NavItem>
              <NavItem href="/girls">GIRLS</NavItem>
              <NavItem href="/boys">BOYS</NavItem>
              <NavItem href="/baby-toddler">BABY & TODDLER</NavItem>
            </div>
          </div>

          {/* Search, User, and Bag Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <FiUser className="text-2xl" />
            <div className="relative">
              <FiShoppingBag className="text-2xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
