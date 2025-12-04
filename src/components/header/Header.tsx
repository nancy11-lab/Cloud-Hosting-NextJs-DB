import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenFromPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";

const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenFromPage(token);

  return (
    <header className={styles.header}>
      <div
        className={`w-full max-w-screen-lg  px-5  xl:px-0 relative flex items-center justify-between h-full`}
      >
        {/* left-div Navbar */}
        <Navbar isAdmin={payload?.isAdmin || false}/>
        {/* right-div login&regsterBtns */}
        <div className={styles.right}>
          {payload ? (
            <>
            <strong className=" text-blue-800 md:text-xl capitalize">
              {payload?.username}
            </strong>
            <LogoutButton />
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
