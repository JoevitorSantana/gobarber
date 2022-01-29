import { useRef, useEffect, useState, useCallback } from 'react';
import { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import {Container} from './styles';
import {useField} from '@unform/core'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

export function Input({name, icon: Icon, ...rest}:InputProps){

    const inputRef = useRef<HTMLInputElement>(null); //para pegar as referências do input
    const {fieldName, defaultValue, error, registerField} = useField(name);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!! inputRef.current?.value);
    }, []);

    return(
        <Container isFocused={isFocused} isFilled={isFilled}>
        { Icon && <Icon size={20} /> }
            <input onFocus={handleInputFocus} onBlur={handleInputBlur} defaultValue={defaultValue} ref={inputRef} {...rest}/>
        </Container>
    );
};

