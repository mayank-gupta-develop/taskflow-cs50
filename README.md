📋 TaskFlow – A Full-Stack Task Management Web Application

Author: Mayank Gupta
Course: CS50x – Harvard University
Final Project: 2026

GitHub Repository:
👉 https://github.com/mayank-gupta-develop/taskflow-cs50

Project Video (YouTube):
👉 https://youtu.be/z7x3JBHx7OU

⸻

📌 Description

TaskFlow is a full-stack, multi-user task management web application built as my final project for CS50x (2026). The application allows users to securely register, log in, and manage their personal tasks with features such as priorities, due dates, completion tracking, productivity analytics, and a modern user interface.

This project represents my transition from being a student curious about technology to someone actively building real, working software. I come from a non-computer science background and am currently pursuing a BBA in Information Technology at St. Joseph’s Degree and PG College, Hyderabad, India. TaskFlow reflects my determination to enter the computer science and software development field.

⸻

🎯 Motivation and Background

I have always been interested in how software products work behind the scenes. While my formal degree is in BBA IT, I wanted to build strong, practical programming fundamentals. To do this, I completed a Full Stack Web Development certification on Udemy, where I learned HTML, CSS, JavaScript, Node.js, and databases.

However, tutorials alone were not enough. I wanted to deeply understand problem-solving, logic, and system design, which led me to CS50x.

CS50 challenged me to:
	•	Think algorithmically
	•	Understand how systems work internally
	•	Build projects from scratch with correctness and clarity

TaskFlow is the result of combining:
	•	CS50’s emphasis on clean design and correctness
	•	My full-stack development skills
	•	My personal need for a productivity tool I would actually use

⸻

✅ What the Application Does

TaskFlow allows each registered user to:
	•	Register and log in securely
	•	Create, view, update, and delete tasks
	•	Assign priorities (low, medium, high)
	•	Set due dates for tasks
	•	Mark tasks as completed or incomplete
	•	Automatically highlight overdue tasks
	•	View productivity analytics based on completed tasks
	•	Access their data securely using session-based authentication

Each user can only access their own tasks, making the application safe and multi-user by design.

⸻

🛠 Technologies Used

Backend
	•	Node.js
	•	Express.js
	•	SQLite (using sqlite3 and sqlite)
	•	express-session for authentication
	•	bcrypt for password hashing

Frontend
	•	EJS (Embedded JavaScript Templates)
	•	Vanilla JavaScript
	•	CSS with custom variables and animations
	•	Chart.js for productivity visualizations

Other Tools
	•	Nodemon for development
	•	Git & GitHub for version control

⸻

📂 File Structure Overview

project/
│
├── app.js                  # Main Express server
├── package.json            # Dependencies and scripts
│
├── db/
│   └── database.db         # SQLite database
│
├── views/
│   ├── index.ejs           # Task dashboard
│   ├── login.ejs           # Login page
│   └── register.ejs        # Registration page
│
├── public/
│   └── css/
│       └── style.css       # Complete site styling


⸻

▶️ How to Run the Project
	1.	Install Node.js (version 18 or later)
	2.	Clone the repository
	3.	Install dependencies: npm install
	4.	Start the server: node app.js (or nodemon app.js during development)
	5.	Open a browser and visit: http://localhost:3000

⸻

🎨 Design Decisions
	•	SQLite was chosen for simplicity and portability, allowing the project to run without external services.
	•	Server-side rendering (EJS) was used instead of a frontend framework to align with CS50’s focus on fundamentals.
	•	Session-based authentication keeps user logic simple and secure.
	•	The UI was designed to look modern but realistic for a student project, avoiding unnecessary over-engineering.
	•	CSS variables and animations were used to ensure consistency and maintainability.

⸻

📊 Productivity Analytics

TaskFlow includes a productivity dashboard that visualizes:
	•	Tasks completed by month
	•	Tasks completed by year

This helps users understand when they are most productive and encourages better time management. Charts are dynamically loaded via an API endpoint and rendered with Chart.js. 
in app.js.
⸻

⚠️ Challenges Faced

Some challenges I encountered include:
	•	Designing secure authentication using sessions
	•	Structuring the database for multi-user access
	•	Preventing users from accessing others’ data
	•	Managing asynchronous database operations
	•	Keeping logic and presentation cleanly separated

Solving these problems significantly improved my understanding of backend development.

⸻

📚 What I Learned

Through this project, I learned:
	•	How full-stack applications are structured
	•	How authentication works in real systems
	•	How databases interact with server logic
	•	How to debug real production-style errors
	•	How to design software with users in mind

Most importantly, I learned that I can build complete, working applications even without a traditional computer science degree.

⸻

🚀 Future Improvements

If I continue developing TaskFlow, I would like to add:
	•	AJAX-based updates (no page reloads)
	•	Email reminders for due tasks
	•	Mobile-first responsive enhancements
	•	Deployment to a public cloud platform

⸻

💭 Final Thoughts

TaskFlow is more than just my CS50 final project; it represents my commitment to entering the field of computer science. Coming from a BBA IT background, completing a full- 
stack certification, and finishing CS50x has given me the confidence and foundation to continue growing as a developer.

This project is something I am genuinely proud of.

⸻

📜 Academic Honesty & Attribution

This project was developed as part of the CS50x Final Project.

The following libraries and tools were used:
	•	Express.js
	•	SQLite
	•	bcrypt
	•	express-session
	•	Chart in JavaScript

AI-based tools (ChatGPT) were used as a learning aid and debugging assistant, as permitted by CS50 for the final project.
All code was reviewed, understood, and adapted by me, the author, Mayank Gupta.

⸻
