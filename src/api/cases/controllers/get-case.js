import Boom from '@hapi/boom'
import { isNull } from 'lodash'

export const getCaseController = {
  handler: async (request, h) => {
    const caseRecord = await request.db
      .collection('cases')
      .findOne({ caseId: request.params.caseId }, { projection: { _id: 0 } })

    if (isNull(caseRecord)) {
      return Boom.boomify(Boom.notFound())
    }

    return h.response({ message: 'success', case: caseRecord }).code(200)
  }
}
