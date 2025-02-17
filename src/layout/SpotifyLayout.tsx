import { Outlet } from "react-router";
import { useAuth } from "../assets/component/AuthContext";
import { useEffect, useState } from "react";
import { fetchProfile, redirectToAuthCodeFlow } from "../authenticationCode";

export default function SpotifyLayout(){
    const auth = useAuth();
    const [profile, setProfile] = useState();
    const handleLogout = () => {
        auth.logout();
    }
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (auth.token === "" && code === null){
            const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
            redirectToAuthCodeFlow(clientId);
        }
        else if (auth.token === "" && code !== null){
            auth.login(code);
        }
        console.log(auth.profile)
    }, []);
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Spotify x Kevyn</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {localStorage.getItem("accessToken") !== null &&
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleLogout} href="/">Logout</a>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        {/* navbar,  */}
            <div className="d-flex flex-center justify-content-center">
                <h1><b>Spotify Wrapped.. <small>kinda</small></b></h1>
            </div>

            <Outlet/>
        </>
    )
}