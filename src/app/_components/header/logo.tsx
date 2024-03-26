import Image from "next/image";

function Logo() {
  return (
    <div className="relative block text-white">
      <Image src="/images/system1_White.svg" alt="System1 Logo" width={145} height={50} />
      <p className="absolute bottom-1 left-12 pl-2 text-base font-bold whitespace-nowrap">
        SCA Manager
      </p>
    </div>
  );
};

export default Logo;
