import React from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import {numberWithCommas} from './../utils/numberFormat'

const ListMenu = ({ menu, addToCart }) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card style={{ height : 300 }} className="shadow">
                <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama}</Card.Title>
                    <Card.Text>
                        Rp.{numberWithCommas(menu.harga)}
                    </Card.Text>                
                </Card.Body>
                <Card.Footer>
                    <Button 
                    onClick={() => addToCart(menu)}
                    variant="primary">Buy</Button>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default ListMenu
