import logoImg from '../../assets/logo.svg';
import {FiArrowLeft, FiLock, FiLogIn, FiMail, FiUser} from 'react-icons/fi'
import {Container, Content, Background} from './styles'
import { Input } from '../../components/Input';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { Button } from '../../components/Button';
import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

export function SignUp(){

    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async(data: object) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().email('Email invalido').required('Email obrigatório'),
                password: Yup.string().min(6, 'Senha com no mínimo 6 dígitos'),
            })

            await schema.validate(data, {
                abortEarly: false,
            })
        } catch(err) {
            const errors = getValidationErrors(err as Yup.ValidationError);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

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
