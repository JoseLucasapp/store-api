export default {
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
}
