import React, { Component } from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/numberFormat'
import { API_URL } from './../utils/constants'
import axios from 'axios'
import swal from 'sweetalert'

export default class TotalPrice extends Component {
    confirmOrder = (totalPrice) => {

        if (this.props.cart.length == 0) {
            swal({
                title: 'Failed!',
                text: `Make sure you add some product`,
                icon: 'error',
                button: false,
                timer: 2000
            })
        } else {
            const order = {
                total_bayar: totalPrice,
                menus: this.props.cart
            }

            axios.post(API_URL + 'pesanans', order).then((res) => {
                this.props.history.push('/success')
            })
        }
    }
    render() {
        const totalPrice = this.props.cart.reduce(function (result, item) {
            return result + item.total_harga
        }, 0)
        return (
            <div className="fixed-bottom">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total: <strong className="float-right mr-3">Rp {numberWithCommas(totalPrice)}</strong> </h5>
                        <Button block variant="primary" onClick={() => this.confirmOrder(totalPrice)} className="mb-3 mr-3">Confirm</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
