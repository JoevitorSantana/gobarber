import { useRef, useEffect, useState, useCallback } from 'react';
import { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import {Container, Error} from './styles';
import {useField} from '@unform/core'
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {//interface dizendo que o input receberá as propriedades de um input
    name: string;//propriedade name que deverá ser obrigatória
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;//propriedade icon que é opcional e recebe atributos de IconBaseProps
}

export function Input({name, containerStyle = {}, icon: Icon, ...rest}:InputProps){

    const inputRef = useRef<HTMLInputElement>(null); //para pegar as referências do input
    const {fieldName, defaultValue, error, registerField} = useField(name);
    const [isFocused, setIsFocused] = useState(false);//estado se está ou não focado
    const [isFilled, setIsFilled] = useState(false);//estado se o ícone ou não focado

    useEffect(() => {
        registerField({//registro das informações que estão no input
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    const handleInputFocus = useCallback(() => {//função para setar como focado
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {//função para tirar o foco ao mover o mouse para fora do input
        setIsFocused(false);
        setIsFilled(!! inputRef.current?.value);//caso o saia do foco mas ainda exista dados o icone permanece colorido
    }, []);

    return(
        <Container isFocused={isFocused} style={containerStyle}
        isFilled={isFilled} isErrored={!!error}>
        { Icon && <Icon size={20} /> }
            <input onFocus={handleInputFocus} onBlur={handleInputBlur} defaultValue={defaultValue} ref={inputRef} {...rest}/>
            {error && (
                <Error title={error}>
                    <FiAlertCircle color='#c53030' size={20}/>
                </Error>
            )}
        </Container>
    );
};

