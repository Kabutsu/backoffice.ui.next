import { Suspense } from 'react';

import SideBar from '~/app/_components/sidebar';
import Loader from '~/app/_components/loader';

type Props = {
  children: React.ReactNode;
  navLinks: Array<{
    href: string;
    title: string;
  }>;
};

export default function DefaultLayout({
  children,
  navLinks,
}: Readonly<Props>) {
  return (
    <div className="flex flex-row items-start flex-1 overflow-hidden relative">
      <SideBar links={navLinks} />

      <div className="relative flex flex-1 flex-col gap-12 p-10 w-full h-full overflow-y-scroll">
        <Suspense fallback={<Loader />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};
