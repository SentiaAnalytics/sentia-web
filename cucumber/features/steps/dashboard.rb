When(/^I go to the dashboard page$/) do
  dashboard_page.go
end

Then(/^I should be redirected to the dashboard page$/) do
  expect(page).to have_title(dashboard_page.title)
end

Then(/^I should be on the dashboard page$/) do
  expect(page).to have_title(dashboard_page.title)
end
