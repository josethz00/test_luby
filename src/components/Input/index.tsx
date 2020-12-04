import React from 'react';
import { Ionicons } from 'expo-vector-icons';

import { CustomInput, InputWrapper } from './styles';


const Input: React.FC<any> = ({ placeholder, icon, hasErrors, ...rest }) => {
    return (
        <InputWrapper style={{ borderColor: hasErrors ? 'red' : '', elevation: 10 }}>
            <Ionicons name={icon} size={21} color='#808080' />
            <CustomInput
                placeholder={placeholder}
                {...rest}
            />
        </InputWrapper>
  );
}

export default Input;