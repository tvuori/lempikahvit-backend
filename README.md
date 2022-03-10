# Lempikahvit - backend

Kyseessä on backend (Node.js/TypeScript) web-sovellukselle, jossa voi tallentaa tiedot lempikahvilaaduistaan.

Käyttää oletuksena porttia 3001.

Tarjoaa endpointin yksittäisen uuden kahvitiedon tallennukseen, kaikkien tallennettujen kahvien hakuun sekä yksittäisen kahvin poistoon. 

Kahveista tallennetaan yksilöllinen id, nimi, pakkauksen paino, pakkauksen hinta sekä paahtoaste välillä 1-5. Tiedot tallennetaan json-muotoiseen tekstitiedostoon src/data-hakemistossa.

## Installation

```bash
npm install
```

## Usage

```bash 
npm start
```
#### Get all coffees

```http
GET /coffees
```
#### Add a new coffee

```http
POST /coffees
```
#### Delete coffee

```http
DELETE /coffees/{id}
```

