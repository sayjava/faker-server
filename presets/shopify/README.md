
<h1 align="center"> Mock Shopify Guide </h1>

<p align="center">
  The easiest and quickest way to a build a Shopify/E-Commerce Storefront without having to connect to a real Shopify store.
</p>

<p align="center">
<a href="https://shopify.faker-server.dev/graphql">https://shopify.faker-server.dev/graphql</a>
</p>

## Features

- No Shopify Store required.
- Simulate different `product`, `collection`, `cart`, `customer` and `search` scenarios
- Simulate blocks and articles
- Simulate different product recommendation scenarios
- Internationalization support
- Customer authentication support

## Sample Stores

`Mock Shopify` has been tested with some leading E-Commerce frameworks to ensure
it works as expected. The example storefronts are hosted on Google Cloud Run and
are available for testing.

- [NextJS Commerce](https://nextjs-mock-shopify.faker-server.dev)
- [Shopify Hydrogen](https://hydrogen-mock-shopify.faker-server.dev)

## Getting Started

Getting started with `Mock Shopify` is easy. You can start with using pre-made example storefronts like NextJS Commerce or Shopify Hydrogen react framework.

### [Example Hydrogen Store](https://hydrogen-mock-shopify.faker-server.dev)

The [Hydrogen](https://hydrogen.shopify.dev/) framework is a Shopify official
storefront. The example storefront is a clone of the Shopify Hydrogen Starter.
It points to the mock Shopify GraphQL API to pull data with no changes to the
codebase.

- Follow the [instructions](https://hydrogen.shopify.dev/) to create a new
  storefront with Hydrogen
- Change the shopify domain to the mock shopify URL in the `.env` file

#### Changes To Hydrogen Codebase

The only change to the codebase is the `PUBLIC_STORE_DOMAIN` variable in the
`.env`. this is an example of the `.env` file

```env
SESSION_SECRET="mock-secret"
PUBLIC_STOREFRONT_API_TOKEN="mock-api-token"
PRIVATE_STOREFRONT_API_TOKEN="mock-api-token"
PUBLIC_STORE_DOMAIN="shopify.faker-server.dev/graphql"
PUBLIC_STOREFRONT_ID="foobar"
```

#### Internationalization

`Mock Shopify` supports internalization. The default country is `US`. To change
the country which mostly affects the currency, use the `country` variable in the
graphql variable.

The example query below will return the cart in the `FR` (French) locale

```graphql copy
query CartQuery($country: CountryCode = ZZ, $language: LanguageCode) @inContext(country: $country, language: $language) {
  cart(id: "some-cart-id") {
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
  }
}
```

```json copy
{
  "country": "FR",
  "language": "fr"
}
```

To see this in action using the hydrogen example shop

- [French Shop](https://hydrogen-shopify.faker-server.com/fr-FR)
- [British Shop](https://hydrogen-shopify.faker-server.com/en-GB)
- [Japanese Shop](https://hydrogen-shopify.faker-server.com/ja-JP)

### [Example NextJS E-Commerce](https://nextjs-commerce.faker-server.com)

The [NextJS E-Commerce](https://github.com/vercel/commerce) framework is a
popular React framework for building E-Commerce storefronts. The example
storefront is a clone of the NextJS E-Commerce Starter. It points to the mock
Shopify GraphQL API to pull data with no changes to the codebase.

- Clone the NextJS commerce repo
- Follow the instructions to run the application
- Change the shopify domain to the mock shopify URL in the `.env` file

#### Changes To NextJS Codebase

The only change to the codebase is the `SHOPIFY_STORE_DOMAIN` variable in the
`.env`. this is an example of the `.env` file

```env
COMPANY_NAME="Mock Shop."
TWITTER_CREATOR="@sayjava"
TWITTER_SITE="https://github.com/sayjava"
SITE_NAME="Mock-Shop"
SHOPIFY_REVALIDATION_SECRET="mock-secret"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="mock-token"
SHOPIFY_STORE_DOMAIN="shopify.fakerserver.dev/graphql"
```

Add the placeholder domain to the `next.config.js` file to be able to render the
product images

```javascript
{
  protocol: 'https',
  hostname: 'via.placeholder.com',
  pathname: '/**'
}
```

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

## Local/Offline Setup

Local setup is coming soon

## Documentation

`Mock Shopify` uses the full graphql schema from the Shopify Storefront API.
Therefore, all operations supported by the Shopify Storefront API are supported
by `Mock Shopify`. For a full list of operations, please see the
[Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07).

`Mock Shopify` however supports some special values that can be used to simulate
different scenarios. This document will cover these special values.

### Products

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

#### Alternative Product Scenarios

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

### Shop Examples

- [Out of Stock Product](https://hydrogen-mock-shopify.faker-server.dev/products/out-of-stock-product)
- [Gift Card Product](https://hydrogen-mock-shopify.faker-server.dev/products/giftcard-product)
- [Not Found Product](https://hydrogen-mock-shopify.faker-server.dev/products/not-found-product)
- [On Sale Product](https://hydrogen-mock-shopify.faker-server.dev/products/on-sale-product)

### Product Recommendations

Product recommendations can be retrieved for a product using any product ID.
`Mock Shopify` will return a simulated list of recommended products for any
given product ID.

#### Alternative Product Recommendation Scenario

Easily simulate different product recommendation scenarios using this product
handles.

| Product Handle               | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `no-recommendations-product` | Simulates a product that has no recommended |
| products                     |                                             |

### Collection(s)

`Mock Shopify` allows developers to query collections by `id` or `handle`. This
allows you to build out collection UI components to reflect different collection
state.

> [!NOTE] All collection properties supported by the Shopify Storefront API are
> supported by `Mock Shopify`. For a full list of properties, please see the
> [Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07/objects/Collection).

> [!NOTE] The `Mock Shopify` collection response will always return a collection

#### Alternative Collection Scenarios

Easily simulate different collection scenarios using these collection handles.

| Handle                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `not-found-collection` | Simulates an unknown collection          |
| `no-items-collection`  | Simulates a an empty list of collections |

#### Collection Filters

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

### Cart

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

#### Alternative Cart Scenarios

| Cart ID           | Description                                  |
| ----------------- | -------------------------------------------- |
| `empty-cart`      | Simulates a cart that is empty               |
| `discounted-cart` | Simulates a cart with applied discount codes |

> [!NOTE] See the
> [Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07/queries/cart)
> for more information on the cart mutation operations, arguments,return types
> and error values.

### Search

`Mock Shopify` supports product searches using all the arguments supported by
the Shopify Storefront API.

#### Alternative Search Scenarios

| Query      | Description                                |
| ---------- | ------------------------------------------ |
| `no-results` | Simulates a search that returns no results |

### Predictive Search

The predictive search is limited to returning `Products` and `Collections`. The
predictive search will return a list of products and collections regardless of
the search term. It will also return some random search suggestions queries
perfect for build out UIs.

#### Alternative Predictive Search Control headers

| Header     | Description                                           |
| ---------- | ----------------------------------------------------- |
| `no-results` | Simulates a predictive search that returns no results |

### Customer

`Mock Shopify` supports a few common customer operations

- Create Customer
- Authentication
- Password Reset
- Customer Orders
- MailingAddress
  - Create
  - Updated
  - Delete

### Shop Example

> [!NOTE] Any email and password combination will work for authentication. The site does not keep any state.

- [Customer Login](https://hydrogen-mock-shopify.faker-server.dev/login)
- [Customer Orders](https://hydrogen-mock-shopify.faker-server.dev/account/orders)
- [Customer Orders](https://hydrogen-mock-shopify.faker-server.dev/account/profile)

#### Alternative Customer Scenarios

When testing customer journeys, a couple of alternative journeys are available
using special values as listed below in this table

| Header                   | Description                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `wrong-user@example.com` | If this specific email is supplied then the server will return an authentication error |
