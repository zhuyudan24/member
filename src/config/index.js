const host = window.location.origin;

export const baseUrl = host.indexOf('localhost') > -1 ? 'http://gicdev.demogic.com' : host;

export const ERR_OK = 0;
