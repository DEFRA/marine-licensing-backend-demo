import { getSiteController } from '~/src/api/sites/controllers/get-site'
import { getSitesController } from '~/src/api/sites/controllers/get-sites'

const sites = {
  plugin: {
    name: 'sites',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/sites',
          ...getSitesController
        },
        {
          method: 'GET',
          path: '/sites/{siteId}',
          ...getSiteController
        }
      ])
    }
  }
}

export { sites }
