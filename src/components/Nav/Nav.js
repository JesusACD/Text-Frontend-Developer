import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-end p-4 space-x-6 text-spaceCadet font-bold scroll-smooth focus:scroll-auto">
      <Link
        href="#content-1"
        className="hover:text-gray-900 scroll-smooth focus:scroll-auto"
      >
        Content 1
      </Link>
      <Link href="#content-2" className="hover:text-gray-900">
        Content 2
      </Link>
      <Link href="/login" className="text-blue-500 hover:text-blue-700">
        Login
      </Link>
    </nav>
  );
};

export default Nav;
