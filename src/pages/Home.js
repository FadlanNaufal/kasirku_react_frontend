import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { ListCategory, ListMenu, ListResult, NavbarComponent } from './../component'
import { API_URL } from './../utils/constants'
import axios from 'axios'
import swal from 'sweetalert'

export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      selectedCategory: 'Makanan',
      cart: []
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + 'products?category.nama=' + this.state.selectedCategory)
      .then(res => {
        const menus = res.data
        this.setState({
          menus: menus
        })
      })
      .catch(err => {
        console.log(err)
      })

      axios
      .get(API_URL + 'keranjangs')
      .then(res => {
        const cart = res.data
        this.setState({
          cart: cart
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cart !== prevState.cart){
      axios
      .get(API_URL + 'keranjangs')
      .then(res => {
        const cart = res.data
        this.setState({
          cart: cart
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  

  changeCategory = (value) => {
    this.setState({
      menus: [],
      selectedCategory: value
    })
    axios
      .get(API_URL + 'products?category.nama=' + value)
      .then(res => {
        const menus = res.data
        this.setState({
          menus: menus
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addToCart = (value) => {

    axios
      .get(API_URL + 'keranjangs?product.id=' + value.id)
      .then(res => {
        if (res.data.length == 0) {
          const cartMenu = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
          axios
            .post(API_URL + 'keranjangs', cartMenu)
            .then(res => {
              swal({
                title: 'Success!',
                text: `${cartMenu.product.nama} added to the cart`,
                icon: 'success',
                button: false,
                timer : 2000
              })
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          const cartMenu = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
          }
          axios
            .put(API_URL + 'keranjangs/'+ res.data[0].id  , cartMenu)
            .then(res => {
              swal({
                title: 'Success!',
                text: `${cartMenu.product.nama} added to the cart`,
                icon: 'success',
                button: false
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      .catch(err => {
        console.log(err)
        swal({
          title: 'Try again!',
          text: `failed added to the cart`,
          icon: 'failed',
          button: false
        })
      })
  }


  render() {
    const { menus, selectedCategory, cart } = this.state
    return (
      <div className="Home">

        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategory changeCategory={this.changeCategory} selectedCategory={selectedCategory} />
              <Col>
                <h4>Product List</h4>
                <hr />
                <Row>
                  {menus && menus.map((menu) => (
                    <ListMenu
                      key={menu.id}
                      menu={menu}
                      addToCart={this.addToCart}
                    />
                  ))}
                </Row>
              </Col>
              <ListResult cart={cart} {...this.props} />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
