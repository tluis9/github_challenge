import Head from "next/head";
import { Button, Col, Container, Row } from "reactstrap";
import UserForm from "@/components/profile/edit";
import { useEffect, useState } from "react";
import userService, { UserType } from "@/services/userService";
import { useRouter } from "next/router";
import githubService from "@/services/githubService";
import UserData from "@/components/profile/user";
import HeaderLogged from "@/components/header/headerLogged";
import Cookies from "js-cookie";

interface Props {
    user: UserType;
    token: string;
}

const UserProfile = ({ user, token }: Props) => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const userTag = router.query.userTag || user.userTag;

    useEffect(() => {
      const sessionToken = Cookies.get("githubapi-token")
      if (!sessionToken) {
        router.push('/login');
      }
    
      const handleSearch = async () => {
        if (userTag) {
          const data = await githubService.getUserData(userTag);
          setUserData(data);
        }
      };
    
      handleSearch();
    }, [router, userTag]);    

    const showUserForm = router.query.userTag === user.userTag;

  return (
    <>
      <Head>
        <title>Meus Dados</title>
      </Head>
      <main>
      <HeaderLogged user={user}></HeaderLogged>
      <Container className="py-5">
          <Row className="pt-3 pb-5">
              <UserData userData={userData} />
              {showUserForm && <UserForm user={user} token={token} />}
          </Row>
      </Container>
      </main>
    </>
  );
  
};

export async function getServerSideProps({ req }) {
	try {
	  const token = req.headers.cookie.replace(/(?:(?:^|.*;\s*)githubapi-token\s*=\s*([^;]*).*$)|^.*$/, "$1");
	  const userId = req.headers.cookie.replace(/(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/, "$1");
	  console.log('Token:', token);
	  console.log('userId:', userId);
  
	  if (!token) {
		  throw new Error('Token não encontradooo');
	  }

	  const userData = await userService.getProfileUser(userId, token);
	  const user = userData.data;
  
	  return {
      props: {
        user,
        token
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

export default UserProfile;