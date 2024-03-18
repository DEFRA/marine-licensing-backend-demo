import { getCaseController } from '~/src/api/cases/controllers/get-case'
import { getCasesController } from '~/src/api/cases/controllers/get-cases'

const cases = {
  plugin: {
    name: 'cases',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/cases',
          ...getCasesController
        },
        {
          method: 'GET',
          path: '/cases/{caseId}',
          ...getCaseController
        }
      ])
    }
  }
}

export { cases }
