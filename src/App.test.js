import React from "react";
import App from "./App";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
    const component = render(<App />);
    getByTestId = component.getByTestId;
});

test("Testing if the logo is rendered", () => {
    const logo = getByTestId("logo");

    expect(logo).toBeInTheDocument();
    expect(logo.src).toBe("http://localhost/logo.png");
});

test("Testing if the end date selector is disabled", () => {
    const endDate = getByTestId("endDate");

    expect(endDate.lastChild.firstChild.disabled).toBe(true);
});

test("Testing if the max of the start and end date selectors is today's date", () => {
    const startDate = getByTestId("startDate");
    const endDate = getByTestId("endDate");

    const todayDateString = new Date().toISOString().slice(0, 10);

    expect(startDate.lastChild.firstChild.max).toBe(todayDateString);
    expect(endDate.lastChild.firstChild.max).toBe(todayDateString);
});

test("Testing if the min of the end date selector is the start date", () => {
    const startDate = getByTestId("startDate");
    const endDate = getByTestId("endDate");

    fireEvent.change(startDate.lastChild.firstChild, {
        target: {
            value: "2021-05-04",
        },
    });
    expect(endDate.lastChild.firstChild.min).toBe("2021-05-04");
});
