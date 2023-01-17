// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import App from "./App";
import { render, screen } from "@testing-library/react";

test("renders the landing page", () => {
  render(<App />);
});
