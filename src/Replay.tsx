import axios from "axios";
import { useState } from "react";
import Artists from "./Artists";
import Tracks from "./Tracks";

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
    return (
        <div className="d-flex flex-column">
            <section>
                <form>
                    <div className="m-3">
                        <div className="d-flex flex-column">
                            <label>Timeframe:
                                <select onChange={handleTimeChange}>
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
                    <div className="m-3">
                        <label>Type:
                            <select onChange={handleTypeChange}>
                                <option value="artists">Artists</option>
                                <option value="tracks">Songs</option>
                            </select>
                        </label>
                    </div>
                </form>
            </section>
            <div>
                <button type="button" className="btn btn-outline-dark" onClick={handleGetTop}>Generate</button>
            </div>
        {type === "artists" && isPopulated && <Artists arr={topArr}/>}
        {type === "tracks" && isPopulated && <Tracks arr={topArr}/>}
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