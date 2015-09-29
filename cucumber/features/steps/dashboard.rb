When(/^I go to the dashboard page$/) do
  dashboard_page.go
end

Then(/^I should be redirected to the dashboard page$/) do
  expect(page).to have_title(dashboard_page.title)
end

Then(/^I should be on the dashboard page$/) do
  expect(page).to have_title(dashboard_page.title)
end

When(/^I select a date range from (.+) to (.+)$/) do |start_date, end_date|
  dashboard_page.end_date end_date
  dashboard_page.start_date start_date
end

Then(/^the total revenue should be (.+)$/) do |revenue|
  expect(dashboard_page.total_revenue).to have_content(revenue)
end

Then(/^the total transactions should be (.+)$/) do |transactions|
  expect(dashboard_page.total_transactions).to have_content(transactions)
end

Then(/^the average queue should be (.+)$/) do |queue|
  expect(dashboard_page.total_queue).to have_content(queue)
end



Then(/^the basket size should be (.+)$/) do |basket_size|
  expect(dashboard_page.basket_size).to have_content(basket_size)
end

Then(/^the conversion should be (.+)$/) do |conversion|
  expect(dashboard_page.conversion).to have_content(conversion)
end
