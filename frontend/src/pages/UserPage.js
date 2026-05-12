import { useState } from "react";

import API from "../services/api";


function UserPage() {

  const [featureName, setFeatureName] = useState("");

  const [message, setMessage] = useState("");


  const checkFeature = async () => {

    try {

      const res = await API.get('/features');

      const feature = res.data.find(

        (item) =>

          item.feature_name.toLowerCase() ===
          featureName.toLowerCase()

      );

      if (!feature) {

        setMessage("Feature Not Found");

      }

      else if (feature.status === 1) {

        setMessage("Feature is ENABLED");

      }

      else {

        setMessage("Feature is DISABLED");

      }

    }

    catch (error) {

      console.log(error);

      setMessage("Error Checking Feature");

    }

  };


  return (

    <div className="container mt-5">

      <div className="card shadow border-0 p-5">

        <h2 className="mb-4">
          User Feature Check
        </h2>


        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Feature Name"
          value={featureName}
          onChange={(e) =>
            setFeatureName(e.target.value)
          }
        />


        <button
          className="btn btn-primary"
          onClick={checkFeature}
        >
          Check Feature
        </button>


        {
          message && (

            <div className="alert alert-info mt-4">

              {message}

            </div>

          )
        }

      </div>

    </div>

  );

}

export default UserPage;