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
    user,
    setOpenLogIn,
    setOpenShare,
    setPostUrl,
}) {
    Post.propTypes = {
        idx: PropTypes.number.isRequired,
        copyright: PropTypes.string,
        date: PropTypes.string.isRequired,
        explanation: PropTypes.string.isRequired,
        thumbnail_url: PropTypes.string,
        hdurl: PropTypes.string,
        url: PropTypes.string,
        title: PropTypes.string.isRequired,
        user: PropTypes.any,
        setOpenLogIn: PropTypes.func.isRequired,
        setOpenShare: PropTypes.func.isRequired,
        setPostUrl: PropTypes.func.isRequired,
    };

    const formattedDate = new Date(date).toDateString();

    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const addLike = () => {
        if (user) {
            // if the user is logged in
            // we toggle the like state
            setLiked(!liked);

            // heart animation
            $(`#overlay_${idx}`).fadeIn(400, function () {
                $(`#overlay_${idx}`).fadeOut(400);
            });
        } else {
            // if the user is not logged in, we prompt him to log in 
            setOpenLogIn(true);
        }
    };

    const share = () => {
        setPostUrl(thumbnail_url || hdurl || url);
        setOpenShare(true);
    };

    const focusComment = () => {
        if (user) {
            // if the user is logged in, we focus the comment input
            document.getElementById(`input_${idx}`).focus();
        } else {
            // if the user is not logged in, we prompt him to log in 
            setOpenLogIn(true);
        }
    };

    const postComment = (event) => {
        event.preventDefault();

        if (user) {
            // if the user is logged in, we add the new comment
            setComments([
                ...comments,
                {
                    email: user.displayName,
                    text: comment,
                },
            ]);

            // and clear the comment input
            setComment("");
        } else {
            // if the user is not logged in, we prompt him to log in 
            setOpenLogIn(true);
        }
    };

    return (
        <div className="post">
            <p className="post__title">{title}</p>

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
                    id={`overlay_${idx}`}
                    className="post__imageOverlay"
                    src={"/heart_icon.png"}
                    alt=""
                />
            </div>

            <div className="post__tools">
                <img
                    className="post__icon"
                    src={
                        liked && user
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
                    onClick={focusComment}
                />
                <img
                    className="post__icon"
                    src="/share_icon.png"
                    alt="Share"
                    title="Share"
                    onClick={share}
                />
            </div>

            <p className="post__text">
                <strong>{copyright}</strong>: {explanation}
            </p>
            <p className="post__date">{formattedDate}</p>

            <div>
                {comments.map((comment, idx) => (
                    <p key={`comment_${idx}`} className="post__comment">
                        <strong>{comment.email}</strong> {comment.text}
                    </p>
                ))}
            </div>

            <form className="post__commentBox">
                <input
                    id={`input_${idx}`}
                    className="post__input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="post__button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default Post;
