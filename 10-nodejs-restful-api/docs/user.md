# User API Spec

## Register User API

Endpoint: `POST /api/users`

Request Body:

```json
{
  "username": "helloworld",
  "password": "helloworld123",
  "name": "Hello World"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "helloworld",
    "name": "Hello World"
  }
}
```

Response Body Failed/Error:

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint: `POST /api/users/login`

Request Body:

```json
{
  "username": "helloworld",
  "password": "helloworld123"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Failed/Error:

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint: `PATCH /api/users/current`

Headers:

- `Authorization: token`

Request Body:

```json
{
  "username": "New Hello World", // optional
  "password": "new password" // optional
}
```

Response Body Success:

```json
{
  "data": {
    "username": "helloworld",
    "name": "New Hello World"
  }
}
```

Response Body Failed/Error:

```json
{
  "error": "Name length max 100"
}
```

## Get User API

Endpoint: `GET /api/users/current`

Headers:

- `Authorization: token`

Response Body Success:

```json
{
  "data": {
    "username": "helloworld",
    "name": "Hello World"
  }
}
```

Response Body Failed/Error:

```json
{
  "errors": "Unautorized"
}
```

## Logout User API

Endpoint: `DELETE /api/users/logout`

Headers:

- `Authorization: token`

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Failed/Error:

```json
{
  "errors": "Unautorized"
}
```
