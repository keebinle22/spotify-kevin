import { useEffect } from "react";
import { fetchProfile, getAccessToken, populateUI } from "../authenticationCode";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Loading(){
    let navigate = useNavigate();
    useEffect(() => {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your client id
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const validateCred = async () => {
        if (!code){
            navigate("/login");
        }
        else{
            let accessToken = localStorage.getItem("accessToken");
            if (accessToken === "undefined" || accessToken === null){
                accessToken = await getAccessToken(clientId, code!);
                localStorage.setItem("accessToken", accessToken!);
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            const profile = await fetchProfile(accessToken!);
            populateUI(profile);
        }
    }
        validateCred();
        navigate("/loading");
    }, []);
    return(
        <>
        <div>
            <span>loading...</span>
        </div>
        </>
    )
}