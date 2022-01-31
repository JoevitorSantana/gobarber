import { ButtonHTMLAttributes } from 'react';
import {Container} from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;//interface dizendo que o button receberá os atributos de um button

export function Button({children, ...rest}:ButtonProps){
    return(
        <Container type="button" {...rest}>{children}</Container>
    )
}
