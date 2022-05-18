export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bonavoy REST API",
      version: "0.1.0",
      description: "Bonavoy REST API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Bonavoy",
        url: "https://bonavoy.com",
        email: "developers@bonavoy.com",
      },
    },
    servers: [
      {
        url: "https://api.bonavoy.com/api",
      },
    ],
  },
  apis: [
    "./src/routes/auth.js",
    "./src/routes/newsletter.js",
    "./src/routes/locations.js",
    "./src/routes/flights.js",
  ],
};
