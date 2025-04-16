import React, { useEffect, useState } from "react";
import { Button, Modal, Card, Container } from "react-bootstrap";
import axios from "axios";
import PreferencesForm from "./forms/PreferencesForm";

const PreferencesPage = () => {
  const [preferences, setPreferences] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/user/dashboard",
          {
            params: { userId },
          }
        );
        setPreferences(response.data.preferences);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };
    fetchPreferences();
  }, [userId]);

  const handleUpdate = () => {
    setShowModal(false);
    window.location.reload(); // Refresh the page to reflect changes
    // Optionally, refetch preferences to reflect updates
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">User Preferences</h1>
      {preferences ? (
        <Card>
          <Card.Body>
            <Card.Text>
              <strong>Preferred Sector:</strong> {preferences.preferred_sector}
            </Card.Text>
            <Card.Text>
              <strong>Risk Level:</strong> {preferences.preferred_risk_level}
            </Card.Text>
            <Card.Text>
              <strong>Notifications:</strong>{" "}
              {preferences.notification_enabled ? "Enabled" : "Disabled"}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>No Preferences set.</p>
      )}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Update Preferences
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Preferences</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PreferencesForm current={preferences} onUpdate={handleUpdate} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PreferencesPage;
