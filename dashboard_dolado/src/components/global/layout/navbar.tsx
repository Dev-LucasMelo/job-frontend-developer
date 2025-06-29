"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/dashboard', label: 'dashboard' },
  ];

  function IsActive(href: string, pathname: string) {
    if (href === pathname) {
      return "px-3 py-1 text-white font-bold bg-blue-800 rounded-sm duration-200 ease-out"
    }

    return "text-white px-3 py-1 duration-200 ease-out"
  }

  return (
    <nav className="bg-blue-600 w-full h-14 flex items-center p-4 rounded-md">
      <div className="flex space-x-2">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className={IsActive(href, pathname)}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;