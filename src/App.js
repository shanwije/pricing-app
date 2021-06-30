import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl, urls} from "./constants";
import {Col, Container, Navbar, Row, Table} from 'react-bootstrap';

function App() {

    // eslint-disable-next-line no-unused-vars
    const [productsAndPrices, setProductsAndPrices] = useState([]);

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
        <>
            <Navbar bg="light">
                <Navbar.Brand>My Assignment Store</Navbar.Brand>
            </Navbar>
            <Container>
                <Row md={1}>
                    <title>Store</title>
                    <Col md='1'>
                        <div className='table-wrapper'>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product name</th>
                                    <th>
                                        <tr>Prices</tr>
                                        <tr>

                                        </tr>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    productsAndPrices.length && productsAndPrices.map(({product, pricesList}, i) => {
                                        console.log(pricesList)
                                        return (
                                            <tr>
                                                <td>{i}</td>
                                                <td>{product.name}</td>
                                                <td>

                                                    {/*<th>*/}
                                                    {/*    <td>index</td>*/}
                                                    {/*    <td>price</td>*/}
                                                    {/*</th>*/}
                                                    <div className='price-col'>
                                                        <Table scrollable={true}>
                                                            <thead>
                                                            <tr>
                                                                <th>Item Count</th>
                                                                <th>Calculated Price</th>
                                                            </tr>
                                                            {pricesList.map((price, i) => {
                                                                return (<tr>
                                                                    <td>{i}</td>
                                                                    <td>{price}</td>
                                                                </tr>);
                                                            })}
                                                            </thead>
                                                        </Table>
                                                    </div>


                                                    {/*</section>*/}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }

                                </tbody>
                            </Table>
                        </div>

                    </Col>
                    <Col md='1'>

                    </Col>
                </Row>
            </Container>
        </>

    );
}

export default App;
