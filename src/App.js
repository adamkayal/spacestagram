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
import { withStyles } from "@material-ui/core/styles";

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

    // will retry the GET request up to 3 times if something goes wrong
    axiosRetry(axios, { retries: 3 });

    // we set a listener on the user object
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [user]);

    // we do a search at the when the page loads
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => search(), []);

    // this function fetches 
    const search = (event) => {
        if (event) event.preventDefault();

        // if dates are not correctly selected, we will choose 20 random pictures
        let queryString = "count=20";
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
                `https://api.nasa.gov/planetary/apod?api_key=ESNnOstvfNx2gncbFYQtbjIZDCaLKqbg5PM0Xo83&thumbs=True&${queryString}`
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

    const signUp = (event, email, password) => {
        event.preventDefault();

        // we sign up the user with firebase
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => setOpenSignUp(false))
            .catch((error) => alert(error.message));
    };

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
            />

            <ModalContainer
                open={openLogIn}
                setOpen={setOpenLogIn}
                onClick={logIn}
                buttonText="Log In"
                setOpenSignUp={setOpenSignUp}
            />

            <ModalContainer
                open={openShare}
                setOpen={setOpenShare}
                onClick={() => navigator.clipboard.writeText(postUrl)}
                buttonText="Copy to clipboard"
                postUrl={postUrl}
            />

            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="/logo.png"
                    alt="spacetagram logo"
                />

                {user ? (
                    <div>
                        <Button onClick={() => auth.signOut()}>Logout</Button>
                    </div>
                ) : (
                    <div className="app__authButtons">
                        <Button onClick={() => setOpenLogIn(true)}>
                            Log In
                        </Button>
                        <Button onClick={() => setOpenSignUp(true)}>
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>

            <form className="app__search" noValidate>
                <div className="app__dateTitle">
                    <HtmlTooltip title="If no dates are selected, 20 random posts will be shown. If only a start date is selected, the end date will by default be today's date.">
                        <InfoIcon className="app__infoIcon" aria-label="info" />
                    </HtmlTooltip>
                    <p>
                        <strong>Select dates for search (optional):</strong>
                    </p>
                </div>
                <TextField
                    id="start-date"
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
                <Button type="submit" onClick={(event) => search(event)}>
                    Search
                </Button>
            </form>

            <div className="app__posts">
                <Loader
                    type="Circles"
                    color="#00BFFF"
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
