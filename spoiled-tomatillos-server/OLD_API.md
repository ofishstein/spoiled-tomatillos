# API Documentation

## Endpoints:

### POST /login

Request:
```javascript
req = {
  username: string,
  password: string
}
```
Response:
```javascript
200 // If login is successful
401 // If login is unsuccessful
```
Response also includes a session cookie if login is successful that is required for calls to protected endpoints

### GET /movies/:movieId

Response:
```javascript
res = [
    {
        "id": int,
        "imdbId": int,
        "tmdbId": int,
        "title": string,
        "createdAt": timestamp,
        "updatedAt": timestamp,
        "Reviews": [
            {
                "id": int,
                "text": string,
                "rating": double,
                "createdAt": timestamp,
                "updatedAt": timestamp,
                "movieId": int,
                "userId": int
            }//,...
        ]
    }//,...
]
```

### GET /profile
Protected endpoint

Response (for currently logged-in user):
```javascript
res = {
    "id": int,
    "username": string,
    "email": string,
    "firstName": string,
    "lastName": string,
    "bio": string,
    "isAdmin": boolean,
    "createdAt": timestamp,
    "updatedAt": timestamp,
    "reviews": [
        {
            "id": int,
            "text": string,
            "rating": int,
            "createdAt": timestamp,
            "updatedAt": timestamp,
            "movieId": int,
            "userId": int
        }
    ],
    "playlists": [
        {
            "id": int,
            "name": string,
            "createdAt": timestamp,
            "updatedAt": timestamp,
            "userId": int
        }
    ]
}
```

### GET /profile/:userId
Same as /profile but for the user given by their id

### GET /users/me
protected endpoint

Response (for currently logged-in user):
```javascript
res = {
          "id": int,
          "username": string,
          "email": string,
          "firstName": string,
          "lastName": string,
          "bio": string,
          "isAdmin": boolean,
          "createdAt": timestamp,
          "updatedAt": timestamp
      }
```

### PUT /users/me
protected endpoint

Request (changes profile to match given info):
```javascript
res = {
          "id": int,
          "username": string,
          "email": string,
          "firstName": string,
          "lastName": string,
          "bio": string,
          "isAdmin": boolean,
          "createdAt": timestamp,
          "updatedAt": timestamp
      }
```

### POST /users/create

Creates a new user with the given info

Automatically encrypts plaintext password

```javascript
res = {
          "id": int,
          "username": string,
          "email": string,
          "password": string,
          "firstName": string,
          "lastName": string,
          "bio": string,
          "isAdmin": boolean,
          "createdAt": timestamp,
          "updatedAt": timestamp
      }
```