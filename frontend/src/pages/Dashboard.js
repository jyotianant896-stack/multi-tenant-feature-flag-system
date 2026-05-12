import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../services/api';

function Dashboard() {

  const navigate = useNavigate();

  const [features, setFeatures] = useState([]);

  const [formData, setFormData] = useState({
    feature_name: '',
    status: 1,
    organization_id: ''
  });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {

    try {

      const res = await API.get('/features');

      setFeatures(res.data);

    } catch (error) {

      console.log(error);

      alert('Error fetching features');

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const addFeature = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        '/features',
        formData
      );

      alert('Feature Added Successfully');

      setFormData({
        feature_name: '',
        status: 1,
        organization_id: ''
      });

      fetchFeatures();

    } catch (error) {

      console.log(error);

      alert('Error adding feature');

    }

  };

  const logout = () => {

    localStorage.removeItem('token');

    navigate('/');

  };

  return (

    <div className="d-flex">

      {/* SIDEBAR */}

      <div
        className="bg-dark text-white p-4"
        style={{
          width: "250px",
          minHeight: "100vh"
        }}
      >

        <h3 className="mb-5 fw-bold">
          Feature Flag
        </h3>

        <ul className="nav flex-column">

          <li className="nav-item mb-4">
            <a
              href="/dashboard"
              className="nav-link text-white"
            >
              Dashboard
            </a>
          </li>

          <li className="nav-item mb-4">
            <a
              href="/super-admin"
              className="nav-link text-white"
            >
              Organizations
            </a>
          </li>

          <li className="nav-item mb-4">
            <a
              href="/user"
              className="nav-link text-white"
            >
              User Check
            </a>
          </li>

          <li className="nav-item">
            <button
              className="btn btn-danger w-100"
              onClick={logout}
            >
              Logout
            </button>
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}

      <div
        className="flex-grow-1 p-4 bg-light"
      >

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="fw-bold">
            Feature Flag Dashboard
          </h2>

        </div>

        {/* ADD FEATURE FORM */}

        <div className="card shadow-lg border-0 rounded-4 p-4 mb-4">

          <h4 className="mb-4">
            Add Feature
          </h4>

          <form onSubmit={addFeature}>

            <div className="row">

              <div className="col-md-4 mb-3">

                <input
                  type="text"
                  name="feature_name"
                  placeholder="Feature Name"
                  className="form-control form-control-lg"
                  value={formData.feature_name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-4 mb-3">

                <select
                  name="status"
                  className="form-control form-control-lg"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="1">
                    Active
                  </option>

                  <option value="0">
                    Inactive
                  </option>

                </select>

              </div>

              <div className="col-md-4 mb-3">

                <input
                  type="number"
                  name="organization_id"
                  placeholder="Organization ID"
                  className="form-control form-control-lg"
                  value={formData.organization_id}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
            >
              Add Feature
            </button>

          </form>

        </div>

        {/* FEATURE CARDS */}

        <div className="row mb-4">

          <div className="col-md-4 mb-3">

            <div className="card shadow-lg border-0 rounded-4 p-4">

              <h5>Total Features</h5>

              <h1 className="fw-bold">
                {features.length}
              </h1>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow-lg border-0 rounded-4 p-4">

              <h5>Active Features</h5>

              <h1 className="fw-bold text-success">

                {
                  features.filter(
                    feature => feature.status === 1
                  ).length
                }

              </h1>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow-lg border-0 rounded-4 p-4">

              <h5>Inactive Features</h5>

              <h1 className="fw-bold text-danger">

                {
                  features.filter(
                    feature => feature.status === 0
                  ).length
                }

              </h1>

            </div>

          </div>

        </div>

        {/* FEATURE TABLE */}

        <div className="card shadow-lg border-0 rounded-4 p-4">

          <h4 className="mb-4">
            Feature List
          </h4>

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>Feature Name</th>
                <th>Status</th>
                <th>Organization ID</th>

              </tr>

            </thead>

            <tbody>

              {
                features.map((feature) => (

                  <tr key={feature.id}>

                    <td>{feature.id}</td>

                    <td>{feature.feature_name}</td>

                    <td>

                      {
                        feature.status === 1
                          ? (
                            <span className="badge bg-success">
                              Active
                            </span>
                          )
                          : (
                            <span className="badge bg-danger">
                              Inactive
                            </span>
                          )
                      }

                    </td>

                    <td>{feature.organization_id}</td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;