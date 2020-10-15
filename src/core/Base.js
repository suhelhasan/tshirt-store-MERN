import React from "react";
import Menu from "./Menu";

function Base({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-6">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div
          className="container-fluid bg-success text-white text-center"
          style={{
            position: "fixed",
            bottom: "0",
            boxShadow: "0px -7px 60px -18px rgba(0,0,0,0.75)",
          }}
        >
          <p>
            If you got any questions,feel free to reach out!{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/javascript_bug"
              className="text-warning"
            >
              Twitter
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Base;
