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
    When I select a date range
    Then the total revenue should be 123
    Then the total transactions should be 123
