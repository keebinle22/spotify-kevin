interface Tracks{
    arr: object[]
}

export default function Tracks({arr}: Tracks){

    return(
        <div className="d-flex flex-column">
            <table>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Popularity (0-100)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="border border-dark">
                    {arr.map((res: any, idx: any) => {
                        return(
                            <tr key={idx}>
                                <td className="border border-dark">
                                    <div>{res.name}</div>
                                    <small>{res.artists[0].name}</small>
                                </td>
                                <td className="border border-dark">{res.popularity}</td>
                                <td className="border border-dark"><img src={res.album.images[0].url} alt="no image available" height={100} width={100} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}