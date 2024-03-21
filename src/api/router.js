import { applicants } from '~/src/api/applicants'
import { applications } from '~/src/api/applications'
import { health } from '~/src/api/health'
import { sites } from '~/src/api/sites'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      await server.register([applicants, applications, health, sites])
    }
  }
}

export { router }
