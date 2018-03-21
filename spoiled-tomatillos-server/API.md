# Backend API Documentation

## Profile Definition
```
Profile:
{'user': {username, email, first, last, pic},
 'watchlists': [first 8 watchlists],
 'recommendations': [first n recommendations]
 'activity': [last n  actions]}
```

#### Notes
 - Pic is either the picture or the link to the resource, not sure yet.
 - An action is anything done recently by the user so reviews, comments, watchlist updates, etc.

## API

### Login

#### POST

| Route       | Description                                                                                   |
|-------------| ----------------------------------------------------------------------------------------------|
| /api/login  | Login to an account `{username, password, isAdmin}` -- isAdmin flag for logging in as an admin. |
| /api/logout | Logout of an account.                                                                         |

### User Routes

#### GET
| Route                            | Description                                                                                               |
|----------------------------------|-----------------------------------------------------------------------------------------------------------|
| /api/users/:id                   | Get a user Profile by ID |
| /api/users/:id/following?limit=8 | Get the user's followers (with optional limit); followers should be list of `{id, username, profileImage}`|
| /api/users/:id/followers?limit=8 | Get the user's following (with optional limit); following should be list of `{id, username, profileImage}`|
| /api/users/:id/is-following      | Is the currently logged in user following the user? (Return false if not logged in)|
| /api/users/:id/watchlist?limit=8 | Get the user's watchlist (with optional limit); watchlist should be a list of `{movie id, poster image}`|
| /api/users/:id/reviews?limit=8   | Get the user's reviews; `{reviewId, uid, movieId, username, profileImage, reviewText, rating, createdDate}`|
| /api/users/settings              | Get the currently logged in user's settings (must be logged in to view) The 'user' field from the Profile|
| /api/user?q=searchKeyword        | Search for users using given keyword|
| /api/is-logged-in                | Return the current user if logged in, otherwise return false (for hiding stuff on UI, etc.)|

#### POST
| Route                            | Description                                                                      |
|----------------------------------|----------------------------------------------------------------------------------|
| /api/user                        |      Create a new user (Admin only) -- Extended options (i.e. create a new admin)|
| /api/register                    |      Create a new user (Anyone)|

#### PUT
| Route                   | Description                                                                                                   |
|-------------------------|---------------------------------------------------------------------------------------------------------------|
| /api/users/settings     | Update user settings (login required) PUT a subset of the user info for example `{'username': 'MyNewCoolName'}` |
| /api/users/:id/follow   | Follow the user (login required)                                                                              |
| /api/users/:id/unfollow | Unfollow (login required)                                                                                     |

#### DELETE
| Route          | Description                                               |
|----------------|-----------------------------------------------------------|
| /api/users/:id | Id must match current user, or current user must be admin |

### Movie Routes
#### GET
| Route                    | Description                                                                                                     |
|------------------------- | --------------------------------------------------------------------------------------------------------------- |
| /api/movies/:id          | Get a movie by ID                                                                                                    |
| /api/movies?title=title  | Search for a movie by title                                                                                          |
| /api/movies?q=keyword    | Search for a movie by keyword                                                                                        |
| /api/movies/:id/review   | Get all reviews for given movie; `{reviewId, uid, movieId, username, profileImage, reviewText, ratin  g, createdDate}` |

#### POST
| Route                              | Description                       |
| -------                            | --------------                    |
| /api/movies                        | Create new movie (admin)          |
| /api/movies/:id/review             | Create a new review for the movie |
| /api/movies/:id/reviews/:id/flag   | Flag given review (admin)         |
| /api/movies/:id/reviews/:id/unflag | Unflag a given review (admin)     |

#### PUT
| Route                                 | Description                                                                              |
|---------------------------------------|------------------------------------------------------------------------------------------|
| /api/movies/:id                       | Must be admin                                                                            |
| /api/movies/:id/reviews/:id           | Edit a review/add a text review to a rating, etc.; current user must match review's user |
| /api/movies/:id/add-to-watchlist      | Add movie to watchlist                                                                   |
| /api/movies/:id/remove-from-watchlist | Remove movie from watchlist                                                              |

#### DELETE
| Route                       | Description           |
|-----------------------------|-----------------------|
| /api/movies/:id             | Must be admin         |
| /api/movies/:id/reviews/:id | Must be review's user |

### Review Routes
#### GET
| Route                | Description                          |
|----------------------|--------------------------------------|
| /api/reviews/:id     | Get a review by ID                   |
| /api/reviews/flagged | Get all flagged reviews (admin only) |
