export default {
  //ADMINS
  '/auth/login': {
    post: {
      summary: 'Route to login',
      description: 'Route to get the auth token.',
      tags: ['Auth'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Login',
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
                $ref: '#/components/schemas/Login',
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
      summary: 'Search manager by id.',
      description: 'Route to get one manager data by id.',
      tags: ['Managers'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search manager by id.',
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
  //WORKERS
  '/workers/': {
    post: {
      summary: 'Add a new worker',
      description: 'Route to create a new worker.',
      tags: ['Workers'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Workers',
            },
            examples: {
              manager: {
                value: {
                  email: 'manager@manager.com',
                  password: 'managerPass',
                  managerId: 'abc123d4e5fg67',
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
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Workers',
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Search all worker.',
      description: 'Route to search all worker',
      tags: ['Workers'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'name',
          in: 'query',
          description: 'Search worker by name.',
          required: false,
        },
        {
          name: 'role',
          in: 'query',
          description: 'Search worker by role.',
          required: false,
        },
        {
          name: 'email',
          in: 'query',
          description: 'Search worker by email.',
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
                $ref: '#/components/schemas/Workers',
              },
            },
          },
        },
      },
    },
  },
  '/workers/{id}': {
    get: {
      summary: 'Search worker by id.',
      description: 'Route to get one worker data',
      tags: ['Workers'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search worker by id.',
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
                type: 'object',
                $ref: '#/components/schemas/Workers',
              },
            },
          },
        },
      },
    },
    put: {
      summary: 'Update an worker.',
      description: 'Route to update an worker',
      tags: ['Workers'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Workers',
            },
            examples: {
              manager: {
                value: {
                  email: 'worker@worker.com',
                  password: 'worker',
                  name: 'worker',
                  role: 'role',
                  managerId: 'abc123d4e5fg67',
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
          description: 'Search worker by his id, to update.',
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
                $ref: '#/components/schemas/Workers',
              },
            },
          },
        },
      },
    },
    delete: {
      summary: 'Delete worker by his id.',
      description: 'Route to delete worker by his id.',
      tags: ['Workers'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search worker by his id, to delete.',
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
  //PRODUCTS
  '/products/': {
    post: {
      summary: 'Add a new product',
      description: 'Route to create a new product.',
      tags: ['Products'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Products',
            },
            examples: {
              manager: {
                value: {
                  productName: 'name',
                  productPrice: 1000,
                  productDescription: 'description',
                  productBrand: 'brand',
                  productAmount: 10,
                  productCategory: 'objectId',
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
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Products',
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Search all products.',
      description: 'Route to search all products',
      tags: ['Products'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'name',
          in: 'query',
          description: 'Search products by name.',
          required: false,
        },
        {
          name: 'startPrice',
          in: 'query',
          description: 'Search products by price.',
          required: false,
        },
        {
          name: 'endPrice',
          in: 'query',
          description: 'Search products by price.',
          required: false,
        },
        {
          name: 'category',
          in: 'query',
          description: 'Search products by category.',
          required: false,
        },
        {
          name: 'brand',
          in: 'query',
          description: 'Search products by brand.',
          required: false,
        },
        {
          name: 'startAmount',
          in: 'query',
          description: 'Search products by amount.',
          required: false,
        },
        {
          name: 'endAmount',
          in: 'query',
          description: 'Search products by amount.',
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
                $ref: '#/components/schemas/Products',
              },
            },
          },
        },
      },
    },
  },
  '/products/{id}': {
    get: {
      summary: 'Search product by id.',
      description: 'Route to get one product data',
      tags: ['Products'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search product by id.',
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
                type: 'object',
                $ref: '#/components/schemas/Products',
              },
            },
          },
        },
      },
    },
    put: {
      summary: 'Update a product.',
      description: 'Route to update a product',
      tags: ['Products'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Products',
            },
            examples: {
              manager: {
                value: {
                  productName: 'product new name',
                  productPrice: 200,
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
          description: 'Search product by id, to update.',
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
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
      },
    },
    delete: {
      summary: 'Delete product by id.',
      description: 'Route to delete product by id.',
      tags: ['Products'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search product by id, to delete.',
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
  //CATEGORIES
  '/categories/': {
    post: {
      summary: 'Add a new category',
      description: 'Route to create a new category.',
      tags: ['Categories'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Categories',
            },
            examples: {
              manager: {
                value: {
                  categoryName: 'category',
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
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/Categories',
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Search all categories.',
      description: 'Route to search all categories',
      tags: ['Categories'],
      security: [{ authAction: [] }],
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
                $ref: '#/components/schemas/Categories',
              },
            },
          },
        },
      },
    },
  },
  '/categories/{id}': {
    put: {
      summary: 'Update a category.',
      description: 'Route to update a category',
      tags: ['Categories'],
      security: [{ authAction: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Categories',
            },
            examples: {
              manager: {
                value: {
                  categoryName: 'category new name',
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
          description: 'Search category by id, to update.',
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
                $ref: '#/components/schemas/Categories',
              },
            },
          },
        },
      },
    },
    delete: {
      summary: 'Delete category by id.',
      description: 'Route to delete category by id.',
      tags: ['Categories'],
      security: [{ authAction: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'Search category by id, to delete.',
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
