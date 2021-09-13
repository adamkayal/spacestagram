import React from "react";
import Post from "../Post";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const requiredProps = {
    idx: 0,
    date: "2020-01-01",
    explanation: "explanation",
    title: "title",
    setOpenLogIn: (param) => param,
    setOpenShare: (param) => param,
    setPostUrl: (param) => param,
};

const testUser = {
    email: "test user",
};

test("Testing if the post image renders if an image url is passed to the component", () => {
    const { getByTestId } = render(
        <Post thumbnail_url="https://apod.nasa.gov/apod/image/0710/sn2005ap_het_big.jpg" />
    );
    const postImage = getByTestId("postImage");

    expect(postImage.src).toBe(
        "https://apod.nasa.gov/apod/image/0710/sn2005ap_het_big.jpg"
    );
});

test("Testing if the unavailable image renders when no image url is passed to the component", () => {
    const { getByTestId } = render(<Post {...requiredProps} />);
    const postImage = getByTestId("postImage");

    expect(postImage.src).toBe("http://localhost/no_image_available.jpg");
});

test("Testing if the post text renders when given a copyright and an explanation", () => {
    const { getByTestId } = render(
        <Post
            {...requiredProps}
            copyright="test copyright"
            explanation="test explanation"
        />
    );
    const postText = getByTestId("postText");

    expect(postText.textContent).toBe("test copyright: test explanation");
});

test("Testing if the default copyright is NASA", () => {
    const { getByTestId } = render(
        <Post {...requiredProps} explanation="test explanation" />
    );
    const postText = getByTestId("postText");

    expect(postText.textContent).toBe("NASA: test explanation");
});

test("Testing if the title renders when given a title", () => {
    const { getByTestId } = render(
        <Post {...requiredProps} title="test title" />
    );
    const title = getByTestId("title");

    expect(title.textContent).toBe("test title");
});

test("Testing the like functionality if the user not logged in", () => {
    const { getByTestId } = render(
        <Post
            {...requiredProps}
            thumbnail_url="https://apod.nasa.gov/apod/image/0710/sn2005ap_het_big.jpg"
        />
    );
    const likeBtn = getByTestId("likeBtn");
    const postImage = getByTestId("postImage");

    expect(likeBtn.src).toBe("http://localhost/heart_icon_unliked.png");

    fireEvent.click(likeBtn);
    expect(likeBtn.src).toBe("http://localhost/heart_icon_unliked.png");

    fireEvent.doubleClick(postImage);
    expect(likeBtn.src).toBe("http://localhost/heart_icon_unliked.png");
});

test("Testing the like functionality if the user is logged in", () => {
    const { getByTestId } = render(
        <Post
            {...requiredProps}
            thumbnail_url="https://apod.nasa.gov/apod/image/0710/sn2005ap_het_big.jpg"
            user={testUser}
        />
    );
    const likeBtn = getByTestId("likeBtn");
    const postImage = getByTestId("postImage");

    // the post is not liked at first
    expect(likeBtn.src).toBe("http://localhost/heart_icon_unliked.png");

    // clicking the like button should like the post
    fireEvent.click(likeBtn);
    expect(likeBtn.src).toBe("http://localhost/heart_icon_liked.png");

    // clicking the like button another time should unlike the post
    fireEvent.click(likeBtn);
    expect(likeBtn.src).toBe("http://localhost/heart_icon_unliked.png");

    // double clicking the post image should like the post
    fireEvent.doubleClick(postImage);
    expect(likeBtn.src).toBe("http://localhost/heart_icon_liked.png");

    // double clicking the post image another time should unlike the post
    fireEvent.doubleClick(postImage);
    expect(likeBtn.src).toBe("http://localhost/heart_icon_unliked.png");
});

test("Testing the comment functionality if the user not logged in", () => {
    const { getByTestId } = render(<Post {...requiredProps} />);
    const commentBtn = getByTestId("commentBtn");
    const commentInput = getByTestId("commentInput");
    const commentPostBtn = getByTestId("commentPostBtn");
    const postComments = getByTestId("postComments");

    // clicking the comment btn should not focus the comment input
    fireEvent.click(commentBtn);
    expect(document.activeElement).toBe(document.body);

    fireEvent.change(commentInput, {
        target: {
            value: "this is a test comment",
        },
    });
    fireEvent.click(commentPostBtn);
    expect(postComments.textContent).toBe("");  // the comment should not be posted
});

test("Testing the comment functionality if the user is logged in", () => {
    const { getByTestId } = render(<Post {...requiredProps} user={testUser} />);
    const commentBtn = getByTestId("commentBtn");
    const commentInput = getByTestId("commentInput");
    const commentPostBtn = getByTestId("commentPostBtn");
    const postComments = getByTestId("postComments");
    
    // clicking the comment btn should focus the comment input
    fireEvent.click(commentBtn);
    expect(document.activeElement).toBe(commentInput);

    fireEvent.change(commentInput, {
        target: {
            value: "this is a test comment",
        },
    });
    fireEvent.click(commentPostBtn);
    expect(postComments.textContent).toBe("test user this is a test comment");  // the user's email and the comment should be posted
});
