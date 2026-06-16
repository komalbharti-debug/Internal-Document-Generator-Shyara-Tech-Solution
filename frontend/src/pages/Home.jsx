import Breadcrumb from "../components/Breadcrumb";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb />

      <h1>Welcome back</h1>

      <p className="subtitle">
        Manage templates, generate documents and keep records organized.
      </p>

      <div className="stats-grid">

        <div
          className="card"
          onClick={() => navigate("/departments")}
        >
          <h2>4</h2>
          <p>Departments</p>
        </div>

        <div
          className="card"
          onClick={() => navigate("/templates")}
        >
          <h2>8</h2>
          <p>Document Types</p>
        </div>

        <div
          className="card"
          onClick={() => navigate("/history")}
        >
          <h2>2</h2>
          <p>Generated Documents</p>
        </div>

      </div>

      <div className="card action-box">

        <h3>Quick Actions</h3>

        <div className="quick-grid">

          <div
            className="quick-card"
            onClick={() => navigate("/generate-document")}
          >
            Generate a Document
          </div>

          <div
            className="quick-card"
            onClick={() => navigate("/departments")}
          >
            Browse Departments
          </div>

        </div>

      </div>

    </>
  );
}

export default Home;