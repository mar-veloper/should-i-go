module.exports = {
  async redirects() {
    return [
      {
        source: '/place',
        destination: '/',
        basePath: false,
        permanent: false,
      },
    ]
  },
}