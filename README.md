# ShigTok - TikTok Clone

## Setting up the development environment

### Add local env variable
GOOGLE_CLIENT_ID=[your-google-client-id]
GOOGLE_CLIENT_SECRET=[your-google-client-secret]
DATABASE_URL=[your-database-connection-string]

### start a postgresql database for development
docker run -d -p 5432:5432 --name tiktok -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=tiktok postgres

### install dependencies
In the root folder, run `npm i`

### start the development server
run `npm run dev` - you should now see ShigTok running in your browser at localhost:3000