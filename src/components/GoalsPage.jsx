import React, { useEffect, useState } from "react";
import { Button, Modal, Card, ListGroup, Container } from "react-bootstrap";
import axios from "axios";
import AddGoalForm from "./forms/AddGoalForm";
import EditableGoalCard from "./EditableGoalCard";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/user/dashboard",
          {
            params: { userId },
          }
        );
        setGoals(response.data.goals);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, [userId, goals]);

  const handleGoalAdded = () => {
    setShowModal(false);
    // Optionally, refetch goals to include the new goal
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Investment Goals</h1>
      <ListGroup>
        {goals.map((goal) => (
          <EditableGoalCard key={goal.goal_id} goal={goal} />
        ))}
      </ListGroup>
      <Button
        variant="success"
        className="mt-3"
        onClick={() => setShowModal(true)}
      >
        Add Goal
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Investment Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddGoalForm onGoalAdded={handleGoalAdded} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GoalsPage;
