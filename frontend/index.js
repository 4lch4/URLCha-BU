var endpoint = 'https://urlcha.org'

function getRandom () {
  var randomString = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5)
  return randomString
}

function getUrl () {
  var url = document.getElementById('inputUrl').value
  console.log(`getUrl(); url = ${url}`)
  var protocolOk = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://')
  console.log(`protocolOk = ${protocolOk}`)

  if (!protocolOk) return `http://${url}`
  else return url
}

function genHash () {
  if (window.location.hash === '') window.location.hash = getRandom()
}

function sendRequest (url) {
  this.url = url
  console.log(`Sending a request for ${url}`)
  console.log(`Sending that request to ${endpoint}/${window.location.hash.substr(1)}`)
  console.log(`Data = ${JSON.stringify(this.url)}`)

  $.ajax({
    'url': `${endpoint}/${window.location.hash.substr(1)}`,
    'type': 'POST',
    'data': JSON.stringify(this.url),
    'dataType': 'json',
    'contentType': 'application/json; charset=utf-8'
  })
}

function shortUrl () {
  console.log(`Running shortUrl()...`)
  var longUrl = getUrl()
  console.log(`longUrl = ${longUrl}`)
  genHash()
  console.log(`hash = ${this.window.location.hash}`)
  sendRequest(longUrl)
}

var hashh = window.location.hash.substr(1)

if (window.location.hash !== '') {
  $.getJSON(endpoint + '/' + hashh, function (data) {
    data = data['result']

    if (data != null) {
      window.location.href = data
    }
  })
}
