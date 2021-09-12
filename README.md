# Spacestagram
Image-sharing application created as part of the application process for the Shopify Front End Developer Intern Challenge (Winter 2022). It uses ReactJS (Hooks), Axios to perform the GET request to NASA's API, and Firebase for user authentication, deployment and hosting.

**[Click here to view the deployed version](https://adamkayal-spacestagram.web.app/)**

## How to run the app locally
1. Download this repository to your local machine
````shell
git clone https://github.com/adamkayal/spacestagram.git
````
2. Install the dependencies
````shell
npm install
````
3. Run the app in the development mode
````shell
npm start
````
4. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## How to run the test suites
In the project directory, run the command
````shell
npm test
````


## Features
* Users can sign up and log in to their account.
![Signing up](/readme-assets/signUp.gif)

* Animation when the user likes a post
  * A like is fired if the like button is clicked on or if the user double clicks on the picture.
  * If the user is not logged in, he is prompted to do so.
![Liking a post](/readme-assets/like.gif)

* Loading state while we wait for NASA’s API to return data
![Loading state](/readme-assets/loading.gif)

* Shareable link for each image
![Sharing](/readme-assets/share.gif)

* Date pickers to be able to choose photos from specific start and end dates
![Date pickers](/readme-assets/datePickers.gif)

* Possibility to comment on posts
  * If the user is not logged in, he is prompted to do so.
![Commenting on a post](/readme-assets/comment.gif)
