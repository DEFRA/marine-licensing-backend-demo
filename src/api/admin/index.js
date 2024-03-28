import { dropDatabaseController } from '~/src/api/admin/controllers/drop-database'

export const applications = {
  plugin: {
    name: 'admin',
    register: async (server) => {
      server.route([
        {
          method: 'POST',
          path: '/admin/drop-database',
          ...dropDatabaseController
        }
      ])
    }
  }
}
