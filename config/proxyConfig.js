module.exports = {
  proxyConfig: {
    '/api-auth/': {
      target: 'http:gicdev.demogic.com/api-auth/',
      changeOrigin: true,
      pathRewrite: {
        '^/api-auth': ''
      }
    },
    '/api-member/': {
      target: 'http:gicdev.demogic.com/api-member/',
      changeOrigin: true,
      pathRewrite: {
        '^/api-member': ''
      }
    },
    '/api-plug/': {
      target: 'http:gicdev.demogic.com/api-plug/',
      changeOrigin: true,
      pathRewrite: {
        '^/api-plug': ''
      }
    },
    '/api-admin/': {
      target: 'http:gicdev.demogic.com/api-admin/',
      changeOrigin: true,
      pathRewrite: {
        '^/api-admin': ''
      }
    }
  }
}
