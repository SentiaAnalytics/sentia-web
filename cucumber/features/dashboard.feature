@dashboard
Feature: Dashboard page
  Scenario: Visit Dashboard
    Given I am logged in
    When I go to the dashboard page
    Then I should be on the dashboard page

  @wip
  Scenario: Check Data
    Given I am logged in
      And I go to the dashboard page
    When I select a date range from 2015-01-01 to 2015-04-30
    Then the total revenue should be 8204641.73
      And the total transactions should be 139969
      And the basket size should be 58.62
      And the conversion should be 0.46
