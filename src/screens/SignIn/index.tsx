import React, { useContext, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import AuthContainer from '../../components/AuthContainer';
import Input from '../../components/Input';
import { SignInButton, ButtonText, GithubLogo } from './styles';
import AuthContext from '../../hooks/useAuth';


const SignIn: React.FC = () => {

    const { signIn } = useContext(AuthContext);
    const [username, setUsername] = useState<string>('');
    const [errors, setErrors] = useState<boolean>(false);

    function onChangeAction (event: NativeSyntheticEvent<TextInputChangeEventData>) {
        setUsername(event.nativeEvent.text)
    }

    function handleSubmit () {
        if (!username) {
            setErrors(true);
            return;
        }

        setErrors(false);
        signIn(username);
    }

    return (
        <AuthContainer>
            <GithubLogo source={require('../../assets/images/logo.png')} />
            <Input value={username} placeholder='Username' icon='md-person' placeholderTextColor='#808080' hasErrors={errors} onChange={onChangeAction} />
            <SignInButton onPress={handleSubmit}>
                <ButtonText>
                    Sign In
                </ButtonText>
            </SignInButton>
        </AuthContainer>
    );
}

export default SignIn;