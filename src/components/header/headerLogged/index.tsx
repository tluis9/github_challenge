import { useEffect, useState } from 'react';
import Link from 'next/link';
import githubService from '@/services/githubService';
import styles from "./styles.module.scss";
import { useRouter } from 'next/router';
import { UserType } from '@/services/userService';
import Cookies from "js-cookie";

interface Props {
  user: UserType;
}

const HeaderLogged = ({ user }: Props) => {
  const [userTag, setUserTag] = useState(user?.userTag || "");
  const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null) as any;
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await githubService.getUserData(userTag);
      setUserData(data);
    };

    fetchData();
  }, []);

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleLogout = () => {
    Cookies.remove("githubapi-token");
    Cookies.remove("userId");
    Cookies.remove("userTag");
    localStorage.removeItem('searchHistory');
    router.push("/login");
  };

  return (
    <header className={styles.headerLogged}>
      <h1>
        <Link href={`/`}>
          Github API
        </Link>
      </h1>
      {userData && (
        <div className={styles.userInfo} onClick={handleSubMenuToggle}>
          <img src={userData.avatar_url} alt={`${userData.login}'s Avatar`} />
          <span>{userData.login}</span>

          {isSubMenuOpen && (
            <div className={styles.submenu}>
              <Link href={`/profile?userTag=${userTag}`}>
                Meu perfil
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderLogged;
