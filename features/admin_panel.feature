Feature: New Data Entry

  Scenario: Admin visits login page
    Given I am on the admin login page
    Then I should see the text "Plymouth Parks Login"

  Scenario: Admin logs in
    Given I am on the admin login page
    And the user "John Smith" exists
    When I fill in the "Email" field with "johnsmith@example.com"
    And I fill in the "Password" field with "password123"
    And I click the "Login" button
    Then I should see the text "Signed in successfully"
