import { Link } from "react-router-dom";
import { PAGE_ROUTES } from "../../../../../config/page-routes";

const GoogleAuthLink = () => {
  return (
    <Link className="authentication__block-btn" to={PAGE_ROUTES.GOOGLE_URL}>
      <span className="authentication__block-text">
        Продовжити через Google
        <span className="authentication__block-decorative block-google" />
      </span>
    </Link>
  );
};

export default GoogleAuthLink;
