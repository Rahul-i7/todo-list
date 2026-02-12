# Todo List App

A modern, responsive Todo List application built with Next.js and MongoDB.

## Features

-   **Add Tasks**: Create new tasks with a title and assign a priority level.
-   **Manage Tasks**: Mark tasks as complete or incomplete with optimistic UI updates.
-   **Delete Tasks**: Remove tasks from the list efficiently.
-   **Filter & Search**: Filter tasks by status (All, Completed, Incomplete) and search for tasks by title.
-   **Theme Support**: Fully supported Light and Dark modes.
-   **Responsive Design**: Optimized for mobile, tablet, and desktop devices.

## Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/)
-   **Frontend**: React 19, TailwindCSS 4
-   **Database**: MongoDB (with Mongoose)
-   **Icons**: Lucide React
-   **Theming**: Next-themes

## Getting Started

### Prerequisites

-   Node.js installed on your machine.
-   A MongoDB instance (local or MongoDB Atlas).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd todo-list
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory of the project and add your MongoDB connection string:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the application:**

    Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

## Project Structure

-   `app/`: Contains the application source code, including pages and API routes.
-   `components/`: Reusable UI components.
-   `lib/`: Utility functions and database connection logic.
-   `models/`: Mongoose data schemas and models.

## API Endpoints

The application provides the following API routes for task management:

-   `GET /api/tasks`: Fetch all tasks.
-   `POST /api/tasks`: Create a new task.
-   `DELETE /api/tasks/[id]`: Delete a specific task.
-   `PUT /api/tasks/[id]`: Update the completion status of a task.
