# To-Do List Web Application: Setup Guide

## Download & Setup Instructions

1. **Clone the project:**
    ```bash
    git clone https://github.com/zouazo/to-do-list/
    ```

2. **Create a virtual environment:**
    ```bash
    # Navigate to the project directory
    cd to-do-list

    # Create a virtual environment
    c:/python311/python.exe -m venv env
    ```

3. **Activate the virtual environment:**
    ```bash
    # On Windows
    env\scripts\activate
    ```

4. **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5. **Run the Django server:**
    ```bash
    python manage.py runserver
    ```

## Install React Modules

Before running the React frontend, ensure you have Node.js installed.

1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2. **Install Node.js modules:**
    ```bash
    npm install
    ```

3. **Build the React application:**
    ```bash
    npm run build
    ```

4. **Start the React development server:**
    ```bash
    npm start
    ```

5. **Visit the application in your browser:**
    Open [http://localhost:3000/](http://localhost:3000/) in your web browser.

You're all set! The To-Do List Web Application is now running on your machine. If you encounter any issues during the setup, refer to the project documentation or seek assistance from the project's community. Happy organizing your tasks!

