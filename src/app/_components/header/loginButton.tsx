import Link from 'next/link';

import { getServerAuthSession } from '~/server/auth';

export default async function LoginButton() {
  const session = await getServerAuthSession();

  return (
    <Link
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className="inline-block px-4 py-2 font-bold text-base border-4 border-orange-400 text-white bg-pink-500 rounded-3xl hover:bg-orange-400 hover:text-pink-500 transition-all"
    >
      {session ? "Sign out" : "Sign in"}
    </Link>
  );
};
