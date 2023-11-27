import { useAuth } from '../contexts/AuthContext';
import Head from 'next/head';
import userService, { UserType } from '../services/userService';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import githubService from '@/services/githubService';
import { Input, Button } from 'reactstrap';
import UserTable from '@/components/search/users';
import searchHistoryService from '@/services/searchHistoryService';
import HeaderLogged from '@/components/header/headerLogged';
import Cookies from "js-cookie";
import Link from 'next/link';

interface Props {
  user: UserType;
}

const HomeNotAuth = ({ user }: Props) => {
  const router = useRouter();
  const { token, userId } = useAuth();
  const [userTag, setUserTag] = useState('');
  const [userData, setUserData] = useState(null);
  const [searchError, setSearchError] = useState(false);

  useEffect(() => {
    const sessionToken = Cookies.get("githubapi-token")
    if (!sessionToken) {
      router.push("/login");
    }
  }, [token, router, userId]);

  const handleSearch = async () => {
    if (userTag) {
      try {
        const data = await githubService.getUserData(userTag);
        setUserData(data);
        searchHistoryService.addSearchHistoryItem(userTag, 'success', data.public_repos);
        setSearchError(false);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
		    searchHistoryService.addSearchHistoryItem(userTag, 'failed', 0);
        setSearchError(true);
      }
    } else {
      setSearchError(false);
    }
  };

  const handleNavigateToHistory = () => {
    router.push('/historic');
  };

  return (
    <>
      <Head>
        <title>Teste</title>
      </Head>
      <HeaderLogged user={user}></HeaderLogged>
      <main>
        <div>
          <h4 className='titleIndex'>Pesquise algum perfil no Github</h4>
          <Input
            type="text"
            placeholder="Digite a UserTag do GitHub"
            value={userTag}
            className='formSearch'
            onChange={(e) => setUserTag(e.target.value)}
          />
			<Button className='formBtn' onClick={handleSearch}>
				Pesquisar
			</Button>
			<Link className='historyBtn' href='/historic'>
				Histórico
			</Link>
          {searchError ? (
            <p className="text-danger text-center mt-5 pt-4">Usuário não encontrado, mas sua pesquisa está salva no histórico! :)</p>
          ) : (
            <UserTable userData={userData} />
          )}
        </div>
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

export default HomeNotAuth;
