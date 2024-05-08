# Todo-App
A simple todo app using react and springboot and can create a gist file and save all the todo in gist.


## Features

- Create, read, update, and delete tasks.
- Mark tasks as completed.
- View a list of tasks.

## Technologies Used

- Spring Boot
- React
- Axios for HTTP requests
- MySQL (or your preferred database)

## Backend Setup

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Open the project in your preferred IDE (e.g., IntelliJ IDEA, Eclipse).
4. Configure your database settings in `application.properties`.
5. Run the Spring Boot application (`TodoAppApplication`).

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies with `npm install` or `yarn install`.
3. Start the React development server with `npm start` or `yarn start`.

## API Endpoints

- `GET /api/tasks`: Get all tasks.
- `GET /api/tasks/{id}`: Get task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/{id}`: Update task by ID.
- `DELETE /api/tasks/{id}`: Delete task by ID.

## Usage

- Open the frontend application in your browser.
- Add, edit, and delete tasks as needed.
- Mark tasks as completed by clicking on them.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
