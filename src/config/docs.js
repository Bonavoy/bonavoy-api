export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bonavoy REST api',
      version: '0.1.0',
      description: 'Bonavoy REST api',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Bonavoy',
        url: 'https://bonavoy.com',
        email: 'bonavoydevelopers@gmail.com',
      },
    },
    servers: [
      {
        url: 'https://api.bonavoy.com/api',
      },
    ],
  },
  apis: ['./src/routes/auth.js'],
};
