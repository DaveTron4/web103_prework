import { Outlet, useNavigate } from "react-router-dom";
import "../App.css"; // import CSS file

function LayoutComponent() {
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      {/* Hero Section with Navigation */}
      <div className="hero">
        <h1 className="website-title">CreatorVerse</h1>
        <div className="nav-buttons">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/creators")}>Creators</button>
          <button onClick={() => navigate("/addCreator")}>Add Creator</button>
        </div>
      </div>

      {/* Page Content */}
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutComponent;
