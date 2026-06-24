import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="!px-8">
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
