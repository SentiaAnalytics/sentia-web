@compare
Feature: Compare page
  Scenario: Visit Compare
    Given I am logged in
    When I go to the compare page
    Then I should be on the compare page

  Scenario: Check Data
    Given I am logged in
      And I go to the compare page
    When I select group1 date range from 2015-08-02 to 2015-08-08
    And I select group2 date range from 2015-08-09 to 2015-08-15
    Then the group1 total revenue should be 505,475.23
    Then the group2 total revenue should be 453,641.65
      And the group1 total people should be 28,963
      And the group2 total people should be 26,573
      And the group1 total transactions should be 11,395
      And the group2 total transactions should be 10,196
