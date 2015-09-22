@dashboard
Feature: Dashboard page
  Scenario: Visit Dashboard
    Given I am logged in
    When I go to the dashboard page
    Then I should be on the dashboard page

  Scenario: Check Data
    Given I am logged in
      And I go to the dashboard page
    When I select a date range from 2015-08-02 to 2015-08-08
    Then the total revenue should be 505,475.23
      And the total people in should be 27,387
      And the basket size should be 44.36
      And the conversion should be 41.61
      And it should have loaded the charts with 54 <g>

  Scenario: Visit by url
    Given I am logged in
      And I visit /store/54318d4064acfb0b3139807e?=&from=2015-08-09&to=2015-08-22
    Then the total revenue should be 925,280.87
      And the total people in should be 50,286
      And the basket size should be 45.4
      And the conversion should be 40.53
      And it should have loaded the charts with 56 <g>
