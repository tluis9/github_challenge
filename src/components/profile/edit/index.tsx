import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import profileService from "@/services/profileService";
import { UserType } from "@/services/userService";
import { FormEvent, useState } from "react";

interface props {
    user: UserType
    token: string
}

const UserForm = ({ user, token }: props) => {
    const [email, setEmail] = useState(user?.email || "");
    const [userTag, setUserTag] = useState(user?.userTag || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        const res = await profileService.userUpdate(user?.id, token, {
            email,
            userTag,
            currentPassword,
            newPassword,
        });
    
        if (res === 200) {
            alert('Usuário atualizado com sucesso!');
        } else {
            alert('Senha atual incorreta! Tente novamente!');
        }
    };

    return (
        <>
            <hr />
            <h4 className="text-center">Edite seu usuário</h4>
            <div className={styles.inputNormalDiv}>
                <Form className={styles.form} onSubmit={handleUserUpdate}>
                    <FormGroup>
                        <Label className={styles.label} htmlFor="userTag">
                            Tag do github
                        </Label>
                        <Input
                            name="userTag"
                            type="text"
                            id="userTag"
                            placeholder="Tag do github"
                            required
                            maxLength={20}
                            className={styles.inputFlex}
                            value={userTag}
                            onChange={(event) => { setUserTag(event.target.value) }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label} htmlFor="email">
                            E-mail
                        </Label>
                        <Input
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Coloque o seu email"
                            required
                            className={styles.input}
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label} htmlFor="password">
                            Sua senha atual
                        </Label>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            placeholder="senha"
                            className={styles.input}
                            value={currentPassword}
                            onChange={(event) => { setCurrentPassword(event.target.value) }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className={styles.label} htmlFor="password">
                            Insira a nova senha
                        </Label>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            placeholder="senha"
                            className={styles.input}
                            value={newPassword}
                            onChange={(event) => { setNewPassword(event.target.value) }}
                        />
                    </FormGroup>
                    <Button className={styles.formBtn} outline type="submit">
                        Salvar Alterações
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default UserForm;