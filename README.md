# Northcoders News Frontend Project

Welcome!

This portfolio project was created in Week 10 of a Software Development in JavaScript Skills Bootcamp, provided by [Northcoders](https://northcoders.com/).

You can view the hosted application here: [Northcoders News](https://northcoders-app.netlify.app/).

The purpose of this project was to demonstrate my understanding of making a C.R.U.D application from a frontend perspective. Northcoders News is intended to be a social news aggregation, web content rating and discussion website. The homepage informs users that they are logged in as *guest*; I hardcoded this username, because user authentication was not the purpose of this task.

Northcoders News has articles which are divided into topics and each article has user-curated ratings from upvotes and downvotes using my backend [API](https://my-nc-news-2zd4.onrender.com/api). Users can also add and delete comments about an article. On the homepage, a 'sort by' bar allows users to change the order in which information is displayed.

I will now provide instructions on how to run this project locally using the CLI:

1. git clone https://github.com/ChrisDobson/nc-news.git
1. cd nc-news
1. npm install
1. npm run dev
1. Open local host

I began work on this repo on 16/12/2024, using Node v22.9.0. It builds on a previous repo, which you can view on [GitHub](https://github.com/ChrisDobson/my-nc-news).

---

Here is a summary of each step in this week-long project:

**TASK 1: CORE: Create a React project and a public repo**

- Create a repo locally
- Create a public repo on GitHub

**TASK 2: CORE: Enable CORS on BE repo**

When making requests to your API from a React app, you will run into a Cross Origin Resource Sharing error. Enable these requests in the backend.

**TASK 3: CORE: Planning**

See the *assets* folder. (Inside *src* folder)

**TASK 4: CORE: View a list of all articles**

Users should be able to: see a list of all articles.

**TASK 5: CORE: View an individual article**

Users should be able to: go to a new page to read an individual article.

**TASK 6: CORE: View a list of comments associated with an article**

Users should be able to: see the comments linked with an individual article alongside it.

**TASK 7: CORE: Vote on an article**

Users should be able to: vote on the article that they are reading.

**TASK 8: CORE: Post a new comment to an existing article**

Users should be able to: add a new comment to the article that they are reading.

**TASK 9: CORE: Delete comments**

Users should be able to: delete their own comments only.

**TASK 10: CORE: View a separate page for each topic with a list of related articles**

Users should be able to: 
- view the different topics
- select a topic to view associated articles.

**TASK 11: CORE: Sort articles**

Users should be able to: sort how the articles are presented to them.

**TASK 12: CORE: Error handling**

Users should be able to see an appropriate error:

- for a non-existent path.
- for a non-existent article.
- for a non-existent topic.
- when posting a new comment if they have not provided all of the required information.

**TASK 13: CORE: Deploy app**

- Setup redirects
- Create a production version of the app
- Install Netlify's CLI
- Deploy to a draft URL
- Deploy to a production URL

**TASK 14: CORE: Write a README**

**TASK 15: ADVANCED: General Styling**

**TASK 16: ADVANCED: Responsiveness**

**TASK 17: ADVANCED: Accessibility**

**TASK 18: ADVANCED: User Experience**