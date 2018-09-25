Feature: Carrentals
    As a Carrentals user
    I want to request the api

    @smoke
    Scenario: Validate that API returns the correct airport for valid code search
        When User performs a GET request to endpoint "destinations" with query string "q=san"
        Then User should get more than "0" results
        And User should get result "1" with name "San Diego International Airport"
        And User should get result "1" with apt_code "SAN"

    @regression
    Scenario: Validate that API returns more than 2 results for a common request
        When User performs a GET request to endpoint "destinations" with query string "limit=100&q=san"
        Then User should get more than "2" results
