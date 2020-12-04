import React, { useContext, useState } from 'react';
import { Button, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import Input from '../../components/Input';
import AuthContext from '../../hooks/useAuth';


const SignIn: React.FC = () => {

    const { signIn } = useContext(AuthContext);
    const [username, setUsername] = useState<string>();

    function onChangeAction (event: NativeSyntheticEvent<TextInputChangeEventData>) {
        setUsername(event.nativeEvent.text)
    }

    return (
        <AuthContainer>
            <Input value={username} placeholder='Username' icon='md-person' placeholderTextColor='#808080' hasErrors={false} onChange={onChangeAction} />
            <Button title='Sign In' onPress={() => signIn('josethz00')}/>
        </AuthContainer>
    );
}

export default SignIn;