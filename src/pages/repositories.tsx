import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, CardLink } from 'reactstrap';
import githubService from '../services/githubService';
import styles from "../styles/repositories.module.scss";
import { FaArrowLeft } from 'react-icons/fa';
import HeaderLogged from '@/components/header/headerLogged';
import userService, { UserType } from '@/services/userService';
import Cookies from "js-cookie";

interface Props {
  user: UserType;
}

const Repositories = ({ user }: Props) =>  {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const repositoriesPerPage = 4;

  const userTag = router.query.userTag;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await githubService.getUserRepositories(userTag);
        setUserData(data);
      } catch (error) {
        console.error('Error fetching repository data:', error);
      }
    };

    fetchData();

    const sessionToken = Cookies.get("githubapi-token")
    if (!sessionToken) {
        router.push("/login");
    }
  }, []);

  const handleGoBack = () => {
    router.push('/');
  };

  const handleGoProfile = (tagName) => {
    router.push(`/profile?userTag=${tagName}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastRepository = currentPage * repositoriesPerPage;
  const indexOfFirstRepository = indexOfLastRepository - repositoriesPerPage;
  const currentRepositories = userData && userData.slice(indexOfFirstRepository, indexOfLastRepository);

  return (
    <>
      <Head>
        <title>Repositories</title>
      </Head>
      <main>
        <HeaderLogged user={user}></HeaderLogged>
        <Button onClick={handleGoBack} className={styles.backButton}>
            <FaArrowLeft /> Voltar
        </Button>

        {userData && (
          <>
            <h4 className='text-center'>Repositórios do <span className={styles.userTagLogin} onClick={() => handleGoProfile(userData[0]?.owner?.login)}>{userData[0]?.owner?.login}</span></h4>
            <p className='text-center'>Total de Repositórios: {userData.length}</p>

            <div className={styles.containerRepos}>
              {currentRepositories.map((repo) => (
                <Card key={repo.id} className="mt-3">
                  <CardBody>
                    <CardTitle tag="h5">{repo.name}</CardTitle>
                    <CardText>{repo.description ? repo.description : "Não tem descrição disponível :("}</CardText>
                    <CardText className={styles.languages}>Linguagens utilizadas: {<LanguagesList userTag={repo.owner.login} repoName={repo.name} />}</CardText>
                    <CardLink href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      Ver no github
                    </CardLink>
                  </CardBody>
                </Card>
              ))}
            </div>

            {/* Navegação */}
            <div className={styles.paginationContainer}>
              <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                Anterior
              </Button>
              <span className={styles.pageCounter}>Página {currentPage} de {Math.ceil(userData.length / repositoriesPerPage)}</span>
              <Button disabled={indexOfLastRepository >= userData.length} onClick={() => handlePageChange(currentPage + 1)}>
                Próximo
              </Button>
            </div>
          </>
        )}
      </main>
    </>
  );
};

const LanguagesList = ({ userTag, repoName }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await githubService.getLanguages(userTag, repoName);
        setLanguages(Object.keys(response));
      } catch (error) {
        console.error('Error fetching languages data:', error);
      }
    };

    fetchLanguages();
  }, [userTag, repoName]);

  return languages.length > 0 ? languages.join(', ') : 'N/A';
};

export async function getServerSideProps({ req }) {
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

export default Repositories;
