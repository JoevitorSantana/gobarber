import { lighten, shade } from 'polished';
import signInBackGroundImg from '../../assets/sign-in-background.png';
import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh; //força a visualização total da tela
    display: flex;
    align-items: stretch; //faz com que as duas div ocupem 100%
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }




        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${lighten(0.2), '#f4ede8'};
            }
        }
    }

    > a {
        color: #ff9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        display: flex;
        align-items: center;

        svg {
            margin-right: 16px;
        }

        &:hover {
            color: ${shade(0.2), '#ff9000'};
        }
    }


`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackGroundImg}) no-repeat center;
    background-size: cover;
`;

