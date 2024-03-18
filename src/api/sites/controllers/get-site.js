import Boom from '@hapi/boom'
import { isNull } from 'lodash'

export const getSiteController = {
  handler: async (request, h) => {
    const site = await request.db
      .collection('sites')
      .findOne({ siteId: request.params.siteId }, { projection: { _id: 0 } })

    if (isNull(site)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', site }).code(200)
  }
}
