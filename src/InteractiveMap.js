import {MapContainer, Marker, Popup, TileLayer, useMapEvent} from "react-leaflet";
import {useState} from "react";
import useAxios from "axios-hooks";
import {Link} from "react-router-dom";


function InteractiveMap({sA, sD}) {

    const [selection, setSelection] = useState([0,0])
    const [stationDep, setStationDep] = useState('')
    const [stationArr, setStationArr] = useState('')
    const [bern, setBern] = useState('/')

    const [{data, loading, error}] = useAxios(`http://transport.opendata.ch/v1/locations?type=stations&x=${selection[0]}&y=${selection[1]}`)


    function Selection() {
        useMapEvent({
            click(e) {
                setSelection([
                    e.latlng.lat,
                    e.latlng.lng
                ])
            }
        })
        return(
            selection ?
            <Marker position={selection} ></Marker>
            : null
        )
    }

    function Stations() {
        if(!loading && !error && data) {
            return (
                data.stations.map(s => {
                    if(s.id!==null) {
                        return <Marker position={[
                                            s.coordinate.x,
                                            s.coordinate.y
                                        ]}>
                            <Popup>
                                <div>
                                    <p>{s.name}</p>
                                    <p>{s.distance} mt</p>
                                    <Link to={{pathname:`${bern}`}} onClick={() => {
                                        if(stationDep==='') {
                                            setStationDep(s.id)
                                            setSelection([0,0])
                                            sD(s.id)
                                            setBern('/results')
                                        }else if(stationArr==='') {
                                            setStationArr(s.id)
                                            sA(s.id)
                                        }
                                    }}>Seleziona</Link>

                                </div>
                            </Popup>
                        </Marker>
                    }else return null
                })
            )
        }else return null
    }


    return (
        <div>
            <div className="row01">
                <div className="col01">
                    <p>Stazione partenza:</p>
                    <h3>{stationDep}</h3>
                </div>
                <div className="col01">
                    <p>Stazione arrivo:</p>
                    <h3>{stationArr}</h3>
                </div>
            </div>

            <div className="leaflet-container">
                <MapContainer center={[46.8011111, 8.226666666666667]} zoom={8} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Selection />
                    <Stations />

                </MapContainer>
            </div>
        </div>
    )
}

export default InteractiveMap
