const { When, Then, After } = require('cucumber')

When(/^User performs a GET request to endpoint "(.*)" with query string "(.*)"$/, async function (endpoint, queryString) {
    await this.get(endpoint, queryString)
})

Then(/^User should get more than "(.*)" results$/, async function (results) {
    expect(this.lastResponse.destinations.length).to.be.above(results, 'There are not multiple results')
})

Then(/^User should get result "(.*)" with (id|name|apt_code|latitude|longitude) "(.*)"$/, async function (resultPosition, key, value) {
    expect(this.lastResponse.destinations[resultPosition - 1][key]).to.be.equal(value, 'The result in position ' + resultPosition + ' does not have ' + key + '=' + value)
})

After(function(){
    this.parseByCountry(this.lastResponse)
})
