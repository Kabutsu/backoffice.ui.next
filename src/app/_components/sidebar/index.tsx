import NavLink from './nav-link';

type Props = {
  links: Array<{
    href: string;
    title: string;
  }>
};

const SideBar: React.FC<Props> = ({ links }: Props) => {
  return (
    <div role="menubar" className="flex flex-col h-full min-w-52 bg-gray-100 font-bold shadow-sm">
      {links.map((link) => (
        <NavLink key={link.title} href={link.href} title={link.title} />
      ))}
    </div>
  )
};

export default SideBar;
