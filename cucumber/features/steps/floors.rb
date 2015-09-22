When(/^I go to the floorplan page$/) do
  floors_page.go
end

Then(/^I should see (\d+) floorplans$/) do |floorplans|
  expect(page).to have_selector('[data-floorplan]', count: floorplans)
  take_screenshot
end

Then(/^I should see (\d+) camera pins$/) do |pins|
  expect(page).to have_selector('[data-camera-pin]', count: pins)
end

When(/^I click on camera (.+)$/) do |camera_id|
  floors_page.click_cam camera_id
end

Then(/^I should see the camera page for camera (.+)$/) do |camera_id|
  expect("#{host}#{current_path}").to eq(camera_page.url(camera_id))
end
