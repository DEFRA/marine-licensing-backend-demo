import { postApplicationController } from '~/src/api/applications/controllers/post-application'
import { getApplicationController } from '~/src/api/applications/controllers/get-application'

export const applications = {
  plugin: {
    name: 'applications',
    register: async (server) => {
      server.route([
        {
          method: 'POST',
          path: '/applications',
          ...postApplicationController
        },
        {
          method: 'GET',
          path: '/applications/{prefix}/{year}/{sequenceNumber}',
          ...getApplicationController
        }
      ])
    }
  }
}
