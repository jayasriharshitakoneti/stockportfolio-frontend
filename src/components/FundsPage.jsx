import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const FundsPage = () => {
  const [fundsData, setFundsData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "ADD" or "WITHDRAW"
  const [amount, setAmount] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFundsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/user/dashboard",
          {
            params: { userId },
          }
        );
        setFundsData(response.data.userInfo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchFundsData();
  }, [userId]);

  const handleShowModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAmount("");
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/funds/update", {
        user_id: userId,
        amount: parseFloat(amount),
        operation: modalType, // "ADD" or "WITHDRAW"
      });

      alert(
        modalType === "ADD"
          ? "Funds added successfully!"
          : "Funds withdrawn successfully!"
      );

      handleCloseModal();
      // Refresh user data
      const response = await axios.get("http://localhost:8080/user/dashboard", {
        params: { userId },
      });
      setFundsData(response.data.userInfo);
    } catch (error) {
      alert(
        `Failed to ${modalType === "ADD" ? "add" : "withdraw"} funds: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  if (!fundsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="align-items-center mb-4">
        <Card.Body>
          <Card.Title>
            Welcome,{" "}
            <strong>
              {fundsData.firstname} {fundsData.lastname}
            </strong>
          </Card.Title>
          <Card.Text>
            Available Funds:{" "}
            <strong>${parseFloat(fundsData.available_funds).toFixed(2)}</strong>
          </Card.Text>
          <div className="d-flex gap-3">
            <Button variant="success" onClick={() => handleShowModal("ADD")}>
              Add Funds
            </Button>
            <Button
              variant="danger"
              onClick={() => handleShowModal("WITHDRAW")}
            >
              Withdraw Funds
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for Add/Withdraw Funds */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "ADD" ? "Add Funds" : "Withdraw Funds"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAmount">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant={modalType === "ADD" ? "success" : "danger"}
            onClick={handleSubmit}
          >
            {modalType === "ADD" ? "Add Funds" : "Withdraw Funds"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FundsPage;
