import React, { useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { useSearchHistory } from '@/contexts/SearchHistoryContext';
import { FaEye, FaTrash } from 'react-icons/fa';
import styles from "./styles.module.scss";
import Link from 'next/link';
import searchHistoryService from '@/services/searchHistoryService';


const SearchHistory: React.FC = () => {
  const { searchHistory, removeSearchHistoryItem, setSearchHistory } = useSearchHistory();

  const handleRemoveItem = (id: string) => {
    removeSearchHistoryItem(id);
  };

  useEffect(() => {
    const updatedSearchHistory = searchHistoryService.getSearchHistory();
    setSearchHistory(updatedSearchHistory);
  }, []);


  return (
    <>
      <h4 className='text-center pt-5 pb-3'>Histórico de buscas</h4>
      <Table className={`${styles.tableHistory} text-center`}>
        <thead>
          <tr>
            <th>Data e Hora</th>
            <th>Username</th>
            <th>Status</th>
            <th>Repositórios Encontrados</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {searchHistory.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td>
                {item.status === 'failed' ? (
                  item.userTag
                ) : (
                  <Link href={`/profile?userTag=${item.userTag}`}>
                    {item.userTag}
                  </Link>
                )}
              </td>
              <td className={item.status === 'success' ? 'text-success' : item.status === 'failed' ? 'text-danger' : ''}>
                {item.status}
              </td>
              <td>
                {item.status === 'failed' || item.repositoriesCount === 0 ? (
                  item.repositoriesCount
                ) : (
                  <Link href={`/repositories?userTag=${item.userTag}`}>
                    {item.repositoriesCount}
                  </Link>
                )}
              </td>
              <td className={styles.actionIcons}>
                {item.status === 'failed' ? (
                  <FaEye className={`${styles.buttonDisabled} mr-2`} />
                ) : (
                  <Link href={`/profile?userTag=${item.userTag}`}>
                    <FaEye className="text-primary mr-2" />
                  </Link>
                )}
                <FaTrash className="text-danger" onClick={() => handleRemoveItem(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SearchHistory;
