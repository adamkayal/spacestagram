import React, { useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import "./Post.css";

function Post({
    idx,
    copyright = "NASA",
    date,
    explanation,
    hdurl,
    thumbnail_url,
    url,
    title,
    isSignedIn,
    setOpenSignIn,
    setOpenShare,
    setPostUrl,
    isLiked,
}) {
    Post.propTypes = {
        idx: PropTypes.number,
        copyright: PropTypes.string,
        date: PropTypes.string,
        explanation: PropTypes.string,
        thumbnail_url: PropTypes.string,
        hdurl: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string,
        isSignedIn: PropTypes.bool,
        setOpenSignIn: PropTypes.func,
        setOpenShare: PropTypes.func,
        setPostUrl: PropTypes.func,
        isLiked: PropTypes.bool,
    };

    const formattedDate = new Date(date).toDateString();

    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);

    const addLike = () => {
        if (isSignedIn) {
            if (liked) {
                setLiked(false);
                // remove like from db
                // make unheart animation
                // that should change the heart color from update
            } else if (!liked) {
                setLiked(true);
                // add like to db
                // make heart animation
                // that should change the heart color from update
            }
            $(`#overlay${idx}`).fadeIn(400, function () {
                $(`#overlay${idx}`).fadeOut(400);
            });
        } else {
            setOpenSignIn(true);
        }
    };

    const addComment = () => {
        if (isSignedIn) {
            alert("added comment !");
            // add comment to db
        } else {
            setOpenSignIn(true);
        }
    };

    const share = () => {
        setOpenShare(true);
        setPostUrl(thumbnail_url || hdurl || url);
    };

    return (
        <div className="post">
            <div className="post__title">
                <h3>{title}</h3>
            </div>

            <div className="post__imageContainer">
                <img
                    className="post__image"
                    src={
                        thumbnail_url ||
                        hdurl ||
                        url ||
                        "/no_image_available.jpg"
                    }
                    alt={title}
                    title={title}
                    onDoubleClick={addLike}
                />

                <img
                    id={`overlay${idx}`}
                    className="post__imageOverlay"
                    src={"/heart_icon.png"}
                    alt=""
                />
            </div>

            <div className="post__tools">
                <img
                    className="post__icon"
                    src={
                        liked
                            ? "/heart_icon_liked.png"
                            : "/heart_icon_unliked.png"
                    }
                    alt="Like"
                    title="Like"
                    onClick={addLike}
                />
                <img
                    className="post__icon"
                    src="/comment_icon.png"
                    alt="Comment"
                    title="Comment"
                    onClick={addComment}
                />
                <img
                    className="post__icon"
                    src="/share_icon.png"
                    alt="Share"
                    title="Share"
                    onClick={share}
                />
            </div>

            <h4 className="post__text">
                <strong>{copyright}</strong>: {explanation}
            </h4>
            <p className="post__date">{formattedDate}</p>
        </div>
    );
}

export default Post;
