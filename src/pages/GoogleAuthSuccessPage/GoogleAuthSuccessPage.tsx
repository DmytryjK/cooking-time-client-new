import { useEffect } from "react";
import { useGetMe } from "../../queries/get-me/get-me.query";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "../../config/page-routes";

const GoogleAuthSuccessPage = () => {
  const { refetch } = useGetMe({ enabled: false });
  const navigate = useNavigate();

  useEffect(() => {
    refetch().then(() => {
      navigate(PAGE_ROUTES.ROOT);
    });
  }, []);

  return null;
};

export default GoogleAuthSuccessPage;
