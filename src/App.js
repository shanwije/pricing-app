import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl, urls} from "./constants";

function App() {

    // eslint-disable-next-line no-unused-vars
    const [productsAndPrices, setProductsAndPrices] = useState(null);

    useEffect(() => {
        fetchProductsAndPrices();
    }, []);

    const fetchProductsAndPrices = () => {
        axios.get(`${baseUrl}${urls.GET_PRODUCTS_AND_PRICES}`)
            .then(res => {
                setProductsAndPrices(res.data);
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="App">
            {/*<header className="App-header">*/}
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    {JSON.stringify(productsAndPrices)}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            {/*</header>*/}
            <body>

            </body>
        </div>
    );
}

export default App;
