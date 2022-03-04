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
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from '../../service/api';


interface ResetPasswordFormData { //interface de dados que serão repassados no data
    password: string;
    password_confirmation: string;
}

export function ResetPassword(){

    const history = useHistory();

    const {addToast} = useToast();

    const formRef = useRef<FormHandles>(null); //isso é um user do tipo FormHandles

    const location = useLocation();

    const handleSubmit = useCallback(async(data: ResetPasswordFormData) => { //essa é a função de login com as validações da lib yup
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'no mínimo 6 dígitos'),//verificamos se foi digitada uma senha
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password'), null],
                    'Confirmação incorreta',
                )
            })

            await schema.validate(data, {//validação
                abortEarly: false,
            });

            const {password, password_confirmation} = data;

            const token = location.search.replace('?token=', '');

            if(!token){
                throw new Error();
            }

            await api.post('password/reset', {
                password,
                password_confirmation,
                token
            });


            history.push('/')

        } catch(err) {
            const errors = getValidationErrors(err as Yup.ValidationError);//validação que não entendi bem mais essas funções vem de dentro do arquivo getvalidationErros
            formRef.current?.setErrors(errors);

            addToast({
                type: 'error',
                title: 'Erro na recuperação',
                description: 'Ocorreu um erro ao recuperar, tente novamente'
            });
        }
    }, [addToast, history, location.search]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperação de senha</h1>

                        <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />
                        <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />

                        <Button type="submit">Alterar</Button>
                    </Form>

                </AnimationContainer>
            </Content>
        <Background />
    </Container>
    )
}
