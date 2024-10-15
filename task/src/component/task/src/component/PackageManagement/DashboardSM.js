import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardSM.css';

export default function DashboardSM() {
  return (
    <div className="dashboard-wrapper98">
  <aside className="sidebar">
    <div className="logo1">
      <img src="/image/logo1.jpeg" alt="Logo" />
    </div>
    <nav className="navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/p4">Packages</a></li>
        <li><a href="/p3">Create</a></li>
      </ul>
    </nav>
    <div className="tools">
      <ul>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </div>
    <div className="user-profile">
      <img src="path_to_profile_image" alt="User" />
      <span>John Doe</span>
    </div>
  </aside>

  <div className="dashboard-container98">
    <header className="dashboard-header98">
      <h1 className="dashboard-title98">Manager Dashboard</h1>
    </header>

    <div className="dashboard-cards98">
      <Link to="/p3" className="card-link98">
        <div className="card98">
          <img src="/image/package-creation-icon.png" alt="Package Creation" className="card-icon98" />
          <p>Package Creation</p>
        </div>
      </Link>

      <Link to="/p2" className="card-link98">
        <div className="card98">
          <img src="/image/package-maintenance-icon.png" alt="Package Maintenance" className="card-icon98" />
          <p className="highlighted98">Package Maintenance</p>
        </div>
      </Link>

      <Link to="/p4" className="card-link98">
        <div className="card98">
          <img src="/image/packages-icon.png" alt="Packages" className="card-icon98" />
          <p>Packages</p>
        </div>
      </Link>
    </div>
  </div>
</div>

  );
}
