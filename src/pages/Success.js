import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { API_URL } from './../utils/constants'

export default class Success extends Component {

    componentDidMount() {
        axios
          .get(API_URL + "keranjangs")
          .then((res) => {
            const cart = res.data;
            cart.map(function(item) {
                return axios
                    .delete(API_URL+"keranjangs/"+item.id)
                    .then((res) => console.log(res))
                    .catch((error) => console.log(error))
            })
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      }



    render() {
        return (
            <div className="mt-5 text-center">
                <h4>Transaction Successfull</h4>
                <p>Have a niceday!</p>
                <Button variant="primary" as={Link} to="/">
                    Back to home
                </Button>
            </div>
        )
    }
}
