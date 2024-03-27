import { Suspense } from 'react';

import SideBar from '~/app/_components/sidebar';
import Loader from '~/app/_components/loader';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [{
    href: '/sample/providers',
    title: 'Sample Providers'
  }, {
    href: '/sample/custom-samples',
    title: 'Custom Samples'
  }];

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
