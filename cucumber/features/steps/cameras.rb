Then(/^I should see (\d+) cameras$/) do |count|
  expect(page).to have_selector('[data-test=camera]', count: count)
end
