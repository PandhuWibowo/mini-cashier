import React, { Component } from "react";
import { Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
  componentDidMount() {
    axios(`${API_URL}/keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map((item) => {
          return axios
            .delete(`${API_URL}/keranjangs/${item.id}`)
            .then((res) => console.log(res))
            .catch((error) => console.error(error));
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/sukses.png" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terimakasih Sudah Memesan!</p>
        <Button variant="primary" as={Link} to="/" className="btn btn-success">
          Kembali
        </Button>
      </div>
    );
  }
}
