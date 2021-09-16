import { Button, Input, Modal, Fade } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ModalContainer.css";
import { validate } from 'email-validator';
import { ThemeProvider } from "@material-ui/core/styles";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function ModalContainer({
    open,
    setOpen,
    onClick,
    buttonText,
    postUrl,
    setOpenSignUp,
    theme
}) {
    ModalContainer.propTypes = {
        open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired,
        onClick: PropTypes.any.isRequired,
        buttonText: PropTypes.string.isRequired,
        postUrl: PropTypes.string,
        setOpenSignUp: PropTypes.func,
        theme: PropTypes.object.isRequired
    };

    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const description = buttonText === "Copy to clipboard"
        ? "Copy the post link to share it"
        : "Log in or sign up to like and comment on posts";

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby={buttonText}
            aria-describedby={description}
            data-testid="modal"
        >
            <Fade in={open}>
                <form style={modalStyle} className="modalContainer__paper">
                    {buttonText !== "Copy to clipboard" && (
                        <div className="modalContainer__message">
                            Log in or sign up to like and comment on posts
                        </div>
                    )}
                    <div className="modalContainer__signup">
                        <center>
                            <img
                                className="modalContainer__headerImage"
                                src="/logo.png"
                                alt="spacetagram logo"
                                data-testid="logo"
                            />
                        </center>

                        {buttonText === "Copy to clipboard" ? (
                            <Input
                                type="text"
                                value={postUrl}
                                disabled
                                data-testid="copyInput"
                            />
                        ) : (
                            <div className="modalContainer__signup">
                                <Input
                                    type="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                    error={!validate(email)}
                                    required
                                    data-testid="emailInput"
                                />
                                <Input
                                    type="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={password.length < 6}
                                    required
                                    data-testid="passwordInput"
                                />
                            </div>
                        )}

                        <ThemeProvider theme={theme}>
                            <Button
                                className="modalContainer__button"
                                type={
                                    buttonText !== "Copy to clipboard" ? "submit" : null
                                }
                                disabled={buttonText !== "Copy to clipboard" && (!validate(email) || password.length < 6)}
                                onClick={(event) => onClick(event, email, password)}
                                variant="contained"
                                color="primary"
                            >
                                {buttonText}
                            </Button>
                        </ThemeProvider>

                        {buttonText === "Log In" && (
                            <div
                                className="modalContainer__signUpOfferText"
                                data-testid="signUpOffer"
                            >
                                Don't have an account?
                                <button
                                    className="modalContainer__buttonLink"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setOpen(false);
                                        setOpenSignUp(true);
                                    }}
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </Fade>
        </Modal>
    );
}

export default ModalContainer;
