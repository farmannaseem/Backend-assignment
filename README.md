# Resume Analysis Backend

This is a Node.js backend application for a fictional resume analysis app. It uses Express.js for building RESTful APIs, MongoDB for data storage, and integrates with the Google Gemini API for language model processing.

## Features

- **Authentication API:** Authenticate users using JWT.
- **Resume Data Enrichment API:** Extract and store resume data using LLM processing.
- **Resume Search API:** Search for resume information in the database.

## Technologies Used

- **Node.js & Express.js:** For building the backend server.
- **MongoDB:** As a non-relational database for storing resume data.
- **Google Gemini API:** For language model processing.
- **JWT:** For user authentication.
- **Bcrypt.js:** For encrypting sensitive data.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running locally or on the cloud.
- Google Gemini API key.

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd resume-analysis-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```plaintext
   MONGODB_URI=mongodb://localhost:27017/backend
   JWT_SECRET=<your_jwt_secret>
   GEMINI_API_KEY=<your_gemini_api_key>
   ```

4. **Run the application:**

   ```bash
   node app.js
   ```

   Or, if you have `nodemon` installed:

   ```bash
   nodemon app.js
   ```

### API Endpoints

- **POST /api/auth/login:** Authenticate user and return JWT.
- **POST /api/resume/enrich:** Enrich resume data and store it in the database.
- **POST /api/search:** Search for resumes by name.

### Deployment

- Ensure all environment variables are set in the deployment environment.
- Deploy the application on a cloud platform like Vercel, Render, or Railway.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or issues, please contact [Your Name] at [Your Email].
