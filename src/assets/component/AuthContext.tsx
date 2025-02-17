import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { fetchProfile, getAccessToken } from "../../authenticationCode";
import axios from "axios";

type Image = {
    url: string
}
type Profile = {
    country: string,
    display_name: string,
    images: Array<Image>
}
interface ProviderProps {
    profile: any,
    token: string,
    login(code: string): void,
    logout(): void,
}

const AuthContext = createContext<ProviderProps>({
    profile: {},
    token: '',
    login: () => { },
    logout: () => { }
})


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedInfo = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null
    const [profile, setProfile] = useState({});
    const [token, setToken] = useState(storedInfo|| '')
    const navigate = useNavigate()

    const login = (code: string) => {
        setTimeout(async () => {
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            const accessToken = await getAccessToken(clientId, code!);
            const profile = await fetchProfile(accessToken!);
            localStorage.setItem("accessToken", accessToken!);
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            setToken(accessToken);
            setProfile(profile);
            navigate('/')
        }, 1000);
    }

    const logout = () => {
        setProfile({})
        setToken('')
        localStorage.removeItem('accessToken')
    }

    return (
        <AuthContext.Provider value={{ profile, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}