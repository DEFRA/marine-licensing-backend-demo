async function fetchApplications() {
  return [
    {
      applicationId: 'MLA/2024/00001',
      applicationStatus: 'submitted',
      title: 'The Seaside Serenity project',
      background:
        'The Seaside Serenity project aims to create a captivating and educational experience by establishing a petting zoo specifically tailored for sea horses. Located within a picturesque coastal setting, this endeavour seeks to promote marine conservation awareness while offering visitors a unique opportunity to interact with these fascinating creatures.',
      applicant: {
        firstName: 'John',
        lastName: 'Haddock',
        address: '29 Acacia Road, Nuttytown',
        email: 'john@seahorseypettingzoo.com'
      },
      site: {
        coordinates: '53.589459598859236, -2.168875088935083'
      }
    }
  ]
}

export { fetchApplications }
