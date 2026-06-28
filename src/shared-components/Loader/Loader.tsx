import loader from "../../assets/icons/loader/loader.svg";
import { cn } from "../../utils/cn";
import "./Loader.scss";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("loader", className)}>
      <img className="loader__icon" src={loader} alt="" />
    </div>
  );
};

export default Loader;
