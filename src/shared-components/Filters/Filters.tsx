import Tags from "./Tags/Tags";
import SortByCategories from "./SortByCategories/SortByCategories";
import SearchResults from "./SearchResults/SearchResults";
import "./Filters.scss";

const Filters = ({
  title,
  currentPage,
  isEmpty,
}: {
  title: string;
  currentPage: "MAIN" | "FAVORITES";
  isEmpty: boolean;
}) => {
  return (
    <div className="filters">
      <h2 className="filters__title">{title}</h2>
      <SearchResults isEmpty={isEmpty} />
      <Tags />
      <SortByCategories currentPage={currentPage} />
    </div>
  );
};

export default Filters;
