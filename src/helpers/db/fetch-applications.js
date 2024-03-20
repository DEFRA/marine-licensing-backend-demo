async function fetchApplications() {
  return Promise.resolve([
    {
      applicationId: 'ef6b3794-e44a-424c-a098-1c1abea19cf3',
      applicantId: '7a78cd07-fe40-4659-bbf2-619eee442b1d',
      siteId: 'df5d4b3a-83cb-4134-aa24-14e6efc197c1',
      title: 'The Seaside Serenity project',
      background:
        'The Seaside Serenity project aims to create a captivating and educational experience by establishing a petting zoo specifically tailored for sea horses. Located within a picturesque coastal setting, this endeavour seeks to promote marine conservation awareness while offering visitors a unique opportunity to interact with these fascinating creatures.',
      submittedOn: new Date(2009, 0, 1) // 01/01/2009
    }
  ])
}

export { fetchApplications }
