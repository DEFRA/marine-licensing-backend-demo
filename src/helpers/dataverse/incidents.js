import Wreck from '@hapi/wreck'
import { config } from '~/src/config'
import { getHeaders, postHeaders } from '~/src/helpers/dataverse'

export const getIncidentsByContact = async (token, contactId) => {
  const { payload } = await Wreck.get(
    `${config.get('dataverseApiUrl')}/incidents?$filter=contains(contactid, '${contactId}')`,
    {
      headers: { ...getHeaders(token) }
    }
  )

  return JSON.parse(payload).value.map((incident) => ({
    number: incident.ticketnumber,
    title: incident.title,
    link: `${config.get('dynamicsUrl')}/main.aspx?appid=${config.get('dynamicsAppId')}&pagetype=entityrecord&etn=incident&id=${incident.incidentid}`
  }))
}

export const createIncident = async (
  token,
  { contactId, title, background }
) => {
  const { payload } = await Wreck.post(
    `${config.get('dataverseApiUrl')}/incidents`,
    {
      headers: { ...postHeaders(token) },
      payload: JSON.stringify({
        title,
        description: background,
        statuscode: -1,
        prioritycode: 2,
        caseorigincode: null,
        ticketnumber: null,
        'customerid_contact@odata.bind': `/contacts(${contactId})`,
        createdon: null
      })
    }
  )

  return payload
}
