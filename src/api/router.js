import { health } from '~/src/api/health'
import { sites } from '~/src/api/sites'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      await server.register([health, sites])
    }
  }
}

export { router }
