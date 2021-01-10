import React, { Component } from 'react'
import { Col, Row, ListGroup, Badge, Modal, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/numberFormat'
import CartModal from './CartModal'
import TotalPrice from './TotalPrice'
import { API_URL } from './../utils/constants'
import axios from 'axios'
import swal from 'sweetalert'

export default class ListResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            cartDetail: false,
            jumlah: 0,
            keterangan: '',
            total_harga: 0
        }
    }

    handleModalShow = (item) => {
        this.setState({
            showModal: true,
            cartDetail: item,
            jumlah: item.jumlah,
            keterangan: item.keterangan,
            total_harga: item.total_harga
        })
    }

    handleModalClose = () => {
        this.setState({
            showModal: false
        })
    }

    addQty = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            total_harga: this.state.cartDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    minQty = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                total_harga: this.state.cartDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.handleModalClose()
        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.total_harga,
            product: this.state.cartDetail.product,
            keterangan : this.state.keterangan
        }
        axios
            .put(API_URL + 'keranjangs/' + this.state.cartDetail.id, data)
            .then(res => {
                swal({
                    title: 'Updated!',
                    text: `${data.product.nama} detail updated`,
                    icon: 'success',
                    button: false,
                    timer: 2000
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    deleteOrder = (id) => {
        this.handleModalClose()
        axios
            .delete(API_URL + 'keranjangs/' + id)
            .then(res => {
                swal({
                    title: 'Deleted!',
                    text: `${this.state.cartDetail.product.nama} has been deleted`,
                    icon: 'success',
                    button: false,
                    timer: 2000
                })
            })
            .catch(err => {
                console.log(err)
                swal({
                    title: 'Failed!',
                    text: `${this.state.cartDetail.product.nama} failed to be deleted`,
                    icon: 'error',
                    button: false,
                    timer: 2000
                })
            })
    }

    changeHandler = (e) => {
        this.setState({
            keterangan: e.target.value
        })
    }


    render() {
        const { cart } = this.props
        return (
            <Col md={3} mt="2">
                <h4>List Result</h4>
                <hr />
                {cart.length !== 0 && (
                    <ListGroup variant="flush">
                        {cart.map((item) => (
                            <ListGroup.Item key={item.id} onClick={() => this.handleModalShow(item)}>
                                <Row>
                                    <Col xs={2}>
                                        <Badge pill variant="success">
                                            {item.jumlah}
                                        </Badge>
                                    </Col>
                                    <Col>
                                        <h5>{item.product.nama}</h5>
                                        <p>Rp. {numberWithCommas(item.product.harga)}</p>
                                    </Col>
                                    <Col>
                                        <strong>
                                            <p>Rp. {numberWithCommas(item.total_harga)}</p>
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <CartModal handleModalClose={this.handleModalClose} handleSubmit={this.handleSubmit} changeHandler={this.changeHandler} minQty={this.minQty} addQty={this.addQty} deleteOrder={this.deleteOrder} {...this.state} />
                    </ListGroup>
                )}
                <TotalPrice cart={cart} {...this.props} />
            </Col>
        )
    }
}
