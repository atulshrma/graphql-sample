# Express-GraphQL + React SSR

## To run development server

```
$ MONGODB_URL=<mongodb_url> npm run dev
```


## To run production server

To launch the application and database
```
$ docker-compose up web mongodb
```

To seed the database
```
$ docker-compose up mongo-seed
```
> **NOTE**: Only run the seed command once


## To run tests

```
$ npm i
$ npm test
```
