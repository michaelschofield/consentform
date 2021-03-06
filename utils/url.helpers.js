/**
 * This request middleware checks for the "lang" query.
 * If it finds a query parameter "lang=fr" or "lang=en", it will set a "lang" cookie to whichever value.
 *
 * From this point onwards, all of the site's content will be in the user's preferred language.
 */

const oneHour = 1000 * 60 * 60 * 1

const checkLangQuery = function(req, res, next) {
  let lang = 'en'
  if (req && req.query && req.query.lang) {
    lang = req.query.lang
  }

  if (lang === 'en' || lang === 'fr') {
    res.cookie('lang', lang, {
      httpOnly: true,
      maxAge: oneHour,
      sameSite: 'strict',
    })
  }

  return next()
}

/**
 * get the domain for the app from the request obj
 */
const getDomain = req => {
  const protocol = getHostProtocol(req)

  if (!req || !req.headers || !req.headers.host) {
    throw new Error('req missing host')
  }

  const host = req.headers.host
  return `${protocol}://${host}`
}

const getHostProtocol = req => {
  if (req && req.secure) {
    return 'https'
  }

  return 'http'
}

const clientJsDir = '/js/dist/'

const getClientJsPath = req => {
  const domain = getDomain(req)
  return `${domain}${clientJsDir}`
}

module.exports = {
  checkLangQuery,
  getDomain,
  getHostProtocol,
  getClientJsPath,
  clientJsDir,
}
