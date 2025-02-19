import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import { fetchProductDetails, fetchProducts, addToCart } from "./ApiService";
import { USER_ID } from "./constants";

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [otherProducts, setOtherProducts] = useState([]);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const getOtherProducts = async () => {
      try {
        const data = await fetchProducts();
        setOtherProducts(data.slice(0, 8));
      } catch (error) {
        console.error("Error fetching other products:", error);
      }
    };

    getProductDetails();
    getOtherProducts();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(USER_ID, { productId: product.id, quantity });
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    setShowMore(true);
  };

  return (
    <div style={{ height: "100%" }}>
      {" "}
      <Row style={{ marginTop: "5rem" }}>
        <Col md={3}>
          <img src={product.image} alt={product.name} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h2 className="mb-3">{product.title}</h2>
          <p className="mb-1">{product.description}</p>
          <Col md={6}>
            <p className="mb-1">Price: {product.price}</p>
          </Col>
          <Form>
            <Form.Group controlId="quantity" className="mb-3">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
              />
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="btn-block"
            disabled={quantity <= 0}
            style={{ opacity: quantity <= 0 ? 0.5 : 1 }}
          >
            {quantity <= 0 ? "Quantity must be greater than 0" : "Add to Cart"}
          </Button>
        </Col>
      </Row>
      <h2>Other Products</h2>
      <Row>
        {otherProducts
          .slice(0, showMore ? otherProducts.length : 12)
          .map((product) => (
            <Col key={product.id} xs={12} sm={5} md={4} lg={2}>
              <Card
                style={{
                  marginBottom: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  height: "300px",
                  width: "100%",
                }}
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{
                    objectFit: "cover",
                    height: "150px",
                    width: "100%",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <Card.Body style={{ flex: 1, padding: "20px" }}>
                  <Card.Title style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {product.title.length > 15
                      ? product.title.substring(0, 15) + "..."
                      : product.title}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "16px", color: "#666" }}>
                    Rp. {(product.price * 15000).toLocaleString("id-ID")}
                  </Card.Text>
                  <Link
                    className="d-flex justify-content-center"
                    to={`/detail/${product.id}`}
                  >
                    <Button
                      variant="primary"
                      style={{
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Detail;
