import React from 'react';
import { Ionicons } from 'expo-vector-icons';

import { CustomInput, InputWrapper } from './styles';
import { TextInputProps } from 'react-native';


interface InputProps extends TextInputProps {
    placeholder: string;
    icon: string;
    hasErrors: boolean;
}

const Input: React.FC<InputProps> = ({ placeholder, icon, hasErrors, ...rest }) => {
    return (
        <InputWrapper style={{ borderColor: hasErrors ? '#ce2029' : '#808080', elevation: 10 }}>
            <Ionicons name={icon} size={21} color='#808080' />
            <CustomInput
                placeholder={placeholder}
                {...rest}
            />
        </InputWrapper>
  );
}

export default Input;