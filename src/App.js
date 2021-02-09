import './App.css';
import InteractiveMap from "./InteractiveMap";
import Results from "./Results";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {useState} from "react";

function App() {

    const [dep, setDep] = useState('')
    const [arr, setArr] = useState('')

    return (
        <div className="App">

            <BrowserRouter>
                <Switch>

                    <Route exact path="/results">
                        <Results sD={dep} sA={arr}/>
                    </Route>

                    <Route exact path="/">
                        <InteractiveMap sD={setDep} sA={setArr} />
                    </Route>

                </Switch>
            </BrowserRouter>


        </div>
    );
}

export default App;
