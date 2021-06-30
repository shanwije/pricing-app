import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {baseUrl, urls} from "./constants";
import {Button, Card, Col, Container, Form, Navbar, Row, Table} from 'react-bootstrap';

function App() {

    const [productsAndPrices, setProductsAndPrices] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState('');
    const [isCartons, setCartons] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(0.00);
    const [isPriceFactorsChanged, setPriceFactorsChanged] = useState(true);

    useEffect(() => {
        fetchProductsAndPrices();
    }, []);

    const fetchProductsAndPrices = () => {
        axios.get(`${baseUrl}${urls.GET_PRODUCTS_AND_PRICES}`)
            .then(res => {
                setProductsAndPrices(res.data);
                setProduct(productsAndPrices[0].product);
            })
            .catch(err => console.error(err));
    }

    const handleProductSelect = (e) => {
        setPriceFactorsChanged(true);
        const selectedProduct = productsAndPrices
            .map(({product}) => product)
            .find(product => product.id == e.target.value);
        setProduct(selectedProduct);
    }
    const handleSetQuantity = (e) => {
        setPriceFactorsChanged(true);
        setQuantity(e.target.value);
    }

    const handleSetPackageType = (isCartons) => {
        setPriceFactorsChanged(true);
        setCartons(isCartons);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(quantity, product, isCartons);

        const {cartonPrice, unitsPerCarton} = product;

        const params = {
            cartonPrice,
            unitsPerCarton,
            quantity,
            isCartons
        }

        axios.get(`${baseUrl}${urls.GET_PRICE}`, {params})
            .then(res => {
                console.log(res);
                setPriceFactorsChanged(false);
                setCalculatedPrice(res.data.price);
            })
            .catch(err => console.error(err));
    }

    return (
        <Container fluid={true}>
            <Navbar sticky={true}>
                <Navbar.Brand>My Store</Navbar.Brand>
            </Navbar>
            <Row sm={12} className='mt-3'>
                <title>Store</title>
                <Col sm={7}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Products</Card.Title>
                            <div className='table-wrapper'>
                                <Table striped bordered hover variant="light" responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product name</th>
                                        <th>Price Info</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {productsAndPrices.length
                                    && productsAndPrices.map(({product, pricesList}, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td>{product.name}</td>
                                                <td>
                                                    <Card className='price-col'>
                                                        <Table size="sm" responsive>
                                                            <thead>
                                                            <tr>
                                                                <th>Item Count</th>
                                                                <th>Calculated Price</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {pricesList
                                                                .filter((price, i) => i !== 0)
                                                                .map((price, i) => (<tr key={i + 1}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{price.toFixed(2)}</td>
                                                                    </tr>)
                                                                )}
                                                            </tbody>
                                                        </Table>
                                                    </Card>
                                                </td>
                                            </tr>
                                        );
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={5}>
                    <Card className='d-grid gap-2'>
                        <Card.Body>
                            <Card.Title> Calculate Price </Card.Title>
                            {productsAndPrices.length && (
                                <>
                                    <Form onSubmit={(e) => handleSubmit(e)}>
                                        <Form.Group controlId="form.product">
                                            <Form.Label>Product</Form.Label>
                                            <Form.Control as="select"
                                                          value={product.id}
                                                          onChange={e => handleProductSelect(e)} custom>
                                                {productsAndPrices.map(
                                                    ({product}) => (
                                                        <option key={product.id} id={product.id}
                                                                value={product.id}>{product.name}</option>))}
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="form.quantity">
                                            <Form.Label>Quantity</Form.Label>
                                            <Form.Control type="number" placeholder="quantity" min="0" step="1"
                                                          value={quantity}
                                                          onChange={e => handleSetQuantity(e)}/>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label as="legend" column sm={5}>
                                                Package
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Check
                                                    type="radio"
                                                    label="Cartons"
                                                    name="package"
                                                    id="carton"
                                                    checked={isCartons}
                                                    onChange={e => handleSetPackageType(true)}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Units"
                                                    name="package"
                                                    id="unit"
                                                    checked={!isCartons}
                                                    onChange={e => handleSetPackageType(false)}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className='custom-full-width-button'>
                                            Calculate
                                        </Button>
                                        {!isPriceFactorsChanged && (<Form.Group className='mt-3'>
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control value={calculatedPrice.toFixed(2)}
                                                          placeholder="Price"
                                                          disabled/>
                                        </Form.Group>)}
                                    </Form>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
