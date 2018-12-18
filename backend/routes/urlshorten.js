const mongoose = require('mongoose')
const UrlShorten = mongoose.model('UrlShorten')
const validUrl = require('valid-url')
const shortid = require('short-id')
const errorUrl = 'http://localhost/error'
const express = require('express')
const app = express()

/**
 *
 * @param {app} app
 */
const routes = app => {
  app.get('/:code', async (req, res) => {
    const urlCode = req.params.code
    const item = await UrlShorten.findOne({ urlCode: urlCode })
    if (item) return res.redirect(item.originalUrl)
    else return res.redirect(errorUrl)
  })

  app.post('/', async (req, res) => {
    const { originalUrl, shortBaseUrl } = req.body
    if (!validUrl.isUri(shortBaseUrl)) return res.status(401).json('Invalid base URL.')

    const urlCode = shortid.generate()
    const updatedAt = new Date()

    if (validUrl.isUri(originalUrl)) {
      try {
        const item = await UrlShorten.findOne({ originalUrl: originalUrl })
        if (item) res.status(200).json(item)
        else {
          let shortUrl = `${shortBaseUrl}/${urlCode}`
          const item = new UrlShorten({ originalUrl, shortUrl, urlCode, updatedAt })
          await item.save()
          res.status(200).json(item)
        }
      } catch (err) { res.status(401).json('Invalid user ID.') }
    } else return res.status(401).json('Invalid original URL.')
  })
}

module.exports = routes
