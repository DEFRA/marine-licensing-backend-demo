import { postApplicationController } from '~/src/api/applications/controllers/post-application'

export const applications = {
  plugin: {
    name: 'applications',
    register: async (server) => {
      server.route([
        {
          method: 'POST',
          path: '/applications',
          ...postApplicationController
        }
      ])
    }
  }
}
