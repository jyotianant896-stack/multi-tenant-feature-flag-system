import React, { useEffect, useState } from 'react';

import axios from 'axios';


function SuperAdminDashboard() {

    const [organizations, setOrganizations] = useState([]);

    const [name, setName] = useState('');


    useEffect(() => {

        fetchOrganizations();

    }, []);


    const fetchOrganizations = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/api/organizations'
            );

            setOrganizations(response.data);

        } catch (error) {

            console.log(error);

            alert('Error fetching organizations');

        }

    };


    const createOrganization = async () => {

        try {

            await axios.post(
                'http://localhost:3000/api/organizations',
                { name }
            );

            alert('Organization Created');

            setName('');

            fetchOrganizations();

        } catch (error) {

            console.log(error);

            alert('Error creating organization');

        }

    };


    return (

        <div className="container mt-5">

            <h2 className="mb-4 fw-bold">
                Super Admin Dashboard
            </h2>


            <div className="card p-4 shadow border-0 mb-4">

                <h4 className="mb-3">
                    Create Organization
                </h4>


                <div className="row">

                    <div className="col-md-8">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Organization Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    <div className="col-md-4">

                        <button
                            className="btn btn-primary w-100"
                            onClick={createOrganization}
                        >
                            Create
                        </button>

                    </div>

                </div>

            </div>


            <div className="card p-4 shadow border-0">

                <h4 className="mb-3">
                    Organization List
                </h4>


                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>
                            <th>ID</th>
                            <th>Organization Name</th>
                        </tr>

                    </thead>


                    <tbody>

                        {
                            organizations.map((org) => (

                                <tr key={org.id}>

                                    <td>{org.id}</td>

                                    <td>{org.name}</td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default SuperAdminDashboard;