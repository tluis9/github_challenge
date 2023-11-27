import authService from "@/services/authService";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../styles/registerLogin.module.scss";
import Cookies from "js-cookie";

const Login = function () {
  const router = useRouter();

  useEffect(() => {
    const sessionToken = Cookies.get("githubapi-token")
    if (sessionToken) {
      router.push("/");
    }
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
	  event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);
    if (status === 201) {
        router.push("/");
    } else {
        alert("Login ou senha inválidos")
    }
  }

  const handleNavigateToRegister = () => {
    router.push('/register');
  };

  return (
    <>
      <Head>
        <title>Tela de Login</title>
      </Head>
      <main>
        <Container className="py-5">
            <Form className={styles.form} onSubmit={handleLogin}>
                <p className="text-center">
                    <strong>Bem-vindo(a) ao Github!</strong>
                </p>
                <FormGroup>
                    <Label className={styles.label} for="email">
                    E-MAIL
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Qual o seu email?"
                    required
                    className={styles.inputName}
                />
                </FormGroup>
                <FormGroup>
                    <Label className={styles.label} for="password">
                      SENHA
                  </Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Qual a sua senha?"
                    required
                    className={styles.inputName}
                />
                </FormGroup>
                <Button type="submit" outline className={styles.formBtn}>
                    ENTRAR
                </Button>
                <Button className='historyBtn' onClick={handleNavigateToRegister}>
                    REGISTRE-SE
                </Button>
            </Form>
        </Container>
      </main>
    </>
  );
};

export default Login;