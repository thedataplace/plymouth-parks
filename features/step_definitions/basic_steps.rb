Given(/^I am on the home page$/) do
  visit('/')
end

Given(/^I am on the admin login page$/) do
  visit('/admin/login')
end

Then(/^I should see the text "(.*?)"$/) do |text|
  assert_match(/#{text}/i, page.text)
end

Then(/^I should not see the text "(.*?)"$/) do |text|
  assert_no_match(/#{text}/i, page.text)
end

When(/^I fill in the "(.*?)" field with "(.*?)"$/) do |label, input|
  fill_in(label, with: input)
end

When(/^I click the "(.*?)" button$/) do |selector|
  click_button(selector)
end

Given(/^an administrator named "(.*?)"$/) do |name|
  create_user(name)
end
