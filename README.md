# Express-GraphQL + React SSR

## Run the application

Run one of the command-set listed below and navigate to http://localhost:3000 in your browser.

### To run development server

```
$ MONGODB_URL=<mongodb_url> npm run dev
```


### To run production server

To launch the application and database
```
$ docker-compose up web mongodb
```

To seed the database
```
$ docker-compose up mongo-seed
```
> **NOTE**: Only run the seed command once

## Run the tests

```
$ npm i
$ echo "MONGODB_TEST_URL=<your mongodb url>" >> .env
$ npm test
```
