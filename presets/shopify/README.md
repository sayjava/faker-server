# Mock Shopify Guide

`Mock Shopify` is a mock Shopify GraphQL API server for testing and development
purposes. It uses the Shopify GraphQL Schema to provide a mock of the GraphQL
API that can be used to rapidly prototype Shopify custom storefronts.

This guide will help you get started with `Mock Shopify`. `Mock Shopify` is a
mock Shopify API that allows developers to build Shopify UI components without
having to connect to a real Shopify store. `Mock Shopify` is built on top of
[Faker Server](https://github.com/sayjava/faker-server) and uses the
[Shopify Storefront API](https://shopify.dev/docs/storefront-api) to provide a
mock Shopify API.

> [!NOTE] Mock Shopify GraphQL API was built to the specification of the Version
> 2023-07 of the GraphQL API

## Supported Shopify Operations

These are the currently supported operations. Operations that are not supported
returns an error.

- [x] Shop
- [x] Product(s)
  - [x] Recommendations
  - [x] Variants
  - [x] Metafields
- [x] Collection(s)
- [x] Cart
- [x] Checkout
- [x] Search
- [x] Predictive Search
- [x] Customer
  - [x] Customer Orders
  - [x] Authentication
  - [x] Password Reset
  - [x] MailingAddress
    - [x] Create
    - [x] Updated
    - [x] Delete
- [x] Pages
- [x] Blogs
- [x] Articles
- [ ] Payment(s) (Coming Soon)
- [ ] Shipping Rates (Coming Soon)

> [!NOTE] If there are properties that are missing, bugs or useful operations,
> please raise an issue on this repo.

## Getting Started

### Shopify Hydrogen

`Mock Shopify` was tested with Shopify official storefront starter template
called [`Hydrogen`](https://hydrogen.shopify.dev/).

- Follow the [instructions](https://hydrogen.shopify.dev/) to create a new
  storefront with Hydrogen
- Change the shopify domain to the mock shopify URL in the `.env` file

See a test storefront here using the hydrogen template.
[Hydrogen Storefront](https://hydrogen-shopify.faker-server.com)

### NextJS E-Commerce

- Clone the NextJS commerce repo
- Follow the instructions to run the application
- Change the shopify domain to the mock shopify URL in the `.env` file

See a test storefront here using the hydrogen template.
[NextJS Storefront](https://nextjs-shopify.faker-server.com)

### Custom Setup

If you are using a custom setup, then just point your application to the mock
shopify endpoint

## Local/Offline Setup

The `Mock Shopify` can run locally on a developer's machine.

```sh
docker run grc.io/sayjava/faker-server -p 8080:8080 --preset=shopify
```

> [!Note] SSL self signed certificate issues

### Docker

### Deno

## Development

## How It Works

It uses [fakerjs](https://fakerjs.dev/) to generate simulated data in the
response and these responses are created using
[handlebars](https://handlebarsjs.com/) templates in this repository.

### Mock Images

`Mock Shopify` generates a data uri svg placeholder that can be used in place of
a real images.

## Internationalization

`Mock Shopify` supports internalization in a limited capacity. It uses headers
to simulate different currencies and languages.

## Products

Fetch products using the Shopify product ID or product handle. This allows you
to build out product UI components to reflect different product state.

> [!NOTE] All product properties supported by the Shopify Storefront API are
> supported by `Mock Shopify`. For a full list of properties, please see the
> [Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07/objects/product).

> [!NOTE] The `Mock Shopify` product response will always return a product
> regardless of the product ID or handle. This allows developers to build out
> product UI components to reflect different product state.

> [!NOTE] The `Mock Shopify` product images are placeholders appropriately
> sized.

### Alternative Product Scenarios

Easily simulate different product scenarios using these product handles.

| Product Handle          | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `out-of-stock-product`  | Simulates a product that is out of stock           |
| `giftcard-product`      | Simulates a product that is a gift card            |
| `subscription-product`  | Simulates a product that is a subscription product |
| `not-found-product`     | Simulates a product that is not found              |
| `no-metafields-product` | Simulates a product that has no metafields         |
| `no-variants-product`   | Simulates a product that has no variants           |
| `on-sale-product`       | Simulates a product that is on sale                |

Example

The following query will return a product that is out of stock

```graphql copy
query {
  product(handle: "out-of-stock-product") {
    availableForSale
  }
}
```

### Product Recommendations

Product recommendations can be retrieved for a product using any product ID.
`Mock Shopify` will return a simulated list of recommended products for any
given product ID.

### Alternative Product Recommendation Scenario

Easily simulate different product recommendation scenarios using this product
handles.

| Product Handle               | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `no-recommendations-product` | Simulates a product that has no recommended |
| products                     |                                             |

## Collection(s)

`Mock Shopify` allows developers to query collections by `id` or `handle`. This
allows you to build out collection UI components to reflect different collection
state.

> [!NOTE] All collection properties supported by the Shopify Storefront API are
> supported by `Mock Shopify`. For a full list of properties, please see the
> [Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07/objects/Collection).

> [!NOTE] The `Mock Shopify` collection response will always return a collection

### Alternative Collection Scenarios

Easily simulate different collection scenarios using these collection handles.

| Handle                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `not-found-collection` | Simulates an unknown collection          |
| `no-items-collection`  | Simulates a an empty list of collections |

### Collection Filters

`Mock Shopify` supports collection filters. The following filters are supported:

| Filter             | Description                                               | Type          |
| ------------------ | --------------------------------------------------------- | ------------- |
| `Product Type`     | Simulates different product types filters                 | `LIST`        |
| `Vendor`           | Simulates multiple vendors filter                         | `LIST`        |
| `Price`            | Simulates the price ranges for a collection               | `PRICE_RANGE` |
| `Product Material` | Simulates product materials filter                        | `LIST`        |
| `Availability`     | Simulates product availability filter                     | `LIST`        |
| `Sort By`          | Simulates sorting order of the products in the collection | `LIST`        |
| `Color`            | Simulates sorting order of the collection                 | `LIST`        |

## Cart

Any cart id will always return a cart. This allows developers to build out cart
UI components to reflect different cart state except for when using control
headers.

The number of items in the cart is determined by the `first` query argument of
the `cart.lines` query.

The below query will return the 2 items in the cart

```graphql copy
query {
  cart(id: "cart-id") {
    lines(first: 2) {
      edges {
        node {
          id
          quantity
        }
      }
    }
  }
}
```

The following mutation cart operations are supported by `Mock Shopify`:

- `cartCreate`
- `cartLinesAdd`
- `cartLinesUpdate`
- `cartLinesRemove`
- `cartAttributesUpdate`
- `cartDiscountCodesUpdate`
- `cartPaymentUpdate`
- `cartSubmitForCompletion`

> [!IMPORTANT] Please not that `Mock Shopify` does not keep any state, therefore
> any changes made to a cart will not persist. The basic operations will succeed
> but the cart will not be updated.

### Alternative Cart Scenarios

| Cart ID           | Description                                  |
| ----------------- | -------------------------------------------- |
| `empty-cart`      | Simulates a cart that is empty               |
| `discounted-cart` | Simulates a cart with applied discount codes |

> [!NOTE] See the
> [Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07/queries/cart)
> for more information on the cart mutation operations, arguments,return types
> and error values.

## Search

`Mock Shopify` supports product searches using all the arguments supported by
the Shopify Storefront API.

### Alternative Search Scenarios

| Query      | Description                                |
| ---------- | ------------------------------------------ |
| `no items` | Simulates a search that returns no results |

## Predictive Search

The predictive search is limited to returning `Products` and `Collections`. The
predictive search will return a list of products and collections regardless of
the search term. It will also return some random search suggestions queries
perfect for build out UIs.

### Alternative Predictive Search Control headers

| Header     | Description                                           |
| ---------- | ----------------------------------------------------- |
| `no items` | Simulates a predictive search that returns no results |

## Customer

`Mock Shopify` supports a few common customer operations

- Create Customer
- Authentication
- Password Reset
- Customer Orders
- MailingAddress
  - Create
  - Updated
  - Delete

### Alternative Customer Scenarios

When testing customer journeys, a couple of alternative journeys are available
using special values as listed below in this table

| Header                   | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `wrong-user@example.com` | If this specific email is supplied then the server will return an authentication error |
