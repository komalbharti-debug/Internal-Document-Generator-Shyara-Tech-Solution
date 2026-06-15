import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  const current =
    location.pathname === "/"
      ? "Home"
      : location.pathname.split("/")[1];

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>

      {current !== "Home" && (
        <>
          <span> &gt; </span>
          <span className="active">
            {current.replace("-", " ")}
          </span>
        </>
      )}
    </div>
  );
}

export default Breadcrumb;