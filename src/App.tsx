import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { fetchProfile, getAccessToken, populateUI, redirectToAuthCodeFlow } from './authenticationCode';
import Replay from './Replay';

function App() {
  
  useEffect(() => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your client id
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const validateCred = async () => {
      if (!code){
        redirectToAuthCodeFlow(clientId);
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
  }, []);
  return (
    <>
      <div className='container m-2'>
        <h1><b>Spotify Wrapped.. <small>kinda</small></b></h1>
        <section className="d-flex flex-column" id="profile">
          <h2>Logged in as <span id="displayName"></span></h2>
          <span id="avatar"></span>
        </section>
        <div className='container m-1'>
          <div className='d-flex flex-column'>
            <div>
              <button type="button" className="btn btn-outline-dark" onClick={() => {localStorage.removeItem("accessToken")}}>Logout</button>
            </div>
            <small>Local storage will be cleared. No redirect has been implemented.</small>
          </div>
          <Replay/>
        </div>
      </div>
    </>
  )
}

export default App
