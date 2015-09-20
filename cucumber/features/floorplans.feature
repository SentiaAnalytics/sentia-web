@floorplans
Feature: Floorplans page
  Scenario: Visit Floorplans
    Given I am logged in
    When I go to the floorplan page
    Then the page title should be Sentia Analytics - Floors
    And I should see 3 floorplans
    And I should see 14 camera pins


  Scenario: Navigato to camera
    Given I am logged in
    And I go to the floorplan page
    When I click on camera 543197da294140a43463bbeb
    Then I should see the camera page for camera 543197da294140a43463bbeb
