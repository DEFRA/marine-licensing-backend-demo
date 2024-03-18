async function fetchSites() {
  return Promise.resolve([
    {
      siteId: 'df5d4b3a-83cb-4134-aa24-14e6efc197c1',
      coords: [
        {
          polygon: [
            [53.589459598859236, -2.168875088935083],
            [53.64902403831065, -2.045030160112487],
            [53.544392862944882, -2.01696876060703],
            [53.539634198638801, -2.028943897084951],
            [53.589459598859236, -2.168875088935083]
          ]
        }
      ]
    }
  ])
}

export { fetchSites }
