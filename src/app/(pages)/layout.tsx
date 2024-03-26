import SideBar from '~/_components/sidebar';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [{
    href: '/sample/providers',
    title: 'Sample Providers'
  }, {
    href: '/sample/nat-rep-samples',
    title: 'Nat Rep Samples'
  }];

  return (
    <div className="flex flex-row items-start flex-1 overflow-hidden relative">
      <SideBar links={navLinks} />

      <div className="relative flex-1 h-full overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};
