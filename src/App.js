import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post/Post";
import { auth } from "./firebase/firebase";
import axios from "axios";
import { Button, Grid, TextField } from "@material-ui/core";
import ModalContainer from "./components/ModalContainer/ModalContainer";
import Loader from "react-loader-spinner";

function App() {
    const [posts, setPosts] = useState([]);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [postUrl, setPostUrl] = useState("");
    const [user, setUser] = useState(null);

    const [showLoader, setShowLoader] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

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

    // We do a search at the when the page loads
    useEffect(() => search(), []);

    const search = () => {
        setShowLoader(true);
        axios
            .get(
                "https://api.nasa.gov/planetary/apod?api_key=ESNnOstvfNx2gncbFYQtbjIZDCaLKqbg5PM0Xo83&thumbs=True&count=50"
            )
            .then((response) => {
                setShowLoader(false);
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error("There was an error!", error));
    };

    const signUp = (event, email, password) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).catch((error) =>
            alert(error.message)
        );

        setOpenSignUp(false);
    };

    const signIn = (event, email, password) => {
        event.preventDefault();

        console.log({ event }, { email }, { password });

        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) =>
                authUser.user.updateProfile({
                    displayName: email,
                })
            )
            .catch((error) => alert(error.message));

        setOpenSignIn(false);
    };

    return (
        <div className="app">
            <ModalContainer
                open={openSignUp}
                setOpen={setOpenSignUp}
                onClick={signUp}
                buttonText="Sign Up"
            />

            <ModalContainer
                open={openSignIn}
                setOpen={setOpenSignIn}
                onClick={signIn}
                buttonText="Sign In"
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
                    <Button onClick={() => auth.signOut()}>Logout</Button>
                ) : (
                    <div className="app__loginContainer">
                        <Button onClick={() => setOpenSignIn(true)}>
                            Sign In
                        </Button>
                        <Button onClick={() => setOpenSignUp(true)}>
                            Sign Up
                        </Button>
                    </div>
                )}
            </div>

            <form className="app__search" noValidate>
                <h4 className="app__dateTitle">Select dates for search:</h4>
                <TextField
                    id="start-date"
                    label="Start date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="end-date"
                    label="End date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" onClick={search}>
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

                {posts.map((post, idx) => (
                    <Post
                        key={idx}
                        idx={idx}
                        isSignedIn={!!user}
                        setOpenSignIn={setOpenSignIn}
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
