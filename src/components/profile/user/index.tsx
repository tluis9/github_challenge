import React from 'react';
import { Table, Row, Col, Button } from 'reactstrap';
import { FaArrowLeft, FaEnvelope, FaTwitter, FaBuilding, FaGlobe } from 'react-icons/fa';
import styles from "./styles.module.scss";
import Link from 'next/link';

const UserData = ({ userData }: any) => {
  
  if (!userData) {
    return null;
  }

  return (
    <div className={styles.userDataContainer}>
      <Row className={styles.backButtonRow}>
        <Col>
          <Button onClick={() => window.history.back()} className={styles.backButton}>
            <FaArrowLeft /> Voltar
          </Button>
        </Col>
      </Row>
      <Row className={styles.imageRow}>
        <Col xs="6" className={styles.imageNameCol}>
          <img src={userData.avatar_url} alt="Profile Image" className={styles.profileImg} />
          <p>{ userData.name }</p>
        </Col>
        <Col xs="6">
          <Row>
            <Col xs="4" className={styles.infoCol}>
              <div>{userData.followers}</div>
              <div>Followers</div>
            </Col>
            <Col xs="4" className={styles.infoCol}>
              <div>{userData.following}</div>
              <div>Following</div>
            </Col>
            <Col xs="4" className={styles.infoCol}>
              <div>
                {userData.public_repos === 0 ? (
                  userData.public_repos
                ) : (
                  <Link className={styles.linkUsers} href={`/repositories?userTag=${userData.login}`}>
                    {userData.public_repos}
                  </Link>
                )}
              </div>
              <div>Repos</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={styles.bioRow}>
        <Col>
          <span>Bio:</span>
          <br></br>
          <p>
            {userData.bio ? (
              userData.bio
            ) : (
              "Não existe bio disponível :("
            )}
          </p>
        </Col>
      </Row>
      <Row className={styles.contactRow}>
          {userData.email && (
            <Col>
              <div>
                <FaEnvelope className={styles.svgUsers} /> 
                {userData.email}
              </div>
            </Col>
          )}
          {userData.twitter_username && (
            <Col>
              <div>
                <FaTwitter className={styles.svgUsers}/> 
                <Link className={styles.linkUsers} target="_blank" href={`https://twitter.com/${userData.twitter_username}`}>
                  {userData.twitter_username}
                </Link>
              </div>
            </Col>
          )}
          {userData.company && (
            <Col>
              <div>
                <FaBuilding className={styles.svgUsers} /> 
                {userData.company}
              </div>
            </Col>
          )}
          {userData.blog && (
            <Col>
              <div>
                <FaGlobe className={styles.svgUsers} /> 
                <Link className={styles.linkUsers} target="_blank" href={`https://${userData.blog}`}>
                  {userData.blog}
                </Link>
              </div>
            </Col>
          )}
      </Row>
    </div>
  );
};

export default UserData;
