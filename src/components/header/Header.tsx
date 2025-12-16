import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenFromPage } from "@/utils/verifyToken";
import ProfileContainer from "./ProfileContainer";
import prisma from "@/utils/db";
import { User } from "@/generated/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenFromPage(token);

  let user: User | null = null;
  if (payload) {
    user  = await prisma.user.findUnique({
      where: { id: payload.id },
    });
  }

  

  return (
    <header className={styles.header}>
      <div
        className={`w-full max-w-screen-lg  px-5  xl:px-0 relative flex items-center justify-between h-full`}
      >
        {/* left-div Navbar */}
        <Navbar isAdmin={payload?.isAdmin || false} />
        {/* right-div login&regsterBtns */}
        <div className={styles.right}>
          {user ? (
            <>
              <ProfileContainer user={user} />
            </>
          ) : (
            <>
              <Link
                className={`bg-blue-700 hover:bg-blue-900 ${styles.btn}`}
                href="/login"
              >
                Login
              </Link>
              <Link
                className={`bg-blue-700 hover:bg-blue-900 ${styles.btn}`}
                href="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
