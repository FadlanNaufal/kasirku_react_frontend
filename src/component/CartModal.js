import React from 'react'
import {  Form, Modal, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/numberFormat'

const CartModal = ({ showModal, handleModalClose, cartDetail, keterangan, jumlah, addQty, minQty, total_harga, handleSubmit, changeHandler, deleteOrder }) => {
    if (cartDetail) {
        return (
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {cartDetail.product.nama} x {jumlah}
                        <br />
                        <strong>
                            Rp {numberWithCommas(total_harga)}
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Qty</Form.Label>
                            <br />
                            <Button variant="primary" size="sm" onClick={() => minQty()}>
                                <strong>-</strong>
                            </Button>
                            <strong className="mx-4">{jumlah}</strong>
                            <Button variant="primary" size="sm" onClick={() => addQty()}>
                                <strong>+</strong>
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="Contoh: Pedas, Asin"
                                value={keterangan}
                                onChange={(e) => changeHandler(e)}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Total Price</Form.Label>
                            <br />
                            <strong>{cartDetail.total_harga}</strong>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteOrder(cartDetail.id)}>
                        Delete Order
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return (
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Empty
                        <br />
                        <strong>
                            Empty
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Qty</Form.Label>
                            <br />
                            <Button variant="primary" size="sm">
                                <strong>-</strong>
                            </Button>
                            <strong className="mx-4">0</strong>
                            <Button variant="primary" size="sm">
                                <strong>+</strong>
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                name="keterangan"
                                placeholder="Contoh: Pedas, Asin"
                                value={keterangan}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Total Price</Form.Label>
                            <br />
                            <strong>{cartDetail.total_harga}</strong>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteOrder(cartDetail.id)}>
                        Delete Order
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CartModal
