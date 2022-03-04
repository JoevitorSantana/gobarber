import logoImg from '../../assets/logo.svg';
import {FiLock, FiLogIn, FiMail} from 'react-icons/fi'
import {Container, Content, Background, AnimationContainer} from './styles'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Form } from '@unform/web';
import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/AuthContext';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/ToastContext';
import { Link, useHistory } from 'react-router-dom';
import api from '../../service/api';


interface ForgotPasswordFormData { //interface de dados que serão repassados no data
    email: string;
}

export function ForgotPassword(){

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const {addToast} = useToast();

    const formRef = useRef<FormHandles>(null); //isso é um user do tipo FormHandles

    const handleSubmit = useCallback(async(data: ForgotPasswordFormData) => { //essa é a função de login com as validações da lib yup
        try {

            setLoading(true);

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().email('Email ou senha inválido').required('Email obrigatório'),//verificamos se foi digitado um email ou alguma coisa
            })

            await schema.validate(data, {//validação
                abortEarly: false,
            });

            await api.post('/password/forgot', {
                email: data.email,
            });

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado',
                description: 'Enviamos um email para sua caixa de mensagem!'
            });

        } catch(err) {
            const errors = getValidationErrors(err as Yup.ValidationError);//validação que não entendi bem mais essas funções vem de dentro do arquivo getvalidationErros
            formRef.current?.setErrors(errors);

            addToast({
                type: 'error',
                title: 'Erro na Recuperação',
                description: 'Ocorreu um erro ao fazer o recuperaçõa, cheque as credenciais'
            });
        } finally {
            setLoading(false)
        }
    }, [addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar Senha</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />

                        <Button loading={loading} type="submit">Recuperar</Button>

                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Voltar ao Login
                    </Link>
                </AnimationContainer>
            </Content>
        <Background />
    </Container>
    )
}
