async function fetchApplicants() {
  return Promise.resolve([
    {
      applicantId: '7a78cd07-fe40-4659-bbf2-619eee442b1d',
      forename: 'John',
      surname: 'Haddock',
      address: '29 Acacia Road, Nuttytown',
      email: 'john@seahorseypettingzoo.com'
    }
  ])
}

export { fetchApplicants }
