import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface AuthContextData {
    signed: boolean;
    user: any;
    loading: boolean;
    signIn: (email: string, senha: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storageUser = await AsyncStorage.getItem('@Poiesis:user');
                const storageToken = await AsyncStorage.getItem('@Poiesis:token');

                if (storageUser && storageToken && !storageToken.startsWith('token-falso-')) {
                    setUser(JSON.parse(storageUser));
                } else if (storageToken?.startsWith('token-falso-')) {
                    await AsyncStorage.removeMany(['@Poiesis:user', '@Poiesis:token']);
                }
            } catch (error) {
                console.error('Erro ao carregar sessão', error);
                await AsyncStorage.removeMany(['@Poiesis:user', '@Poiesis:token']);
            } finally {
                setLoading(false);
            }
        }
        loadStorageData();
    }, []);

    async function signIn(email: string, senha: string) {
        const userData = { email, role: 'USER', id: '123' };
        setUser(userData);
        router.replace('/(tabs)');
    }

    async function signOut() {
        await AsyncStorage.removeMany(['@Poiesis:user', '@Poiesis:token']);
        setUser(null);
        router.replace('/(auth)/login');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};