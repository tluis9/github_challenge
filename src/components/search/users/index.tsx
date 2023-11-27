import React from 'react';
import { Table } from 'reactstrap';
import styles from "./styles.module.scss";
import Link from 'next/link';

interface UserTableProps {
  userData: any; 
}

const UserTable: React.FC<UserTableProps> = ({ userData }) => {
  if (!userData) {
    return null;
  }

  return (
    <Table className={styles.tableUsers}>
      <thead>
        <tr>
          <th>Image</th>
          <th>UserTag</th>
          <th>Name</th>
          <th>Followers</th>
          <th>Following</th>
          <th>Repos</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><img src={userData.avatar_url} alt="Outra Imagem" className={styles.profileImg}/></td>
          <td>
            <Link href={`/profile?userTag=${userData.login}`}>
              {userData.login}
            </Link>
          </td>
          <td>{userData.name}</td>
          <td>{userData.followers}</td>
          <td>{userData.following}</td>
          <td>
            <Link href={`/repositories?userTag=${userData.login}`}>
              {userData.public_repos}
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserTable;
