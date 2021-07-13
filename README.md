# Chat App

This is a little app to demonstrate the subscription of GraphQL.

## More Information

[Project introduction on my website](https://cyishere.dev/portfolio/chat-app)

## Teck Stack

**Backend:**

- Apollo Server / GraphQL
- Prisma
- PostgreSQL

**Frontend:**

- React
- Apollo Client
- TailwindCSS

## Features

- User register / login / logout.
- Make conversation with other users.
- Receive messages in real-time.

## Lessons Learned

I've learned these four major features below by making this project, please read [my article](https://cyishere.dev/portfolio/digikit) for more details about these.

- Error handling
- Logic of auth
- Logic of Shopping Cart (with Redux)
- Protection of routes

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - The url of your PostgreSQL.

`APP_SECRET` - The app's secret for jwt token.

## Run Locally

Clone the project

```bash
  git clone https://github.com/cyishere/chat-app
```

Go to the project directory

```bash
  cd chat-app
```

Install dependencies

```bash
  yarn install

  cd client
  yarn install
```

Start the server

```bash
  yarn dev

  cd client
  yarn start
```

## Screenshots

![ChatApp Screenshot](https://www.cyishere.dev/img/portfolio/chat-app/chat-app-cover_l.jpg)

Create this file on [readme.so](https://readme.so/).
