import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import AuthContext from '../../hooks/useAuth'


const Dashboard: React.FC = () => {

    const { signOut } = useContext(AuthContext);

    return (
        <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Button title='Sign Out' onPress={signOut} />
        </View>
    );
}

export default Dashboard;