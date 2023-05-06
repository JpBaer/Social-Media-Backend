## MongoDB Social Media Backend

## Description

This project utilizes MongoDB's mongoose and NodeJS's Express to create the api and database for a social media platform.  The api allows for users to be added, updated, removed, and retrieved from the database.  These users all have a friends list that connects them to other users and can generate thoughts (posts) which other users can then react to.  These thoughts can be created, updated, retrieved, and deleted.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Demonstration

The following link shows a walkthrough testing all of the API routes using Insomnia. (https://drive.google.com/file/d/1cHDBVHKltqC98pP5NmRYYMMToWrzasMc/view)

## Getting Started

To recreate be sure to have MongoDB installed on your machine. Follow the [MongoDB installation guide on The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb) to install MongoDB locally.

First run npm install and then npm start to start the server.