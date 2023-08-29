const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = withNextra({
  env: {
    SHOPIFY_ENDPOINT: process.env.SHOPIFY_ENDPOINT ??
      "https://shopify.faker-server.dev/graphql",
  },
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
