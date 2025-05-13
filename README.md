# Natours Application

A tour booking application built with Node.js, Express, and MongoDB.

## Application Features

- User authentication and authorization
- Tour booking with payment processing
- User reviews and ratings
- Tour search and filtering
- Email notifications

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Template Engine**: Pug
- **CSS**: Custom CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker and Docker Compose
- **Payment Processing**: Stripe API


## Development Setup

For local development without Docker:

### Prerequisites

- Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
PORT=3000
MONGODB_LOCAL_URL=localhost:27017/natours
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_FROM=youremail@example.com
GMAIL_USERNAME=your_gmail_username@gmail.com
GMAIL_PASSWORD=your_gmail_app_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Install dependencies

   ```bash
   npm install
   ```

### Start the development server
   ```bash
   npm run dev
   ```


## Docker Setup

This application is fully containerized for production environment.

### Prerequisites

- Docker and Docker Compose installed on your system
- Create a `docker.env` file in the root directory with the following variables:

```
NODE_ENV=production
PORT=3000
MONGODB_LOCAL_URL=mongodb://mongo:27017/natours
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_FROM=youremail@example.com
GMAIL_USERNAME=your_gmail_username@gmail.com
GMAIL_PASSWORD=your_gmail_app_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Production Environment

Run the application in production mode:

```bash
docker compose up -d
```

This will start both the Node.js application and MongoDB database in detached mode.


### Data Import

To import sample data into MongoDB:

```bash
docker exec -it natours-app-1 node ./dev-data/data/import-dev-data.js --import
```

To delete all data:

```bash
docker exec -it natours-app-1 node ./dev-data/data/import-dev-data.js --delete
```



### DockerHub Integration

The Docker image for this application is available on DockerHub. You can pull it directly:

```bash
docker pull husseinsaad1/natours:latest
```


### Docker Compose Architecture

The application is orchestrated using Docker Compose and consists of:

1. **Node.js Application (app)**:

   - Uses pre-built image `husseinsaad1/natours:latest`
   - Connected to MongoDB
   - Exposed on port 3000

2. **MongoDB Database (mongo)**:
   - Uses official MongoDB 5.0 image
   - Persistent data storage via Docker volumes
   - Exposed on port 27018 (mapped from 27017)

### Docker Commands

- Start the services: `docker-compose up -d`
- Stop the services: `docker-compose down`
- View logs: `docker-compose logs -f app`


## Security Best Practices

The Docker setup follows security best practices:

- Non-root user for Node.js application
- No exposed database credentials
- Production dependencies only in final image
- Multi-stage build to minimize image size
- Lightweight Alpine base image
