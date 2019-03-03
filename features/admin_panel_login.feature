Feature: Administration panel login

  Background:
    Given an administrator named "John Smith"

  Scenario: User visits the admin login page
    Given I am on the admin login page
    Then I should see the text "Plymouth Parks Login"

  Scenario: User submits login form with valid credentials
    Given I am on the admin login page
    When I fill in the "Email" field with "johnsmith@example.com"
    And I fill in the "Password" field with "password123"
    And I click the "Login" button
    Then I should see the text "Signed in successfully"
    And I should see the text "Dashboard"

  Scenario: User trys to submit login form with invalid credentials
    Given I am on the admin login page
    When I fill in the "Email" field with "johnsmith@example.com"
    And I fill in the "Password" field with "bad password"
    And I click the "Login" button
    Then I should see the text "Invalid email or password"
    And I should not see the text "Dashboard"
