import React from 'react';
import './App.css';
import * as router from 'react-router-dom'
import {Accounts} from "./components/accounts/Accounts";
import {SaveAccount} from "./components/save-account/SaveAccount";

export const API_URL = 'http://localhost:8080';

function App() {
    const Router = router.BrowserRouter;
    const Route = router.Route;
    const Switch = router.Switch;
    /**
     * <Route path="/about" component={About}/>
     <Route component={NotFound}/>
     */
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Accounts} />
                    <Route path="/save/account" component={SaveAccount}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
