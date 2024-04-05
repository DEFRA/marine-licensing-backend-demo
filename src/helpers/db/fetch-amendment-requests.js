async function fetchAmendmentRequests() {
  return [
    {
      applicationId: 'MLA/2024/00001',
      site: {
        coordinates: {
          originalValue: '53.589459598859236, -2.168875088935083',
          comment: 'These coordinates look wrong'
        }
      }
    }
  ]
}

export { fetchAmendmentRequests }
