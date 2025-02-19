import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchCart, fetchProductDetails } from "./ApiService";
import { USER_ID } from "./constants";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      try {
        const data = await fetchCart(USER_ID);
        const orders = Array.isArray(data) ? data : [data];
        const latestOrder = orders[orders.length - 1];
        const productsWithDetails = await Promise.all(
          (latestOrder.products || []).map(async (item) => {
            try {
              const productDetails = await fetchProductDetails(item.productId);
              return { ...productDetails, quantity: item.quantity };
            } catch (error) {
              console.error(
                `Error fetching details for productId ${item.productId}:`,
                error
              );
              return null;
            }
          })
        );

        setCart({
          ...latestOrder,
          products: productsWithDetails.filter((item) => item !== null),
        });

        // Calculate the total price
        const total = productsWithDetails.reduce(
          (acc, item) => acc + (item?.price || 0) * item.quantity,
          0
        );
        setTotal(total);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    getCart();
  }, []);

  const handleDelete = async () => {
    try {
      // Call the DELETE API to remove the cart
      const response = await fetch("https://fakestoreapi.com/carts/6", {
        method: "DELETE",
      });

      if (response.ok) {
        // If the delete was successful, clear the cart state
        setCart([]);
      } else {
        console.error("Failed to delete cart");
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const handleCheckout = async () => {
    alert("Berhasil Checkout");
  };

  return (
    <Container
      className="my-5"
      style={{
        height: "calc(100vh - 10rem)",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{
          marginTop: "10rem",
        }}
      >
        Keranjang
      </h2>
      {cart.products && cart.products.length > 0 ? (
        <div>
          <h3>Order Details</h3>
          <p>Date: {new Date(cart.date).toLocaleDateString()}</p>
          <Row>
            <Col md={8}>
              <ListGroup>
                {cart.products.map((item) => (
                  <ListGroup.Item key={item.productId}>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <h5>{item.title}</h5>
                        <p>
                          Rp.{(item.price * 15000).toLocaleString("id-ID")} x{" "}
                          {item.quantity}
                        </p>
                        <p>
                          Subtotal: Rp
                          {(item.price * 15000).toLocaleString("id-ID") *
                            item.quantity}
                        </p>
                      </Col>
                      <Col md={4} className="text-end">
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item.productId)}
                        >
                          Hapus
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="text-center">Summary</Card.Title>
                  <hr />
                  <h5>
                    Grand Total: Rp.{" "}
                    {(total.toFixed(2) * 15000).toLocaleString("id-ID")}
                  </h5>
                  <div className="d-flex justify-content-center">
                    <Button variant="success" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <p>No items in the cart.</p>
      )}
    </Container>
  );
}

export default Cart;
