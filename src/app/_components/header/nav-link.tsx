'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  title: string;
};

function NavLink({ href, title }: Props) {
  const pathName = usePathname();

  const isActive = (path: string) => pathName.includes(path);

  return (
    <Link href={href} className={`
      relative flex items-center py-5 px-7 text-gray-950 uppercase text-base hover:text-pink-500 hover:cursor-pointer transition-all
      
      ${isActive(href) ? "text-pink-500 border-b-4 border-pink-500" : ''}
    `}>
      {title}
    </Link>
  );
};

export default NavLink;
