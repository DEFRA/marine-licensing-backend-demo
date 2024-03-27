async function fetchCounters() {
  return Promise.resolve([
    {
      name: 'applicationId',
      counter: 2
    }
  ])
}

export { fetchCounters }
