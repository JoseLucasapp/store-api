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
  },
}
