import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { fetchProfile, getAccessToken, populateUI, redirectToAuthCodeFlow } from './authenticationCode';
import Replay from './Replay';
import { useAuth } from './assets/component/AuthContext';

function App() {
  const auth = useAuth();
  console.log(auth.profile)
  // useEffect(() => {
  //   const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your client id
  //   const params = new URLSearchParams(window.location.search);
  //   const code = params.get("code");
  //   const validateCred = async () => {
  //     if (!code){
  //       redirectToAuthCodeFlow(clientId);
  //     }
  //     else{
  //       let accessToken = localStorage.getItem("accessToken");
  //       if (accessToken === "undefined" || accessToken === null){
  //         accessToken = await getAccessToken(clientId, code!);
  //         localStorage.setItem("accessToken", accessToken!);
  //       }
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  //       const profile = await fetchProfile(accessToken!);
  //       populateUI(profile);
  //     }
  //   }
  //   validateCred();
  // }, []);

  // useEffect(() => {
  //   console.log(localStorage.getItem("accessToken"))
  //   if (localStorage.getItem("accessToken") !== null && localStorage.getItem("accessToken") !== undefined){
  //     setLog(true);
  //   }
  // }, [])
  return (
    <>
      <div>
        <section className="d-flex flex-column align-items-center" id="profile">
          <h2>Logged in as <span id="displayName">{auth.profile?.display_name}</span></h2>
          {auth.profile.images && <img id="avatar" src={auth.profile?.images[0].url} alt={auth.profile.display_name + "'s avatar"} width={200} height={200}/>}
        </section>
        <Replay/>

      </div>
    </>
  )
}

export default App
