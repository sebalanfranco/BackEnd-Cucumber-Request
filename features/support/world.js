const { setWorldConstructor } = require('cucumber')
const request = require('request-promise')
const env = require('./env')
const chai = require('chai')

function CustomWorld() {
    this.lastResponse = null
    global.expect = chai.expect

    this.get = async function(endpoint, queryString) {
        try {
            this.lastResponse = await request({
                url: this.buildUrl(endpoint, queryString),
                json: true
            })
        } catch (error) {
            throw new Exception('Error on GET request: ' + error.message)
        }
    }

    this.parseByCountry = function(response){
        let parsedResponse = ''
        response.countries.forEach(function(country){
            filteredDestinations = response.destinations.filter(function(destination){
                return country.id == destination.country_id
            }).map(function(destination){
                return destination.name
            })
            parsedResponse += country.name + ' cities: ' + filteredDestinations + '\n'
        })
        console.log(parsedResponse)
    }

    this.buildUrl = function(endpoint, queryString){
        queryString = queryString ? '?' + queryString : ''
        endpoint = endpoint ? '/' + endpoint : ''
        return env.BASE_URL + env.VERSION + endpoint + queryString
    }
}

setWorldConstructor(CustomWorld)
