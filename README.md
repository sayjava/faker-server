# Faker Server

Faker Server is a zero config filesystem based mock server using handlebars and fakerjs.

## Features

- Zero configuration required. Just start the server and you're ready to go.
- Filesystem based routing for REST and GraphQL API.
- Utilize Handlebars templates to define the structure of the fake data.
- Leverage the extensive capabilities of Faker.js to generate various types of data.

## Getting Started

Pull the docker image

```bash 
docker pull gcr.io/sayjava/faker-server
```

Generate a template file

```bash
echo "Hello World" > templates/hello.hbs
```

Start the server and point it to the templates directory

```bash
docker run -p 8080:8080 -v $(pwd)/templates:/app/templates -it --rm faker-server
```

## Presets

Faker Server comes with a few presets that you can use to quickly generate fake data for your GraphQL API. You can also create your own presets by adding a file to the `templates/presets` directory.

```bash
docker run -p 8080:8080 -it --rm faker-server --preset templates/shopify
```

Some Included presets:

- [Shopify](/presets/shopify/README.md)
- [Weather](/presets/weather/README.md) (Coming Soon)
- [Github](/presets/github/README.md) (Coming Soon)


### REST API

Filesystem based routing is used to define the REST API. The server will look for a file with the same name as the request method in the `templates` directory. For example, a `GET` request to `/users` will look for a file named `users.hbs` in the `templates` directory.

```bash
curl -X GET \
  http://localhost:9001/users \
  -H 'Content-Type: application/json'
```

#### URL Parameters

```bash
curl -X GET \
  'http://localhost:9001/users/2/posts' \
  -H 'Content-Type: application/json'
```

#### URL Query

```bash
curl -X GET \
  'http://localhost:9001/users?_limit=10&_page=1&_sort=id&_order=asc' \
  -H 'Content-Type: application/json'
```

### GraphQL API

The GraphQL API is defined in the `schema.graphql` file. The server will look for this file in the `templates` directory. The GraphQL API is served at a url that includes `graphql`. For example, `/graphql` or `/api/graphql`.



```bash
curl -X POST \
  http://localhost:9002/graphql \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "{ user { id name email } }"
}'
```