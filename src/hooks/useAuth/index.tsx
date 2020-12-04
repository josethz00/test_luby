import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import githubAPI from '../../services/githubAPI';


interface User {
    username: string;
    avatarURL: string;
    email: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(username: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => { 

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadStorageData(){ 

            const storagedUser = await AsyncStorage.getItem('@HS:username');
            const storagedAvatarURL = await AsyncStorage.getItem('@HS:avatar_url');
            const storagedEmail = await AsyncStorage.getItem('@HS:email');

            if(storagedUser && storagedAvatarURL && storagedEmail){
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(username: string){
        try {
            const { data } = await githubAPI.get(`users/${username}`);
            await AsyncStorage.setItem('@HS:username', JSON.stringify(data.name));
            await AsyncStorage.setItem('@HS:avatar_url', JSON.stringify(data.avatar_url));
            await AsyncStorage.setItem('@HS:email', JSON.stringify(data.email));
            setUser({
                username: data.name,
                avatarURL: data.avatar_url,
                email: data.email
            });
        }
        catch (err) {
            alert ('Não foi possível fazer login');
        }

    }
    
    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }
    

    return (
        <AuthContext.Provider value={{ signed: !! user, user, signIn, signOut, loading }} >
            {children}
        </AuthContext.Provider>
    );
    
};

export default AuthContext;