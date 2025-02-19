import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { fetchProducts } from "./ApiService";
import { fetchProductDetails } from "./ApiService";
import "./component.css";
import TypingEffect from "./TypingEffect";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(pageNumber);
        setProducts((prevProducts) => [...prevProducts, ...data]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [pageNumber]);

  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    setShowMore(true);
  };

  return (
    <div className="home">
      <div className="landing">
        <div>Selamat</div>
        <div> Datang</div>
        <div> Di</div>
        <div> SansStore</div>
      </div>
      <div className="jargon">
        Tempat Belanja ter <TypingEffect /> se-Indonesia
      </div>
      <Row>
        {products.slice(0, showMore ? products.length : 36).map((product) => (
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
      <Button variant="primary" onClick={handleLoadMore}>
        Load More
      </Button>
    </div>
  );
}

export default Home;
