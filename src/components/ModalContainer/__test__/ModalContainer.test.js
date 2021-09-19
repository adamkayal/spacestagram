import React from "react";
import ModalContainer from "../ModalContainer";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createTheme } from "@material-ui/core/styles";

const requiredProps = {
    open: true,
    setOpen: (param) => param,
    onClick: (param) => param,
    buttonText: "Sign Up",
    isUserForm: true,
    theme: createTheme()
};

test("Testing if the modal is rendered when open prop is true", () => {
    const { getByTestId } = render(<ModalContainer {...requiredProps} />);
    const modal = getByTestId("modal");

    expect(modal).toBeInTheDocument();
});

test("If isUserForm is false, the input should be disabled", () => {
    const { getByTestId } = render(
        <ModalContainer {...requiredProps} isUserForm={false} />
    );
    const copyInput = getByTestId("copyInput");

    expect(copyInput.firstChild.disabled).toBe(true); // .firstChild to select the input inside the Input component
});

test("If isUserForm is true, the inputs should accept values", () => {
    const { getByTestId } = render(<ModalContainer {...requiredProps} />);
    const emailInput = getByTestId("emailInput");
    const passwordInput = getByTestId("passwordInput");

    expect(emailInput.firstChild.disabled).toBe(false);
    expect(passwordInput.firstChild.disabled).toBe(false);

    fireEvent.change(emailInput.firstChild, {
        target: {
            value: "test@mail.ca",
        },
    });
    expect(emailInput.firstChild.value).toBe("test@mail.ca");

    fireEvent.change(passwordInput.firstChild, {
        target: {
            value: "passwordTest",
        },
    });
    expect(passwordInput.firstChild.value).toBe("passwordTest");
});

test("If the button text is 'Log In', we should render the sign up offer div", () => {
    const { getByTestId } = render(
        <ModalContainer {...requiredProps} buttonText="Log In" />
    );
    const signUpOfferDiv = getByTestId("signUpOffer");

    expect(signUpOfferDiv).toBeInTheDocument();
});

test("If the logo appears at the top of the modal", () => {
    const { getByTestId } = render(<ModalContainer {...requiredProps} />);
    const logo = getByTestId("logo");

    expect(logo).toBeInTheDocument();
    expect(logo.src).toBe("http://localhost/logo.png");
});
