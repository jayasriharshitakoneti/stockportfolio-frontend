import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateKYCForm = () => {
  const [userId, setUserId] = useState("");
  const [kycDone, setKycDone] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await axios.post("http://localhost:8080/admin/update-kyc", {
        user_id: userId,
        is_kyc_done: kycDone,
      });
      alert("KYC status updated!");
      navigate("/admin");
    } catch (err) {
      alert("Error: " + err.response?.data?.error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Update User KYC Status</h2>
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />
      <label>
        <input
          type="checkbox"
          checked={kycDone}
          onChange={(e) => setKycDone(e.target.checked)}
        />
        &nbsp; KYC Completed
      </label>
      <br />
      <button
        onClick={submit}
        style={{ marginTop: "15px", padding: "10px 20px" }}
      >
        Update KYC
      </button>
    </div>
  );
};

export default UpdateKYCForm;
