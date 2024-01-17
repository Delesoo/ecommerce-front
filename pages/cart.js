import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from 'axios';
import Table from "@/components/Table";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .8fr;
    gap: 40px;
    margin-top: 40px;
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const ProductInfoCell = styled.td`
    padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 2px solid rgba(0,0,0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 80px;
        max-height:  80px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 3px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

export default function CartPage() {
    const {cartProducts,addProduct,removeProduct} = useContext(CartContext);
    const [products,setProducts] = useState ([]);
    const [name,setName] = useState([]);
    const [email,setEmail] = useState([]);
    const [city,setCity] = useState([]);
    const [postalCode,setPostalcode] = useState([]);
    const [streetAddress,setStreetAddress] = useState([]);
    const [country,setCountry] = useState([]);
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids:cartProducts})
            .then(response => {
                setProducts(response.data);
            })
        } else {
            setProducts([]);
        }
    }, [cartProducts])
    function moreOfThisProduct(id) {
        addProduct(id);
    }
    function lessOfThisProduct(id) {
        removeProduct(id);
    }
    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name,email,city,postalCode,streetAddress,country,
            cartProducts,
        });
        if (response.data.url) {
            window.location = response.data.url;
        }
    }
    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if (window.location.href.includes('success')) {
        return (
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Your payment is successful!</h1>
                            <p>Order details has been sent to your Email.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }
    return (
        <>
            <Header />
            <Center>
            <ColumnsWrapper>
                <Box>
                    <h2>Cart</h2>
                    {!cartProducts?.length && (
                        <div>Your cart is empty</div>
                    )}
                    {products?.length > 0 && (
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                                <tr>
                                    <ProductInfoCell>
                                        <ProductImageBox>
                                        <img src={product.images[0]} alt=""/>
                                        </ProductImageBox>
                                        {product.title}
                                    </ProductInfoCell>
                                    <td>
                                        <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                        <QuantityLabel>
                                        {cartProducts.filter(id => id === product._id).length} 
                                        </QuantityLabel>    
                                        <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                    </td>
                                    <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td>${total}</td>
                            </tr>
                        </tbody>
                    </Table>
                    )}
                </Box>
                {!!cartProducts?.length && (
                <Box>
                    <h2>Order Information</h2>
                    
                    <Input type="text" placeholder="Name" value={name} name={name} onChange={ev => setName(ev.target.value)}></Input>
                    <Input type="text" placeholder="Email" value={email} name={email} onChange={ev => setEmail(ev.target.value)}></Input>
                    <CityHolder>
                        <Input type="text" placeholder="City" value={city} name={city} onChange={ev => setCity(ev.target.value)}></Input>
                        <Input type="text" placeholder="Postal Code" value={postalCode} name={postalCode} onChange={ev => setPostalcode(ev.target.value)}></Input>
                    </CityHolder>         
                    <Input type="text" placeholder="Street Address" value={streetAddress} name={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}></Input>
                    <Input type="text" placeholder="Country" value={country} name={country} onChange={ev => setCountry(ev.target.value)}></Input>
                    <Button black block onClick={goToPayment}>Continue to payment</Button>
                </Box>
                )}
            </ColumnsWrapper>
            </Center>
        </>
    );
}