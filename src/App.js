import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post/Post";
import { auth } from "./firebase/firebase";
import axios from "axios";
import axiosRetry from "axios-retry";
import { Button, TextField, Tooltip } from "@material-ui/core";
import ModalContainer from "./components/ModalContainer/ModalContainer";
import Loader from "react-loader-spinner";
import InfoIcon from "@material-ui/icons/Info";
import { withStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#0095f6'
        }
    }
});

function App() {
    const [posts, setPosts] = useState([]);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogIn, setOpenLogIn] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [postUrl, setPostUrl] = useState("");
    const [user, setUser] = useState(null);

    const [showLoader, setShowLoader] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // will retry the GET request up to 3 times if there is an internal server error
    axiosRetry(axios, {
        retries: 3,
        retryCondition: (error) => error.response.status === 500,
    });

    // we set a listener on the user object
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe()
    }, [user]);

    // we do a search at the when the page loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => search(), []);

    // this function fetches
    const search = (event) => {
        if (event) event.preventDefault();

        // if dates are not correctly selected, we will choose 20 random pictures
        let queryString = "count=3";
        if (startDate) {
            // if a correct start date is chosen, we add the start_date query string instead
            queryString = `start_date=${startDate}`;
            if (endDate) {
                // if a correct end date is chosen, we also add the end_date query string
                queryString = queryString.concat(`&end_date=${endDate}`);
            }
        }

        setShowLoader(true);
        axios
            .get(
                `https://api.nasa.gov/planetary/apod?api_key=ESNnOstvfNx2gncbFYQtbjIZDCaLKqbg5PM0Xo83&${queryString}`
            )
            .then((response) => {
                setShowLoader(false);
                setPosts(response.data);
            })
            .catch((error) => {
                alert("API call failed after 3 retry attempts. Please try again.");
                console.error(error);
                setShowLoader(false);
            });
    };

    // function that handles the sign up
    const signUp = (event, email, password) => {
        event.preventDefault();

        // we create the user with firebase
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => setOpenSignUp(false))
            .catch((error) => alert(error.message));
    };

    // function that handles the log in
    const logIn = (event, email, password) => {
        event.preventDefault();

        // we log in the user with firebase
        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: email,
                });
                setOpenLogIn(false);
            })
            .catch((error) => alert(error.message));
    };

    // function that copies the post url to the clipboard
    const copyToClipboard = (event) => {
        event.preventDefault();

        // we copy the url to the clipboard and close the modal
        navigator.clipboard.writeText(postUrl);
        setOpenShare(false);
    };

    // handy function to get the correct date format of today's
    // date for the date selectors
    const getTodayString = () => {
        return new Date().toISOString().slice(0, 10);
    };

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
            backgroundColor: "#f5f5f9",
            color: "rgba(0, 0, 0, 0.87)",
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(16),
            border: "1px solid #dadde9",
            textAlign: "justify",
        },
    }))(Tooltip);

    return (
        <div className="app">
            <ModalContainer
                open={openSignUp}
                setOpen={setOpenSignUp}
                onClick={signUp}
                buttonText="Sign Up"
                theme={theme}
            />

            <ModalContainer
                open={openLogIn}
                setOpen={setOpenLogIn}
                onClick={logIn}
                buttonText="Log In"
                setOpenSignUp={setOpenSignUp}
                theme={theme}
            />

            <ModalContainer
                open={openShare}
                setOpen={setOpenShare}
                onClick={copyToClipboard}
                buttonText="Copy to clipboard"
                postUrl={postUrl}
                theme={theme}
            />

            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="/logo.png"
                    alt="spacetagram logo"
                    data-testid="logo"
                />

                {user ? (
                    <ThemeProvider theme={theme}>
                        <Button onClick={() => auth.signOut()} variant="contained" color="primary">Logout</Button>
                    </ThemeProvider>
                ) : (
                    <div className="app__authButtons">
                        <ThemeProvider theme={theme}>
                            <Button onClick={() => setOpenLogIn(true)} variant="contained" color="primary">
                                Log In
                            </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Button onClick={() => setOpenSignUp(true)} variant="contained" color="primary">
                                Sign Up
                            </Button>
                        </ThemeProvider>
                    </div>
                )}
            </div>

            <form className="app__search" noValidate>
                <div className="app__dateTitle">
                    <HtmlTooltip title="If no dates are selected, 3 random posts will be shown. If only a start date is selected, the end date will by default be today's date.">
                        <InfoIcon className="app__infoIcon" aria-label="info" />
                    </HtmlTooltip>
                    <p>
                        <strong>Select dates for search (optional):</strong>
                    </p>
                </div>
                <TextField
                    id="start-date"
                    data-testid="startDate"
                    label="Start date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: { max: getTodayString() },
                    }}
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                />
                <TextField
                    id="end-date"
                    data-testid="endDate"
                    label="End date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        inputProps: { min: startDate, max: getTodayString() },
                    }}
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    disabled={!startDate}
                />
                <ThemeProvider theme={theme}>
                    <Button type="submit" onClick={(event) => search(event)} variant="contained" color="primary">
                        Search
                    </Button>
                </ThemeProvider>
            </form>

            <div className="app__posts">
                <Loader
                    type="Circles"
                    color="#0095f6"
                    height={200}
                    width={200}
                    visible={showLoader}
                    className="app__loader"
                />

                {!showLoader &&
                    posts.map((post, idx) => (
                        <Post
                            key={idx}
                            idx={idx}
                            user={user}
                            setOpenLogIn={setOpenLogIn}
                            setOpenShare={setOpenShare}
                            setPostUrl={setPostUrl}
                            {...post}
                        />
                    ))}
            </div>
        </div>
    );
}

export default App;
