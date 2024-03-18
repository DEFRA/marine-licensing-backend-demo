import { createLogger } from '~/src/helpers/logging/logger'
import { fetchApplicants } from '~/src/helpers/db/fetch-applicants'
import { fetchApplications } from '~/src/helpers/db/fetch-applications'
import { fetchCases } from '~/src/helpers/db/fetch-cases'
import { fetchSites } from '~/src/helpers/db/fetch-sites'

const logger = createLogger()

async function insertData(entities, newEntities) {
  await entities.deleteMany({})
  await entities.insertMany(newEntities)
  logger.info(`Inserted ${newEntities.length} ${typeof entities}`)
}

async function populateApi(mongo, db) {
  try {
    const session = mongo.startSession()
    session.startTransaction()

    const applicants = db.collection('applicants')
    const newApplicants = await fetchApplicants()
    await insertData(applicants, newApplicants)

    const applications = db.collection('applications')
    const newApplications = await fetchApplications()
    await insertData(applications, newApplications)

    const cases = db.collection('cases')
    const newCases = await fetchCases()
    await insertData(cases, newCases)

    const sites = db.collection('sites')
    const newSites = await fetchSites()
    await insertData(sites, newSites)

    await session.commitTransaction()
    logger.info('Completed data population')
  } catch (error) {
    logger.error(error)
  }
}

export { populateApi }
