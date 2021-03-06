import paths from './swagger/swaggerPaths'
import components from './swagger/swaggerComponents'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Api to store system',
    description: 'Api to manage a lot of stores',
    termsOfService: 'http://localhost:3000/terms',
    contact: {
      email: 'jlgf.profissional@gmail.com',
    },
    version: '1.0.5',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Development',
    },
  ],
  paths: paths,
  components: components,
}
