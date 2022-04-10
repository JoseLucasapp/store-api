export default {
  //ADMINS
  '/admins/login': {
    post: {
      summary: "Admin's login",
      description: 'Route to get ath token.',
      tags: ['Admins'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Admins',
            },
            examples: {
              admin: {
                value: {
                  email: 'admin@admin.com',
                  password: 'adminpass',
                },
              },
            },
          },
        },
      },
      responses: {
        '400': {
          description: 'Incorrect password',
        },
        '404': {
          description: 'User not found',
        },
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Admins',
              },
            },
          },
        },
      },
    },
  },
  //MANAGERS
  '/managers/': {
    post: {
      summary: 'Add a new manager',
      description: 'Route to create a new manager.',
      tags: ['Managers'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Managers',
            },
            examples: {
              manager: {
                value: {
                  email: 'manager@manager.com',
                  password: 'managerPass',
                  storeName: 'store',
                  cnpj: '010101010101012',
                  storeAddress: {
                    city: 'city',
                    neighborhood: 'neighborhood',
                    zipCode: '123456789',
                    state: 'state',
                    street: 'street',
                    number: 'number',
                    complement: 'complement',
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        '500': {
          description: 'Server error.',
        },
        '401': {
          description: 'Email already used.',
        },
        '400': {
          description: 'Invalid cnpj.',
        },
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Managers',
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Search all managers.',
      description: 'Route to search all managers',
      tags: ['Managers'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'storeName',
          in: 'query',
          description: 'Search manager by store name.',
          required: false,
        },
        {
          name: 'cnpj',
          in: 'query',
          description: 'Search manager by cnpj.',
          required: false,
        },
        {
          name: 'email',
          in: 'query',
          description: 'Search manager by email.',
          required: false,
        },
        {
          name: 'city',
          in: 'query',
          description: 'Search manager by city.',
          required: false,
        },
        {
          name: 'neighborhood',
          in: 'query',
          description: 'Search manager by neighborhood.',
          required: false,
        },
      ],
      responses: {
        '500': {
          description: 'Server error.',
        },
        '404': {
          description: 'Not found.',
        },
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                $ref: '#/components/schemas/Managers',
              },
            },
          },
        },
      },
    },
  },
  '/managers/{id}': {
    get: {
      summary: 'Search manager by his id.',
      description: 'Route to search manager by his id.',
      tags: ['Managers'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search manager by his id.',
          required: true,
        },
      ],
      responses: {
        '500': {
          description: 'Server error.',
        },
        '404': {
          description: 'Not found.',
        },
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Managers',
              },
            },
          },
        },
      },
    },
    put: {
      summary: 'Update a manager.',
      description: 'Route to update a manager',
      tags: ['Managers'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Managers',
            },
            examples: {
              manager: {
                value: {
                  email: 'manager@manager.com',
                  password: 'managerPass',
                  storeName: 'store',
                  cnpj: '010101010101012',
                  storeAddress: {
                    city: 'city',
                    neighborhood: 'neighborhood',
                    zipCode: '123456789',
                    state: 'state',
                    street: 'street',
                    number: 'number',
                    complement: 'complement',
                  },
                },
              },
            },
          },
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search manager by his id.',
          required: true,
        },
      ],
      responses: {
        '500': {
          description: 'Server error.',
        },
        '404': {
          description: 'Not found.',
        },
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                $ref: '#/components/schemas/Managers',
              },
            },
          },
        },
      },
    },
    delete: {
      summary: 'Delete manager by his id.',
      description: 'Route to delete manager by his id.',
      tags: ['Managers'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search manager by his id.',
          required: true,
        },
      ],
      responses: {
        '500': {
          description: 'Server error.',
        },
        '404': {
          description: 'Not found.',
        },
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Delete',
              },
              examples: {
                delete: {
                  value: {
                    msg: 'Deleted',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
