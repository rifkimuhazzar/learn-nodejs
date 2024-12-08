# Address API Spec

## Create Address API

Enpoint: `POST /api/contacts/:contactId/address`

Headers:

- `Authorization: token`

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Failed/Error:

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Enpoint: `PUT /api/contacts/:contactId/address/:addressId`

Headers:

- `Authorization: token`

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Failed/Error:

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Enpoint: `GET /api/contacts/:contactId/address/:addressId`

Headers:

- `Authorization: token`

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Failed/Error:

```json
{
  "errors": "Contact is not found"
}
```

## List Address API

Enpoint: `GET /api/contacts/:contactId/address`

Headers:

- `Authorization: token`

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    },
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    }
  ]
}
```

Response Body Failed/Error:

```json
{
  "errors": "Contact is not found"
}
```

## Remove Address API

Enpoint: `DELETE /api/contacts/:contactId/address/:addressId`

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
  "errors": "Address is not found"
}
```
