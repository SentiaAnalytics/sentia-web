@floorplans
Feature: Cameras page
  Scenario: Visit Cameras
    Given I am logged in
    When I visit /stores/54318d4064acfb0b3139807e/cameras
    Then the page title should be Sentia Analytics - Cameras
    And I should see 14 cameras
