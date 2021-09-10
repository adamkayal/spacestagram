import { Button, Input, makeStyles, Modal } from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ModalContainer({ open, setOpen, onClick, buttonText, postUrl }) {
    ModalContainer.propTypes = {
        open: PropTypes.bool,
        setOpen: PropTypes.func,
        onClick: PropTypes.any,
        buttonText: PropTypes.string,
        postUrl: PropTypes.string,
    };

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <div className="app__signup">
                    <center>
                        <img
                            className="app__headerImage"
                            src="/logo.png"
                            alt="spacetagram logo"
                        />
                    </center>
                    {buttonText === "Copy to clipboard" ? (
                        <Input type="text" value={postUrl} disabled/>
                    ) : (
                        <form>
                            <Input
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </form>
                    )}
                    <Button
                        type={(buttonText !== "Copy to clipboard") ? "submit" : null}
                        onClick={(event) => onClick(event, email, password)}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalContainer;
