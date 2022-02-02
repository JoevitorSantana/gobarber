import logoImg from '../../assets/logo.svg';
import {FiLock, FiLogIn, FiMail} from 'react-icons/fi'
import {Container, Content, Background, AnimationContainer} from './styles'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Form } from '@unform/web';
import { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/AuthContext';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/ToastContext';
import { Link, useHistory } from 'react-router-dom';


interface SignInFormData { //interface de dados que serão repassados no data
    email: string;
    password: string;
}

export function SignIn(){

    const {user, signIn}= useAuth();// isso é um hook de um contexto de authenticação

    const history = useHistory();

    const {addToast} = useToast();

    const formRef = useRef<FormHandles>(null); //isso é um user do tipo FormHandles

    const handleSubmit = useCallback(async(data: SignInFormData) => { //essa é a função de login com as validações da lib yup
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().email('Email ou senha inválido').required('Email obrigatório'),//verificamos se foi digitado um email ou alguma coisa
                password: Yup.string().required('Email ou senha inválido'),//verificamos se foi digitada uma senha
            })

            await schema.validate(data, {//validação
                abortEarly: false,
            })

            signIn({
                email: data.email,
                password: data.password
            });//método signIn que vem lá do nosso contexto de authenticação

            history.push('/dashboard')

        } catch(err) {
            const errors = getValidationErrors(err as Yup.ValidationError);//validação que não entendi bem mais essas funções vem de dentro do arquivo getvalidationErros
            formRef.current?.setErrors(errors);

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer o login, cheque as credenciais'
            });
        }
    }, [signIn, addToast, history]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                        <Button type="submit">Entrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar Conta
                    </Link>
                </AnimationContainer>
            </Content>
        <Background />
    </Container>
    )
}
