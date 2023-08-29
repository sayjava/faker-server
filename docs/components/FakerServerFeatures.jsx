import { Feature } from "./Feature.jsx";

const Features = [
  {
    title: "Filesystem Based Mocking",
    description:
      "Mock your API with a simple filesystem structure. No need to learn a new language or framework.",
    icon: () => "🚀",
  },
  {
    title: "Integrated Faker.js Support",
    description:
      "Easily generate fake data with built-in support for Faker.js.",
    icon: () => "🔁",
  },
  {
    title: "GraphQL Support",
    description:
      "Faker Server supports GraphQL out of the box. Each mock file is a GraphQL query/mutation.",
    icon: () => "🔃",
  },
  {
    title: "Offline Development",
    description:
      "Run the mock server on your local environment and customize the mock templates to suit your needs.",
    icon: () => "🖥",
  },
];

export const FakerServerFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {Features.map((feature) => {
        return <Feature key={feature.title} feature={feature} />;
      })}
    </div>
  );
};
