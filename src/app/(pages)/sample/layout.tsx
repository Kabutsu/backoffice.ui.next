import DefaultLayout from '../_components/page-layout';

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
    <DefaultLayout navLinks={navLinks}>
      {children}
    </DefaultLayout>
  );
};
