import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <>
      <Col md={4} sx={6} className="mb-4">
        <Card
          className="shadow h-100"
          style={{ cursor: "pointer" }}
          onClick={() => masukKeranjang(menu)}
        >
          <Card.Img
            className="h-50"
            variant="top"
            src={`assets/images/${menu.category.nama.toLowerCase()}/${
              menu.gambar
            }`}
          />
          <Card.Body>
            <Card.Title>
              {menu.nama} <strong>({menu.kode})</strong>
            </Card.Title>
            <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Menus;
