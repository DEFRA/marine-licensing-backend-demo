import { applications } from '~/src/api/applications'
import { admin } from '~/src/api/admin'
import { health } from '~/src/api/health'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      await server.register([applications, admin, health])
    }
  }
}

export { router }
