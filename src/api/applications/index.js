import { postApplicationController } from '~/src/api/applications/controllers/post-application'
import { getApplicationController } from '~/src/api/applications/controllers/get-application'
import { putAmendmentRequestController } from '~/src/api/applications/controllers/put-amendment-request'
import { getAmendmentRequestController } from '~/src/api/applications/controllers/get-amendment-request'

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
        },
        {
          method: 'PUT',
          path: '/applications/{prefix}/{year}/{sequenceNumber}/amendment-request',
          ...putAmendmentRequestController
        },
        {
          method: 'GET',
          path: '/applications/{prefix}/{year}/{sequenceNumber}/amendment-request',
          ...getAmendmentRequestController
        }
      ])
    }
  }
}
