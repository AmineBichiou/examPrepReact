import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { z } from "zod";
import useProduitStore from "../../ZustandStores/useProduitStore";

const produitSchema = z.object({
  xd: z.string().trim().min(1, "Le xd est obligatoire"),
  description: z.string().trim().min(1, "La description est obligatoire"),
  prix: z
    .string()
    .trim()
    .min(1, "Le prix est obligatoire")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, "Le prix doit etre un xdbre positif"),
  stock: z
    .string()
    .trim()
    .min(1, "Le stock est obligatoire")
    .refine((value) => Number.isInteger(Number(value)) && Number(value) >= 0, "Le stock doit etre un entier positif ou nul"),
  categorie: z.string().trim().min(1, "La categorie est obligatoire"),
  options: z.array(z.string()).optional(),
});

function UpdateProduit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProduitById, updateProduitAsync } = useProduitStore();
  const [formData, setFormData] = useState({
    xd: "",
    description: "",
    prix: "",
    stock: "",
    categorie: "",
    options: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduitById(id)
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          setNotFound(true);
        } else {
          setFormData({
            xd: data.xd,
            description: data.description,
            prix: data.prix.toString(),
            stock: data.stock.toString(),
            categorie: data.categorie,
            options: data.options || [],
          });
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id, fetchProduitById]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "options") {
      setFormData((prev) => {
        if (checked) {
          return { ...prev, options: [...prev.options, value] };
        } else {
          return { ...prev, options: prev.options.filter((opt) => opt !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation avant Zod:
    // if (!formData.xd || !formData.description || !formData.prix || !formData.stock || !formData.categorie) {
    //   setError("Veuillez remplir tous les champs");
    //   return;
    // }

    const validationResult = produitSchema.safeParse(formData);

    if (!validationResult.success) {
      setError(validationResult.error.issues[0].message);
      return;
    }

    const produitData = {
      ...validationResult.data,
      prix: Number(validationResult.data.prix),
      stock: Number(validationResult.data.stock),
    };

    setSaving(true);
    updateProduitAsync(id, produitData)
      .then(() => {
        setSuccess(true);
        setTimeout(() => navigate(`/produits/${id}`), 1500);
      })
      .catch((err) => setError(err.message))
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (notFound) {
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
          <h2>Modifier le produit</h2>
        </Card.Header>
        <Card.Body>
          {success && <Alert variant="success">Produit mis à jour ! Redirection...</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="xd"
                value={formData.xd}
                onChange={handleChange}
                placeholder="Nom du produit"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description du produit"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prix (€)</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="ex: 29.99"
                step="0.01"
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="ex: 50"
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="Informatique">Informatique</option>
                <option value="Accessoires">Accessoires</option>
                <option value="Moniteurs">Moniteurs</option>
                <option value="Composants">Composants</option>
                <option value="Autre">Autre</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Options (Villes)</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Lyon"
                  name="options"
                  value="Lyon"
                  checked={formData.options.includes("Lyon")}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Marseille"
                  name="options"
                  value="Marseille"
                  checked={formData.options.includes("Marseille")}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Paris"
                  name="options"
                  value="Paris"
                  checked={formData.options.includes("Paris")}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={saving}>
                {saving ? "Enregistrement..." : "Mettre à jour"}
              </Button>
              <Button as={Link} to={`/produits/${id}`} variant="secondary">
                Annuler
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UpdateProduit;
