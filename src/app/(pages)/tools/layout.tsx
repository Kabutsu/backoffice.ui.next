import DefaultLayout from '../_components/page-layout';

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [{
    href: '/tools/import-test-data',
    title: 'Import Test Data'
  }, {
    href: '/tools/review',
    title: 'Sample Review'
  }];

  return (
    <DefaultLayout navLinks={navLinks}>
      {children}
    </DefaultLayout>
  );
};
