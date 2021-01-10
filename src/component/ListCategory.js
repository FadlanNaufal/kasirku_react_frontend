import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import {API_URL} from './../utils/constants'
import axios from 'axios'

export default class ListCategory extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             categories : []
        }
    }

    componentDidMount() {
        axios.get(API_URL + 'categories')
        .then(res => {
            const categories = res.data
            this.setState({
                categories
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    
    render() {
        const { categories } = this.state
        const { selectedCategory, changeCategory } = this.props
        return (
            <Col md={2} mt="2">
                <h4>List Category</h4>
                <hr/>
                <ListGroup>
                    { categories && categories.map((cat) => (
                        <ListGroup.Item 
                        key={cat.id}
                        style={{ cursor : 'pointer' }}
                        className={ selectedCategory === cat.nama && "category-active" }
                        onClick={()=> changeCategory(cat.nama)}>
                            {cat.nama}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}
