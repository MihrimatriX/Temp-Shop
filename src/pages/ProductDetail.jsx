import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, Image} from 'semantic-ui-react';
import ProductService from "../services/productService";

export default function ProductList() {

    let {name} = useParams();

    const [product, setProduct] = useState({});

    useEffect(() => {
        let productService = new ProductService();
        console.log("useEffect Çalıştı");
        productService.getByProductName(name).then(result => setProduct(result.data.data))
    }, [])

    return (
        <div>
            <Card.Group>
                <Card fluid>
                    <Card.Content>
                        <Image src='https://picsum.photos/600/400'/>
                        <Card.Header style={{marginTop: '30px'}}>{product.productName}</Card.Header>
                        <Card.Meta>Burası Hatalı ===>>> product.category.categoryName}</Card.Meta>
                        <Card.Meta>{product.unitPrice}</Card.Meta>
                        <Card.Description>{product.quantityPerUnit}</Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green'>
                                Ekle
                            </Button>
                            <Button basic color='red'>
                                Çıkar
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
        </div>
    );
}
