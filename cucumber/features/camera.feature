@cameras
Feature: Camera page
  Scenario: visit camera page
    Given I am logged in
    When I visit /stores/54318d4064acfb0b3139807e/cameras/543197b8ab3de09c344bc1e7?date=2015-09-10
    Then the page title should be Sentia Analytics - Camera A
    And the total people in should be 2,820
    And it should have loaded the charts with 19 <g>
