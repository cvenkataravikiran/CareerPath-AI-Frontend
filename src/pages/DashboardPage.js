// src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, ProgressBar, ListGroup, Form, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../api/apiClient';
import { FaTrash } from 'react-icons/fa';

const DashboardPage = () => {
  const { user, updateUserPlannerContext } = useAuth(); // Use the new context function
  
  const [planner, setPlanner] = useState(user?.planner || []);
  const [newTask, setNewTask] = useState('');
  const [dailyTip, setDailyTip] = useState('');
  const [loadingTip, setLoadingTip] = useState(true);

  useEffect(() => {
    setPlanner(user?.planner || []);
  }, [user]);
  
  useEffect(() => {
    const fetchTip = async () => {
      setLoadingTip(true);
      try {
        const tipResponse = await apiClient.get('/tips/daily');
        setDailyTip(tipResponse.data.data.daily_tip);
      } catch (err) {
        setDailyTip('Consistency is key. Spending even 15-30 minutes learning every day is more effective than one long session per week.');
      } finally {
        setLoadingTip(false);
      }
    };
    fetchTip();
  }, []);

  const savePlannerToBackend = async (updatedPlanner) => {
    try {
      // Call the API to save the data
      await apiClient.put('/user/planner', updatedPlanner);
      // Then, update the context state
      updateUserPlannerContext(updatedPlanner);
    } catch (error) {
      console.error("Failed to save planner:", error);
      // Optional: Add error feedback for the user
    }
  };

  const handleTaskToggle = (id) => {
    const updatedPlanner = planner.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setPlanner(updatedPlanner);
    savePlannerToBackend(updatedPlanner);
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const newPlannerTask = {
      id: Date.now(),
      task: newTask.trim(),
      completed: false
    };
    const updatedPlanner = [...planner, newPlannerTask];
    setPlanner(updatedPlanner);
    savePlannerToBackend(updatedPlanner);
    setNewTask('');
  };

  const handleDeleteTask = (id) => {
    const updatedPlanner = planner.filter((task) => task.id !== id);
    setPlanner(updatedPlanner);
    savePlannerToBackend(updatedPlanner);
  };

  const completionPercentage = planner.length > 0 ? Math.round((planner.filter(t => t.completed).length / planner.length) * 100) : 0;

  return (
    <>
      <h2 className="mb-4">Welcome back, {user?.name || 'User'}!</h2>
      <Row>
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header as="h5">This Week's Learning Plan</Card.Header>
            <Card.Body className="d-flex flex-column">
              <ListGroup variant="flush" className="planner-list flex-grow-1">
                {planner.length > 0 ? planner.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center px-0">
                    <Form.Check
                      type="checkbox"
                      id={`task-${item.id}`}
                      label={item.task}
                      checked={item.completed}
                      onChange={() => handleTaskToggle(item.id)}
                      className={item.completed ? 'text-muted' : ''}
                    />
                    <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => handleDeleteTask(item.id)}>
                      <FaTrash />
                    </Button>
                  </ListGroup.Item>
                )) : (
                  <div className="text-center text-muted mt-3">Your planner is empty. Add a task to get started!</div>
                )}
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <InputGroup>
                <FormControl
                  placeholder="Add a new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <Button variant="primary" onClick={handleAddTask}>Add</Button>
              </InputGroup>
            </Card.Footer>
          </Card>
        </Col>
        
        <Col lg={5} className="mb-4">
          <Card className="shadow-sm mb-4">
            <Card.Header as="h5">Learning Progress</Card.Header>
            <Card.Body>
              <Card.Text>Overall Path Completion:</Card.Text>
              <ProgressBar
                now={completionPercentage}
                label={`${completionPercentage}%`}
                variant="success"
                animated
              />
              <p className="mt-3 text-muted">Keep up the great work! Consistency is key.</p>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header as="h5">Daily Tip</Card.Header>
            <Card.Body>
              {loadingTip ? (
                <div className="text-center"><Spinner animation="border" size="sm" /></div>
              ) : (
                <Card.Text>
                  "{dailyTip}"
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardPage;