import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/constants";
export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(`${API_URL}/pesanans`, pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };
  render() {
    const totalBayar = this.props.keranjangs.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>Total Harga:</h5>
              <h5>
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  block
                  className="btn btn-success mb-2 mt-4 mr-2"
                  size="lg"
                  onClick={() => this.submitTotalBayar(totalBayar)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <strong> BAYAR</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Mobile */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4 mt-3">
              <h5>Total Harga:</h5>
              <h5>
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  block
                  className="btn btn-success mb-2 mt-4 mr-2"
                  size="lg"
                  onClick={() => this.submitTotalBayar(totalBayar)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <strong> BAYAR</strong>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
