# Mock Shopify Guide

`Mock Shopify` is a mock Shopify GraphQL API server for testing and development
purposes. It uses the Shopify GraphQL Schema to provide a mock of the GraphQL API
that can be used to rapidly prototype Shopify custom storefronts.

This guide will help you get started with `Mock Shopify`. `Mock Shopify` is a
mock Shopify API that allows developers to build Shopify UI components without
having to connect to a real Shopify store. `Mock Shopify` is built on top of
[Faker Server](https://github.com/sayjava/faker-server) and uses the
[Shopify Storefront API](https://shopify.dev/docs/storefront-api) to provide a
mock Shopify API.

> [!NOTE] Shopify GraphQL API Version 2023-07

- [Mock Shopify Guide](#mock-shopify-guide)
  * [Getting Started](#getting-started)
    + [How It Works](#how-it-works)
    + [Supported Operations](#supported-operations)
    + [Simulating Alternative States](#simulating-alternative-states)
  * [Internationalization](#internationalization)
    + [Internationalization Control headers](#internationalization-control-headers)
  * [Products](#products)
    + [Product Control headers](#product-control-headers)
    + [Product Recommendations](#product-recommendations)
    + [Product Recommendation Control headers](#product-recommendation-control-headers)
  * [Collection(s)](#collection-s-)
    + [Collection Filters](#collection-filters)
  * [Cart](#cart)
    + [Cart Control headers](#cart-control-headers)
  * [Search](#search)
    + [Search Control headers](#search-control-headers)
  * [Predictive Search](#predictive-search)
    + [Predictive Search Control headers](#predictive-search-control-headers)
  * [Checkout](#checkout)

## Getting Started

Just point your application to the `Mock Shopify` GraphQL endpoint at `https://mock-shopify.run/api/2023-07/graphql.json` and you're good to go.

### How It Works

It uses [fakerjs](https://fakerjs.dev/) to generate simulated data in the response and these responses are created using [handlebars](https://handlebarsjs.com/) templates in this repository.

### Supported Operations

These are the currently supported operations. Operations that are not supported returns an error.

- [x] Shop
- [x] Product(s)
- [x] Collection(s)
- [x] Cart
- [x] Checkout
- [x] Search
- [x] Predictive Search
- [ ] Customer(s) (Coming Soon)
- [ ] Order(s) (Coming Soon)
- [ ] Payment(s) (Coming Soon)
- [ ] Shipping Rates (Coming Soon)

### Simulating Alternative States

`Mock Shopify` supports alternative states for products, collections and carts.
This allows developers to build out UI components to reflect different states of
a product, collection or cart. For example, a developer can build out a product
UI component to reflect a product that is out of stock or a cart UI component to
reflect a cart with discounts.

This is achieved by using control headers. Control headers are headers that are
used to control the state of the API. For example, if you want to simulate a
product that is out of stock, you would set the `ms-product-out-of-stock` Header
to `true`. This will return a product that is out of stock.

Example

```javascript
// Simulates a product that is out of stock
await fetch("https://Mock shopify.vercel.app/api/headers", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "ms-product-out-of-stock": true,
  },
  body: JSON.stringify({
    query: `
      query {
        product(id: "gid://shopify/Product/123456789") {
          availableForSale
        }
      }
    `,
  }),
});
```

> [!NOTE] All control headers are prefixed with `ms-` to avoid conflicts with
> other headers.

### Mock Images

`Mock Shopify` generates a data uri svg placeholder that can be used in place of a real images.

## Internationalization

`Mock Shopify` supports internalization in a limited capacity. It uses headers
to simulate different currencies and languages.

### Internationalization Control headers

| Header             | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `ms-shop-currency` | Simulates the currency of prices, it defaults to "USD" |
| `ms-shop-language` | Simulates the language of the shop, defaults to "EN"   |

## Products

Querying for a product by `id` will return a product. This allows developers to
build out product UI components to reflect different product state.

Example Query

```graphql copy
query {
    product(id: "gid://shopify/Product/123456789") {
        title
        description
        featuredImage {
            url
        }
        priceRange {
            minVariantPrice {
                amount
            }
        }
    }
}
```

> [!NOTE] All product properties supported by the Shopify Storefront API are
> supported by `Mock Shopify`. For a full list of properties, please see the
> [Shopify Storefront API](https://shopify.dev/docs/storefront-api/reference/products/product).

To control the state of the product(s) that is returned, `Mock Shopify` supports
the following control headers.

### Product Control headers

| Header                     | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `ms-product-out-of-stock`  | Simulates a product that is out of stock           |
| `ms-product-giftcard`      | Simulates a product that is a gift card            |
| `ms-product-subscription`  | Simulates a product that is a subscription product |
| `ms-product-not-found`     | Simulates a product that is not found              |
| `ms-product-no-metafields` | Simulates a product that has no metafields         |
| `ms-product-no-variants`   | Simulates a product that has no variants           |

### Product Recommendations

Product recommendations can be retrieved for a product using any product ID.
`Mock Shopify` will return a simulated list of recommended products for any
given product ID.

### Product Recommendation Control headers

| Header                          | Description                                 |
| ------------------------------- | ------------------------------------------- |
| `ms-product-no-recommendations` | Simulates a product that has no recommended |
| products                        |                                             |

## Collection(s)

Mock Shopify allows developers to query collections by `id` or `handle`. This
allows developers to build out collection UI components to reflect different
collection state.

> [!NOTE] All collection properties supported by the Shopify Storefront API are
> supported by `Mock Shopify`. For a full list of properties, please see the
> [Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07/objects/Collection).

Example Query

```graphql copy
query {
  # This will return 10 products
  collections(first: 10) {
    nodes {
      id
      description
    }
  }
}
```

**Collection Control headers** | Header | Description | |--|--| |
`ms-collection-no-collections` | Simulates a an empty list of collections | |
`ms-collection-no-products` | Simulates a collection that has no products | |
`ms-collection-no-image` | Simulates a collection that has no image | |
`ms-collection-no-filters` | Simulates a collection that has no filters |

### Collection Filters

`Quick Shopify` supports collection filters. The following filters are
supported:

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

The following mutation cart operations are supported by `Mock Shopify`:

- `cartCreate`
- `cartLinesAdd`
- `cartLinesUpdate`
- `cartLinesRemove`
- `cartAttributesUpdate`
- `cartDiscountCodesUpdate`
- `cartPaymentUpdate`
- `cartSubmitForCompletion`

> [!IMPORTANT] Please not that Quick Shopify does not keep any state, therefore
> any changes made to a cart will not persist. The basic operations will succeed
> but the cart will not be updated.

### Cart Control headers

| Header                        | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `ms-cart-not-found`           | Simulates a cart that does not exist          |
| `ms-cart-empty`               | Simulates a cart that is empty                |
| `ms-cart-no-shipping-address` | Simulates a cart that has no shipping address |
| `ms-cart-use-discount`        | Simulates a cart with applied discount codes  |
| `ms-cart-error-code`          | Simulates a cart mutation user error          |
| `ms-cart-error-message`       | Simulates a cart mutation user error message  |

> [!NOTE] See the
> [Shopify Storefront API](https://shopify.dev/docs/api/storefront/2023-07/queries/cart)
> for more information on the cart mutation operations, arguments,return types
> and error values.

## Search

`Mock Shopify` supports product searches using all the arguments supported by
the Shopify Storefront API.

### Search Control headers

| Header                 | Description                                |
| ---------------------- | ------------------------------------------ |
| `ms-search-no-results` | Simulates a search that returns no results |

## Predictive Search

The predictive search is limited to returning `Products` and `Collections`. The
predictive search will return a list of products and collections regardless of
the search term. It will also return some random search suggestions queries
perfect for build out UIs.

### Predictive Search Control headers

| Header                            | Description                                           |
| --------------------------------- | ----------------------------------------------------- |
| `ms-predictive-search-no-results` | Simulates a predictive search that returns no results |

## Checkout

Coming soon
