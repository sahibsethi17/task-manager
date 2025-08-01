# Task Manager

## [DEPLOYED LINK ON VERCEL](https://task-manager-cyan-six.vercel.app/)

This is a full-stack Task Manager app built with the MERN Stack (**MongoDB**, **Express**, **React**, & **Node.js**). Users can add, edit, delete, and track tasks with different statuses. Users can also filter their tasks from their respective statuses and date created.

---

## Features

- Create, update, and delete tasks
- Set task status (To Do / In Progress / Done)
- Sort/filter tasks by status or date
- Responsive UI styled with Tailwind CSS
- Backend connected to MongoDB Atlas
- Deployed with Render (backend) & Vercel (frontend)

---

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Express.js, Node.js, Mongoose
- **Database**: MongoDB Atlas
- **Deployment**: Render (backend) + Vercel (frontend)

---

## Local Machine Setup

### Clone the repo

```bash
git clone https://github.com/sahibsethi17/task-manager.git
cd task-manager
```

---

### Setup the backend

```bash
cd backend
npm install
```

#### Create an `.env` file inside the `/backend` folder with

```bash
MONGO_URI={your-mongodb-atlas-uri}
PORT=5001
```

Then run the backend:

```bash
npm start
```

---

### Setup the frontend

```bash
cd ../frontend
npm install
npm run dev
```

If you are not using localhost for your backend, make sure your `.env` file in `frontend` has the API base URL.

```bash
VITE_API_URL={your-deployed-backend-link}
```

---

## Deployment Instructions

Deploy backend on Render, and frontend on Vercel. Make sure to set your environment variables on both platforms.

---

## Development Process

This project was built to gain and show full-stack development skills with the MERN stack. I started by setting up the backend API using Express and connected it to MongoDB Atlas. Once the endpoints were working, I created the React frontend to call the APIs.

## Key Decisions

I chose MongoDB (the recommended DB) for its flexibility & easy setup, and I used TailwindCSS to keep styling dynamic and consistent throughout, and I used Render for backend deployment and Vercel for frontend deployment because of its easy integration with GitHub.

## Challenges Faced

One of the challenges I ran into was I couldn't connect the frontend to the backend, but after some trial and error, I had realized I was using port 5000, which is often used by AirPlay Receiver or system services on MacOS. I worked around this by simply changing the backend port to 5001.

Another challenge that I had faced was IP whitelisting problems during Render deployment with MongoDB Atlas. My solution to this problem was adding the Render outbound IP address to the list of IP addresses accessible to the database.

Another challenge I faced was using Tailwind to get dark background and responsiveness working correctly. My solution to this was I prompted Generative AI to provide a solution for a dark theme for the application, and it had suggested creating a dark theme in the tailwind.config.js for theme consistency across the whole UI, which I had implemented.

---

## Future Improvements

- JWT authentication for specific users and their own tasks
- Role-based access control
- Due dates and reminders by sending out emails to users' inboxes

---

## THANKS!
