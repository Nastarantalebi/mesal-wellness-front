import Button from "@/components/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Button variant="instagram">
        <Link to="/dashboard">ورود</Link>
      </Button>
    </div>
  );
};

export default LandingPage;
