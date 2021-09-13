import { Button, Input, Modal } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ModalContainer.css";

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
}) {
    ModalContainer.propTypes = {
        open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired,
        onClick: PropTypes.any.isRequired,
        buttonText: PropTypes.string.isRequired,
        postUrl: PropTypes.string,
        setOpenSignUp: PropTypes.func,
    };

    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            data-testid="modal"
        >
            <form style={modalStyle} className="modalContainer__paper">
                {buttonText === "Log In" && (
                    <div className="modalContainer__message">
                        Log in to like and comment on posts
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
                                data-testid="emailInput"
                            />
                            <Input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                data-testid="passwordInput"
                            />
                        </div>
                    )}

                    <Button
                        className="modalContainer__button"
                        type={
                            buttonText !== "Copy to clipboard" ? "submit" : null
                        }
                        onClick={(event) => onClick(event, email, password)}
                    >
                        {buttonText}
                    </Button>

                    {buttonText === "Log In" && (
                        <div
                            className="modalContainer__signUpOfferText"
                            data-testid="signUpOffer"
                        >
                            Don't have an account?
                            <button
                                className="modalContainer__buttonLink"
                                onClick={() => {
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
        </Modal>
    );
}

export default ModalContainer;
