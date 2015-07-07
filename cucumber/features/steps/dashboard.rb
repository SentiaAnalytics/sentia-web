When(/^I go to the dashboard page$/) do
  dashboard_page.go
end

Then(/^I should be redirected to the dashboard page$/) do
  expect(page).to have_title(dashboard_page.title)
end

Then(/^I should be on the dashboard page$/) do
  expect(page).to have_title(dashboard_page.title)
end

When(/^I select a date range$/) do
  dashboard_page.set_start_date '2015-01-01'
  dashboard_page.set_end_date '2015-04-30'
end

Then(/^the total revenue should be (\d+)$/) do |revenue|
  expect(dashboard_page.get_revenue).to equal(revenue)
end

Then(/^the total transactions should be (\d+)$/) do |transactions|
  expect(dashboard_page.get_transactions).to equal(transactions)
end
