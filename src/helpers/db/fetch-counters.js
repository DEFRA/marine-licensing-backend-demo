async function fetchCounters() {
  return Promise.resolve([
    {
      name: 'applicationId',
      counter: 1
    }
  ])
}

export { fetchCounters }
