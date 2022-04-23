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
        name: 'bearerAuth',
        in: 'header',
      },
    },
    Managers: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        storeName: {
          type: 'string',
        },
        cnpj: {
          type: 'string',
        },
        storeAddress: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
            },
            neighborhood: {
              type: 'string',
            },
            zipCode: {
              type: 'string',
            },
            state: {
              type: 'string',
            },
            street: {
              type: 'string',
            },
            number: {
              type: 'string',
            },
            complement: {
              type: 'string',
            },
          },
        },
      },
    },
    Delete: {
      type: 'object',
      properties: {
        msg: {
          type: 'string',
        },
      },
    },
    Workers: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        role: {
          type: 'string',
        },
        managerId: {
          type: 'objectId',
        },
      },
    },
    Products: {
      type: 'object',
      properties: {
        productName: {
          type: 'string',
        },
        productPrice: {
          type: 'number',
        },
        productDescription: {
          type: 'string',
        },
        productBrand: {
          type: 'string',
        },
        productAmount: {
          type: 'number',
        },
        productCategory: {
          type: 'string',
        },
        managerId: {
          type: 'objectId',
        },
      },
    },
  },
}
