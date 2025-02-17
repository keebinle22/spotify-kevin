import axios from "axios";
import { useState } from "react";
import Artists from "./Artists";
import Tracks from "./Tracks";
import { useNavigate } from "react-router";

export default function Replay() {
    const [topArr, setTopArr] = useState<object[]>([]);
    const [isPopulated, setPopulate] = useState(false);
    const [time, setTime] = useState("short_term");
    const [type, setType] = useState("artists");

    const handleGetTop = async () => {
        const res = await getTopItems(type, time);
        setTopArr(res!);
        setPopulate(true);
    }

      const handleTimeChange = (evt:any) => {
        setTime(evt.target.value + "_term")
      }
      const handleTypeChange = (evt:any) => {
        setType(evt.target.value);
        setPopulate(false);
      }

    // useEffect(() => {
    //     const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your client id
    //     const params = new URLSearchParams(window.location.search);
    //     const code = params.get("code");
    //     const validateCred = async () => {
    //         console.log(isLogged)
    //         if (!code && !isLogged) {
    //             navigate("/login");
    //         }
    //         else if (!isLogged){
    //             let accessToken = localStorage.getItem("accessToken");
    //             if (accessToken === "undefined" || accessToken === null) {
    //                 accessToken = await getAccessToken(clientId, code!);
    //                 localStorage.setItem("accessToken", accessToken!);
    //             }
    //             axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    //             const profile = await fetchProfile(accessToken!);
    //             setLog(true);
    //             // populateUI(profile);
    //             navigate("/");
    //         }
    //     }
    //     validateCred();
    // }, []);
    return (
        <div className="d-flex flex-column">
            <section>
                <form>
                    <div className="m-3">
                        <div className="d-flex flex-column align-items-center">
                            <label>Timeframe:
                                <select className="form-select" onChange={handleTimeChange}>
                                    <option value="short">Short Term</option>
                                    <option value="medium">Medium Term</option>
                                    <option value="long">Long Term</option>
                                </select>
                            </label>
                            <div className="d-flex flex-column m-2">
                                <small>Short = ~ Last 4 Weeks</small>
                                <small>Mediuem = ~ 6 months</small>
                                <small>Long = ~ One Year</small>
                            </div>
                        </div>
                    </div>
                    <div className="m-3 d-flex flex-column align-items-center">
                        <label>Type:
                            <select className="form-select" onChange={handleTypeChange}>
                                <option value="artists">Artists</option>
                                <option value="tracks">Songs</option>
                            </select>
                        </label>
                    </div>
                </form>
                <div className="d-flex flex-column align-items-center">
                    <button type="button" className="btn btn-outline-dark" onClick={handleGetTop}>Generate</button>
                </div>
            </section>
            <div>
                {type === "artists" && isPopulated && <Artists arr={topArr}/>}
                {type === "tracks" && isPopulated && <Tracks arr={topArr}/>}
            </div>
        </div>
    )
}

async function getTopItems(type: string, time: string){
    let url = `https://api.spotify.com/v1/me/top/${type}?time_range=${time}&limit=50`;
    let items;

    await axios.get(url)
    .then(function (resp){
        items = resp.data.items;
    })
    .catch(function (e) {
        console.error(e.message);
    })
    return items;

}