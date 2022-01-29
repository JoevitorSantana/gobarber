import logoImg from '../../assets/logo.svg';
import {FiLock, FiLogIn, FiMail} from 'react-icons/fi'
import {Container, Content, Background} from './styles'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Form } from '@unform/web';

export function SignIn(){

    function handleSubmit(data: object):void{
        console.log(data);
    }
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href=" ">
                    <FiLogIn />
                    Criar Conta
                </a>
            </Content>
        <Background />
    </Container>
    )
}
