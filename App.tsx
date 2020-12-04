import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Routes from "./src/routes";
import React from 'react';
import { AuthProvider } from './src/hooks/useAuth';

const App: React.FC = () => {
    return (
        <>
            <StatusBar style="light" animated backgroundColor="#20262f" />
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </>
    );
}

export default App;