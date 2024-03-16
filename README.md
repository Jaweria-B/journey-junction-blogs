# Daily Journal📝

Welcome to **Journey Junction**, your go-to platform for journaling and blogging! 🌟

## Description ℹ️

**Daily Journal** is a web application built with **Express.js** and **EJS** that allows users to create, read, update, and delete journal entries. It provides a simple and intuitive interface for users to express their thoughts, ideas, and experiences. 🚀

## Project Structure 📁

The project follows a structured approach, with the following main components:

- **Views**: EJS templates for rendering HTML pages.
- **Public**: Static assets such as CSS stylesheets and client-side JavaScript files.
- **Routes**: Express.js route handlers for different HTTP requests. 🛠️

## Technologies Used 💻

- ![Express.js](https://img.shields.io/badge/Express.js-4.x-blue?style=flat-square&logo=express)
- ![EJS](https://img.shields.io/badge/EJS-3.x-19A974?style=flat-square&logo=ejs)
- ![Body Parser](https://img.shields.io/badge/Body_Parser-1.x-3DDC84?style=flat-square&logo=node.js)
- ![Lodash](https://img.shields.io/badge/Lodash-4.x-735CAE?style=flat-square&logo=javascript)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4.x-47A248?style=flat-square&logo=mongodb)

## Pages and Structure 📄

The **Daily Journal** app consists of the following pages:

- **Home Page**: Displays a list of journal entries.
- **About Page**: Provides information about the app and its purpose.
- **Contact Page**: Allows users to get in touch with the app creators.
- **Compose Page**: Enables users to create new journal entries. ✏️

## Routes and Functionality 🛣️

- **GET /**: Renders the home page with a list of journal entries.
- **GET /about**: Renders the about page with information about the app.
- **GET /contact**: Renders the contact page with contact details.
- **GET /compose**: Renders the compose page for creating new entries.
- **POST /compose**: Handles the creation of new journal entries.
- **GET /posts/:postId**: Renders individual journal entries based on the ID.

## Usage 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/Jaweria-B/blog-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   nodemon start
   ```
4. Access the app in your web browser:
   ```
   http://localhost:3000
   ```

That's it! Start journaling and enjoy using **Daily Journal**! 🎉