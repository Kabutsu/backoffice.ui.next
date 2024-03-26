import Logo from './logo';
import NavLink from './nav-link';

const AppHeader: React.FC = () => {
  const navLinks = ['sample', 'tools'].map((title) => (
    <NavLink key={title} href={`/${title}`} title={title} />
  ));

  return (
    <header role="menubar" className="flex flex-col w-full">
      <div className="flex items-center justify-between h-20 w-full px-4 bg-pink-500">
        <Logo />
      </div>
      <nav className="flex flex-row items-center h-16 pb-1 w-full bg-white shadow-md">
        {navLinks}
      </nav>
    </header>
  );
};

export default AppHeader;