@cameras
Feature: Camera page
  Scenario: visit camera page
    Given I am logged in
    When I visit /store/54318d4064acfb0b3139807e/cameras/543197b8ab3de09c344bc1e7?=&from=2015-01-04&to=2015-01-11
    Then the page title should be Sentia Analytics - Camera A
    And the total people in should be 12,020
    And it should have loaded the charts with 19 <g>
