import { render, screen } from "@testing-library/react";
import App from "./app";

test("renders TRYAM Smart Lead Qualification application", () => {
  render(<App />);

  expect(
    screen.getByText(
      /Smart Lead Qualification/i
    )
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /Run Automated Demo/i
    })
  ).toBeInTheDocument();
});

test("renders all assessment input fields", () => {
  render(<App />);

  expect(
    screen.getByLabelText(/Full Name/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/Work Email/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/Estimated Budget/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/Company Size/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/Project Description/i)
  ).toBeInTheDocument();
});
