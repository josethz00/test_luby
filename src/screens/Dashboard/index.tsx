import React, { useContext } from 'react';
import { Text } from 'react-native';
import CenteredContainer from '../../components/CenteredContainer';
import AuthContext from '../../hooks/useAuth'
import { ProfileImage, Username, ButtonText, SignOutButton } from './styles';


const Dashboard: React.FC = () => {

    const { user, signOut } = useContext(AuthContext);

    return (
        <CenteredContainer>
            <ProfileImage source={{ uri: user?.avatarURL }} />
            <Username>Username:  {user?.username}</Username>
            <Username>Name:  {user?.name}</Username>
            <SignOutButton onPress={signOut}>
                <ButtonText>
                    Sign Out
                </ButtonText>
            </SignOutButton>
        </CenteredContainer>
    );
}

export default Dashboard;