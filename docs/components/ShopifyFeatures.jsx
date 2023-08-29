import { Feature } from "./Feature.jsx";

const Features = [
  {
    title: "No Shopify Account Needed",
    description:
      "You can use the Shopify Storefront API without a Shopify account. This is great for testing and development.",
    icon: () => "🚀",
  },
  {
    title: "Rapidly Prototype Shopify Custom Storefronts",
    description:
      "Spin up your app and point it to this GraphQL endpoint. Perfect for demos and hackathons.",
    icon: () => "🔁",
  },
  {
    title: "Test Alternative Scenarios and Edge Cases",
    description:
      "You can use the Shopify Storefront API to test alternative scenarios and edge cases. See the <a class='underline text-lime-800 font-bold' href='https://github.com/sayjava/faker-server/blob/main/presets/shopify/README.md'/>Docs</a> for more information.",
    icon: () => "🔃",
  },
  {
    title: "Offline Development",
    description:
      "Run the mock server on your local environment and customize the mock templates to suit your needs.",
    icon: () => "🖥",
  },
];

export const ShopifyFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {Features.map((feature) => {
        return <Feature key={feature.title} feature={feature} />;
      })}
    </div>
  );
};
