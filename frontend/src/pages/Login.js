import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../services/api';

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        '/users/login',
        formData
      );

      localStorage.setItem(
        'token',
        res.data.token
      );

      alert('Login Successful');

      navigate('/dashboard');

    } catch (error) {

      alert('Invalid Credentials');

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Login
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );

}

export default Login;