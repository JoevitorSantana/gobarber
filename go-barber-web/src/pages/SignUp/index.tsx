import logoImg from '../../assets/logo.svg';
import {FiArrowLeft, FiLock, FiLogIn, FiMail, FiUser} from 'react-icons/fi'
import {Container, Content, Background} from './styles'
import { Input } from '../../components/Input';
import { Form } from '@unform/web';
import { Button } from '../../components/Button';

export function SignUp(){

    function handleSubmit(data: object):void{
        console.log(data);
    }

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="passsword" icon={FiLock} type="password" placeholder="Senha" />

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href=" ">
                    <FiArrowLeft />
                    Voltar ao Login
                </a>
            </Content>
    </Container>
    )
}
