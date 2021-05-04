import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="light-blue darken-4">
        <div className="container">
          <Link className="brand-logo" to="/">
            Urban Music
          </Link>
          <Link
            className="login"
            to="/login"
            style={{
              marginLeft: "220px",
            }}
          >
            Login
          </Link>
          <Link
            className="allsongs"
            to="/all"
            style={{
              marginLeft: "20px",
            }}
          >
            All
          </Link>
          <Link
            className="prueba"
            to="/prueba"
            style={{
              marginLeft: "20px",
            }}
          >
            Prueba
          </Link>
        </div>
      </nav>
    );
  }
}
