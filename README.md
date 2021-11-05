# goSchedule_task2

## Quick start

- Clone the repository

```
git clone https://github.com/Aneerudh2k2/goSchedule_task2.git
```

- Install the dependencies

```
npm install
```

- Follow the steps for .env configuration

```
$ mkdir config
$ cd config
$ touch dev.env
```

- Ensure that you have the mongodb uri for .env file

```
DB_URL=<paste your mongo db url>
```

Default port number for the application is 8080

## Routes

1. Start the server first

```
npm start
```

2. Create the new user by signing up and mention the plan

```
curl -X POST \
  'http://localhost:8080/signup' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Name",
  "email": "example@gmail.com",
  "plan": "free_plan"
}'
```

Now this will result the following:

```
{
  "user_id": "618532a4f781cff0bb75f6cc",
  "message": "Store this user id for making future requests"
}
```

3. Copy the user_id and get your requests count

```
curl -X GET \
  'http://localhost:8080/mySaasRequest?userId=618532a4f781cff0bb75f6cc' \
```

Now this will return rate limits of your account:

```
{
  "_id": "618532a4f781cff0bb75f6cc",
  "name": "Name",
  "email": "example@gmail.com",
  "plan": "free_plan",
  "total_requests": 5,
  "remaining_request_allowed": 4,
  "__v": 0
}
```
