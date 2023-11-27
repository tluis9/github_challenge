import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import authService from "@/services/authService";
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Register = function () {
    const { token, setAuthData } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = Cookies.get("githubapi-token")
            setAuthData(storedToken, null);
            setLoading(false);
        };

        fetchToken();
    }, [setAuthData]);

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")!.toString();
        const userTag = formData.get("userTag")!.toString();
        const password = formData.get("password")!.toString();
        const params = { email, userTag, password };

        console.log(`Erro! => ${token}`)

        const { data, status }= await authService.register(params);

        if (status === 201) {
            router.push("/login?registred=true");
        } else {
            console.log(`Erro! => ${data.message}`);
        }
    };

    const handleNavigateToLogin = () => {
        router.push('/login');
    };

    return (
        <>
        <Head>
            <title>Registro</title>
        </Head>
        <main>
            <Container className="py-5">
            <Form className={styles.form} onSubmit={handleRegister}>
                <p className="text-center"><strong>Registre-se no Github!</strong> </p>
                    <FormGroup>
                        <Label for="email" className={styles.label}>E-mail</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Qual o seu e-mail?"
                            required
                            maxLength={30}
                            className={styles.inputName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="userTag" className={styles.label}>Tag do Github</Label>
                        <Input
                            id="userTag"
                            name="userTag"
                            type="text"
                            placeholder="Qual seu nome de usuário no Github?"
                            required
                            maxLength={20}
                            className={styles.inputName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className={styles.label}>SENHA</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Digite a sua senha (Min: 6 | Max: 20)"
                            required
                            minLength={6}
                            maxLength={20}
                            className={styles.input}
                        />
                    </FormGroup>
                    <Button type="submit" outline className={styles.formBtn}>
                        CADASTRAR
                    </Button>
                    <Button className='historyBtn' onClick={handleNavigateToLogin}>
                        Login
                    </Button>
                </Form>
            </Container>
        </main>
        </>
    );
};

export default Register;