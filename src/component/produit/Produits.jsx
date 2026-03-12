import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, Card, Button, Row, Col, Badge, Spinner } from "react-bootstrap";
import useProduitStore from "../../ZustandStores/useProduitStore";

function Produits() {
  const { produits, errors, fetchProduits, deleteProduitAsync } = useProduitStore();

  useEffect(() => {
    fetchProduits();
  }, [fetchProduits]);

  const handleDelete = (id) => {
    deleteProduitAsync(id);
  };

  return (
    <div className="my-4">
      {errors && <Alert variant="danger">Erreur lors du chargement des produits.</Alert>}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Liste des produits</h1>
        <Button as={Link} to="/add-produit" variant="success">
          + Ajouter un produit
        </Button>
      </div>
      <Row>
        {produits.map((produit) => (
          <Col key={produit.id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{produit.xd}</Card.Title>
                <Badge bg="secondary" className="mb-2">
                  {produit.categorie}
                </Badge>
                <Card.Text className="text-muted small">
                  {produit.description}
                </Card.Text>
                <div className="mb-3">
                  <small className="d-block">
                    <strong>Prix:</strong> {produit.prix} €
                  </small>
                  <small className="d-block">
                    <strong>Stock:</strong> {produit.stock} unités
                  </small>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    as={Link}
                    to={`/produits/${produit.id}`}
                    variant="primary"
                    size="sm"
                  >
                    Détails
                  </Button>
                  <Button
                    as={Link}
                    to={`/update-produit/${produit.id}`}
                    variant="warning"
                    size="sm"
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(produit.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Produits;
