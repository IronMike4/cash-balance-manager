import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStateProvider, useGlobalState } from "./globalState";
import ActionButton from "./components/ActionButton";
import "./App.css";

const AppContent = () => {
  // Access global state and dispatch function from context
  const { state, dispatch } = useGlobalState();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Handle input changes, validate input as a number
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      setError("Please enter a valid number.");
    } else {
      setError("");
      setAmount(value);
    }
  };

  // Handle deposit action, validate and dispatch deposit action
  const handleDeposit = () => {
    const value = parseFloat(amount);
    if (value > 0) {
      dispatch({ type: "DEPOSIT", payload: value });
      setAmount("");
    } else {
      setError("Please enter a positive amount.");
    }
  };

  // Handle withdraw action, validate and dispatch withdraw action
  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (value > 0) {
      dispatch({ type: "WITHDRAW", payload: value });
      setAmount("");
    } else {
      setError("Please enter a positive amount.");
    }
  };

  // Handle add interest action
  const handleAddInterest = () => {
    dispatch({ type: "ADD_INTEREST" });
  };

  // Handle charges action
  const handleCharges = () => {
    dispatch({ type: "CHARGES" });
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Cash Balance Manager</h1>
      <h2>Balance: R{state.balance.toFixed(2)}</h2>
      <input
        type="text"
        className="form-control mt-3"
        value={amount}
        onChange={handleInputChange}
        placeholder="Enter amount"
      />
      {error && <div className="text-danger mt-2">{error}</div>}
      <div className="mt-3">
        <ActionButton onClick={handleDeposit}>Deposit</ActionButton>
        <ActionButton onClick={handleWithdraw}>Withdraw</ActionButton>
        <ActionButton onClick={handleAddInterest}>
          Add Interest (5%)
        </ActionButton>
        <ActionButton onClick={handleCharges}>Charges (15%)</ActionButton>
      </div>
    </div>
  );
};

// Wrap AppContent with GlobalStateProvider to provide global state
const App = () => {
  return (
    <GlobalStateProvider>
      <AppContent />
    </GlobalStateProvider>
  );
};

export default App;
