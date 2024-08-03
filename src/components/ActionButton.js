import React from "react";
import { Button } from "react-bootstrap";

// Component for rendering an action button
const ActionButton = ({ onClick, children }) => {
  return (
    <Button variant="primary" onClick={onClick} className="m-2">
      {children} {/* Render button label */}
    </Button>
  );
};

export default ActionButton;
