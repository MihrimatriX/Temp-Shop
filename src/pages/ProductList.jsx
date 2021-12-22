import React, {useEffect, useState} from "react";
import {Button, Icon, Image, Menu, Table} from 'semantic-ui-react'
import ProductService from "../services/productService";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../store/actions/cartActions";
import {toast} from "react-toastify";

export default function ProductList() {

    const dispatch = useDispatch();
    const handleAddCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.productName} Sepete Atıldı`);
    }
    //Destructor
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let productService = new ProductService();
        productService.getProducts().then(result => setProducts(result.data.data))
    }, [])

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Kapak</Table.HeaderCell>
                        <Table.HeaderCell>Ürün Adı</Table.HeaderCell>
                        <Table.HeaderCell>Birim Fiyatı</Table.HeaderCell>
                        <Table.HeaderCell>Stock Adedi</Table.HeaderCell>
                        <Table.HeaderCell>Açıklama</Table.HeaderCell>
                        <Table.HeaderCell>Kategori</Table.HeaderCell>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        products.map((product) => (
                            <Table.Row key={product.id}>
                                <Table.Cell>
                                    <Image src="https://picsum.photos/100/160"/>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/products/${product.productName}`}>{product.productName}</Link>
                                </Table.Cell>
                                <Table.Cell>{product.unitPrice}</Table.Cell>
                                <Table.Cell>{product.unitInStock}</Table.Cell>
                                <Table.Cell>{product.quantityPerUnit}</Table.Cell>
                                <Table.Cell>{product.category.categoryName}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => handleAddCart(product)}>Sepete At</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="12">
                            <Menu floated="right" pagination>
                                <Menu.Item as="a" icon>
                                    <Icon name="chevron left"/>
                                </Menu.Item>
                                <Menu.Item as="a">1</Menu.Item>
                                <Menu.Item as="a">2</Menu.Item>
                                <Menu.Item as="a">3</Menu.Item>
                                <Menu.Item as="a">4</Menu.Item>
                                <Menu.Item as="a" icon>
                                    <Icon name="chevron right"/>
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );
}