import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import githubAPI from '../../services/githubAPI';


interface User {
    name: string;
    avatarURL: string;
    email: string;
    username: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(username: string): Promise<void>;
    refreshContext(username: string): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => { 

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadStorageData(){ 

            const storagedUser = await AsyncStorage.getItem('@HS:name');
            const storagedAvatarURL = await AsyncStorage.getItem('@HS:avatar_url');
            const storagedEmail = await AsyncStorage.getItem('@HS:email');
            const storagedUserName = await AsyncStorage.getItem('@HS:username');

            if(storagedUser && storagedAvatarURL && storagedEmail && storagedUserName){
                setUser({
                    name: JSON.parse(storagedUser),
                    avatarURL: JSON.parse(storagedAvatarURL),
                    email: JSON.parse(storagedEmail),
                    username: JSON.parse(storagedUserName)
                });
            }
            setLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(username: string){
        try {
            const { data } = await githubAPI.get(`users/${username}`);
            await AsyncStorage.setItem('@HS:name', JSON.stringify(data.name));
            await AsyncStorage.setItem('@HS:avatar_url', JSON.stringify(data.avatar_url));
            await AsyncStorage.setItem('@HS:email', JSON.stringify(data.email));
            await AsyncStorage.setItem('@HS:username', JSON.stringify(data.login));
            setUser({
                name: data.name,
                avatarURL: data.avatar_url,
                email: data.email,
                username: data.login
            });
        }
        catch (err) {
            alert ('This user does not exist');
        }

    }
    
    async function refreshContext(username: string){
        try {

            signOut()

            const { data } = await githubAPI.get(`users/${username}`);
            await AsyncStorage.setItem('@HS:name', JSON.stringify(data.name));
            await AsyncStorage.setItem('@HS:avatar_url', JSON.stringify(data.avatar_url));
            await AsyncStorage.setItem('@HS:email', JSON.stringify(data.email));
            await AsyncStorage.setItem('@HS:username', JSON.stringify(data.login));
            setUser({
                name: data.name,
                avatarURL: data.avatar_url,
                email: data.email,
                username: data.login
            });
        }
        catch (err) {
            alert ('This user does not exist');
        }

    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }
    

    return (
        <AuthContext.Provider value={{ signed: !! user, user, signIn, refreshContext, signOut, loading }} >
            {children}
        </AuthContext.Provider>
    );
    
};

export default AuthContext;