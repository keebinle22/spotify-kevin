import { redirectToAuthCodeFlow } from "../authenticationCode";

export default function Login(){

    const handleLogin = () => {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your client id
        redirectToAuthCodeFlow(clientId);
    }
    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <img alt="image here"/>
                <button type="button" className="btn btn-primary" id="login-btn" onClick={handleLogin}>Login</button>
                <div>
                    <span className="form-text">ur mom</span>
                </div>
            </div>

        </>
    )
}