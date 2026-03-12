import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page introuvable</h2>
      <p className="lead mb-4">
        La page que vous recherchez n&apos;existe pas.
      </p>
      <Button as={Link} to="/" variant="primary">
        Retour à l&apos;accueil
      </Button>
    </div>
  );
}

export default NotFound;
