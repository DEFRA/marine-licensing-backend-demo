import { getApplicantsController } from '~/src/api/applicants/controllers/get-applicants'

export const applicants = {
  plugin: {
    name: 'applicants',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/applicants',
          ...getApplicantsController
        }
      ])
    }
  }
}
