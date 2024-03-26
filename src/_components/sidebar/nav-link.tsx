'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  title: string;
};

function NavLink({ href, title }: Props) {
  const pathName = usePathname();

  const isActive = (path: string) => path === pathName;

  return (
    <Link href={href} className={`
      relative flex items-center py-6 px-3 text-pink-500 text-sm hover:cursor-pointer transition-all
      ${isActive(href) ? "bg-pink-500 text-white" : "hover:bg-gray-200"}
    `}>
      {title}
    </Link>
  );
};

export default NavLink;
