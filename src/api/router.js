import { applications } from '~/src/api/applications'
import { health } from '~/src/api/health'

const router = {
  plugin: {
    name: 'Router',
    register: async (server) => {
      await server.register([applications, health])
    }
  }
}

export { router }
