async function fetchApplications() {
  return [
    {
      applicationId: 'MLA/2024/00001',
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
        coordinates: `53.589459598859236, -2.168875088935083
            53.64902403831065, -2.045030160112487
            53.544392862944882, -2.01696876060703
            53.539634198638801, -2.028943897084951
            53.589459598859236, -2.16887508893508`
      }
    }
  ]
}

export { fetchApplications }
