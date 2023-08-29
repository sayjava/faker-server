export default {
  logo: <span>Faker Server</span>,
  project: {
    link: "https://github.com/sayjava/faker-server",
  },
  docsRepositoryBase: "https://github.com/sayjava/faker-server/blob/main/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Faker Server",
    };
  },
  toc: {
    float: true,
  },
};
