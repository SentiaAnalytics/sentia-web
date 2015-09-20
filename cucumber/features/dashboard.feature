@dashboard
Feature: Dashboard page
  Scenario: Visit Dashboard
    Given I am logged in
    When I go to the dashboard page
    Then I should be on the dashboard page

  Scenario: Check Data
    Given I am logged in
      And I go to the dashboard page
    When I select a date range from 2015-01-01 to 2015-04-30
    Then the total revenue should be 8204641.73
      And the basket size should be 58.62
      And the conversion should be 47.15
      And it should have loaded the charts with 45 <g>

  Scenario: Visit by url
    Given I am logged in
      And I visit /store/54318d4064acfb0b3139807e?=&from=2015-01-04&to=2015-01-11
    Then the total revenue should be 391835.34
      And the basket size should be 59.07
      And the conversion should be 55.18
      And it should have loaded the charts with 57 <g>
