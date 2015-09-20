Then(/^the page title should be (.*)$/) do |title|
  expect(page).to have_title(title)
end

When(/^I visit (.+)$/) do |path|
  visit "#{host}#{path}"
end
