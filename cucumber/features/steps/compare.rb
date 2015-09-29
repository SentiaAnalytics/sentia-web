When(/^I go to the compare page$/) do
  compare_page.go
end

Then(/^I should be on the compare page$/) do
  expect(page).to have_title(compare_page.title)
end

When(/^I select (group1|group2) date range from (.+) to (.+)$/) do |group, start_date, end_date|
  compare_page.end_date(group, end_date)
  compare_page.start_date(group, start_date)
end

Then(/^the (group1|group2) total revenue should be (.+)$/) do |group, revenue|
  expect(compare_page.total_revenue(group)).to have_content(revenue)
end
Then(/^the (group1|group2) total people should be (.+)$/) do |group, people|
  expect(compare_page.total_people(group)).to have_content(people)
end

Then(/^the (group1|group2) total transactions should be (.+)$/) do |group, transactions|
  expect(compare_page.total_transactions(group)).to have_content(transactions)
end
