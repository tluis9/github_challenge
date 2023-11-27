import HeaderLogged from "@/components/header/headerLogged";
import SearchHistory from "@/components/search/searchHistory";
import userService, { UserType } from "@/services/userService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

interface Props {
  user: UserType;
}

const UserFrom = ({ user }: Props) => {
    const router = useRouter();
    useEffect(() => {
        const sessionToken = Cookies.get("githubapi-token")
        if (!sessionToken) {
            router.push("/login");
        }
    }, [router]);
    
  return (
    <>
      <Head>
        <title>Histórico</title>
      </Head>
      <main>
        <HeaderLogged user={user}></HeaderLogged>
        <SearchHistory></SearchHistory>
      </main>
    </>
  );
};

export async function getServerSideProps({ req }: any) {
	try {
	  const token = req.headers.cookie.replace(/(?:(?:^|.*;\s*)githubapi-token\s*=\s*([^;]*).*$)|^.*$/, "$1");
	  const userId = req.headers.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, "$1");
  
	  if (!token) {
		throw new Error('Token não encontrado');
	  }

	  const userData = await userService.getProfileUser(userId, token);
	  const user = userData.data;
	  console.log(user)
  
	  return {
		props: {
		  user,
		},
	  };
	} catch (error) {
	  console.error('Erro ao buscar dados do usuário:', error);
	  return {
		props: {
		  user: null,
		},
	  };
	}
}


export default UserFrom;