import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Alert, Card, Button, Spinner, ListGroup } from "react-bootstrap";
import useProduitStore from "../../ZustandStores/useProduitStore";

function ProduitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProduitById, deleteProduitAsync } = useProduitStore();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchProduitById(id)
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          setNotFound(true);
        } else {
          setProduit(data);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, fetchProduitById]);

  const handleDelete = () => {
    deleteProduitAsync(id).then(() => navigate("/produits"));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (notFound || !produit) {
    return (
      <div className="mt-4">
        <Alert variant="danger">Produit introuvable</Alert>
        <Button variant="secondary" onClick={() => navigate("/produits")}>
          Retour à la liste
        </Button>
      </div>
    );
  }

  return (
    <div className="my-4">
      <Card>
        <Card.Header>
          <h2>{produit.xd}</h2>
          <span className="text-muted">{produit.categorie}</span>
        </Card.Header>
        <Card.Body>
          <Card.Text>{produit.description}</Card.Text>
          <ListGroup variant="flush" className="my-3">
            <ListGroup.Item>
              <strong>Prix:</strong> {produit.prix} €
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Stock:</strong> {produit.stock} unités
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Catégorie:</strong> {produit.categorie}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-flex gap-2">
            <Button as={Link} to="/produits" variant="secondary">
              Retour à la liste
            </Button>
            <Button as={Link} to={`/update-produit/${produit.id}`} variant="warning">
              Modifier
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProduitDetails;
