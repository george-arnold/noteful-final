import React, { Component } from "react";
// VE css file has className error color:red
import "./ValidationError.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="error">Error Could not display.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
