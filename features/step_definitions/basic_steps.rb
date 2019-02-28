Given(/^I am on the home page$/) do
  visit('/')
end

Then(/^I should see the text "(.*?)"$/) do |text|
  assert_match(/#{text}/i, page.text)
end

When(/^I fill in the "(.*?)" field with "(.*?)"$/) do |label, input|
  fill_in(label, with: input)
end

When(/^I click the "(.*?)" button$/) do |selector|
  click_button(selector)
end
