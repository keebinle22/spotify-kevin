interface Artists{
    arr: object[]
}

export default function Artists({arr}: Artists){

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
                <tbody>
                    {arr.map((res: any, idx: any) => {
                        return (
                            <tr key={idx} className="border border-dark">
                                <td className="border border-dark">{res.name}</td>
                                <td className="border border-dark">{res.popularity}</td>
                                <td className="border border-dark"><img src={res.images[0].url} alt="no image available" height={100} width={100} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}