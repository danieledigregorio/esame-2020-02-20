import useAxios from "axios-hooks";
import moment from 'moment'


function Results({sD, sA}) {

    const [{data, loading, error}] = useAxios(`http://transport.opendata.ch/v1/connections?from=${sD}&to=${sA}`)
    let i=1

    return (
        <div>
            <h2>Da {sD} a {sA}</h2>

            {
                loading ? <h1>Loading</h1> : error ? <h1>Error</h1> : data ? <div>
                    <table>
                        <tr>
                            <td>#</td>
                            <td>Partenza</td>
                            <td>Arrivo</td>
                            <td>Durata</td>
                        </tr>

                        {
                            data.connections.map(c => {

                                return(
                                    <tr>
                                        <td>{i++}</td>
                                        <td>{moment(c.from.departureTimestamp, 'X').format('DD-MM-YYYY H:mm:ss')}</td>
                                        <td>{moment(c.to.arrivalTimestamp, 'X').format('DD-MM-YYYY H:mm:ss')}</td>
                                        <td>{moment(c.to.arrivalTimestamp - c.from.departureTimestamp, 'X').subtract(1, 'hours').format('H:mm:ss')}</td>
                                    </tr>
                                    )
                                }
                            )
                        }
                    </table>

                </div> : null
            }

        </div>
    )
}

export default Results
