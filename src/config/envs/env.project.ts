const environment = {
  dev: {
    PORT: 8070,
    MONGO_USER: "abass",
    MONGO_PASS: "abass",
    MONGO_HOST: "localhost",
    MONGO_PORT: 27017,
    MONGO_DATABASE: "albert-royer-dev",
    MAIL_USER: "test@gmail.com",
    MAIL_PASS: "test@2022"
  },
  prod: {
    PORT: 8070,
    MONGO_USER: "abass",
    MONGO_PASS: "abass",
    MONGO_HOST: "localhost",
    MONGO_PORT: 27017,
    MONGO_DATABASE: "albert-royer-prod",
    MAIL_USER: "test@gmail.com",
    MAIL_PASS: "test@2022"
  },
  default: {
    PORT: 8070,
    MONGO_USER: "abass",
    MONGO_PASS: "abass",
    MONGO_HOST: "localhost",
    MONGO_PORT: 27017,
    MONGO_DATABASE: "albert-royer-dev",
    MAIL_USER: "test@gmail.com",
    MAIL_PASS: "test@2022"
  }
};
export default environment[
  process.env.NODE_ENV ? process.env.NODE_ENV : "default"
];
