Then(/^the page title should be (.*)$/) do |title|
  expect(page).to have_title(title)
end

When(/^I visit (.+)$/) do |path|
  visit "#{host}#{path}"
end

Then(/^the total people in should be (.+)$/) do |people|
  expect(find('#total-people')).to have_content(people)
  take_screenshot
end

Then(/^it should have loaded the charts with (\d+) <g>$/) do |count|
  expect(page).to have_selector('g', count: count)
end