import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriYangDiPilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios(`${API_URL}/products?category.nama=${this.state.kategoriYangDiPilih}`)
      .then((res) => {
        this.setState({ menus: res.data });
      })
      .catch((error) => console.error(error));

    this.getListKeranjang();
  }

  changeCategory = (value) => {
    this.setState({
      kategoriYangDiPilih: value,
      menus: [],
    });

    axios(`${API_URL}/products?category.nama=${value}`)
      .then((res) => {
        this.setState({ menus: res.data });
      })
      .catch((error) => console.error(error));
  };

  masukKeranjang = (value) => {
    axios(`${API_URL}/keranjangs?product.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(`${API_URL}/keranjangs`, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => console.error(error));
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(`${API_URL}/keranjangs/${res.data[0].id}`, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios(`${API_URL}/keranjangs`)
  //       .then((res) => {
  //         this.setState({ keranjangs: res.data });
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // }

  getListKeranjang = () => {
    axios(`${API_URL}/keranjangs`)
      .then((res) => {
        this.setState({ keranjangs: res.data });
      })
      .catch((error) => console.error(error));
  };

  render() {
    const { menus, kategoriYangDiPilih, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              kategoriYangDiPilih={kategoriYangDiPilih}
            />
            <Col className="mt-3">
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      menu={menu}
                      key={menu.id}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>

            <Hasil
              keranjangs={keranjangs}
              {...this.props}
              getListKeranjang={this.getListKeranjang}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
