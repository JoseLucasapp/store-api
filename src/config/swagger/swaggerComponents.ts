export default {
  schemas: {
    Admins: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    AdminsLogin: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        createdAt: {
          type: 'date',
        },
        updatedAt: {
          type: 'date',
        },
        token: {
          type: 'string',
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
}
