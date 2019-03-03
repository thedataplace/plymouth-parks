Feature: Data Entry Form

  Background:
    Given I am on the home page

  Scenario: User visits home page
    Then I should see the text "New Data Entry"

  Scenario: User fills out text fields and submits form
    When I fill in the "Title" field with "Data entry title"
    And I fill in the "Subtitle" field with "Data entry subtitle"
    And I fill in the "Username" field with "Data entry username"
    And I fill in the "Notes" field with "Data entry notes"
    And I fill in the "Latitude" field with "50.393756"
    And I fill in the "Longitude" field with "-4.149570"
    And I click the "Submit Data Entry" button
    Then I should see the text "Data entry was successfully created."
