require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara-screenshot/cucumber'
require 'selenium-webdriver'
require 'rspec/core'
require 'random_data'

%w(firefox poltergeist).each do |helper|
  require File.expand_path("#{helper}_helpers", File.dirname(__FILE__))
end

def host
  @host ||= ENV['TEST_HOST'] || 'http://localhost:3000'
end
def screenshot_dir
  (ENV['CIRCLE_ARTIFACTS'] || '.') + '/screenshots/'
end
Capybara.app_host = host
Capybara.default_wait_time = 5

# drivers
case ENV['TEST_MODE'].to_s.downcase
when 'ff'
  register_firefox_driver
else
  register_poltergeist_driver
end

# Configure capybara-screenshot/cucumber
puts '=== SCREENSHOTS ==='
puts 'screenshots auto saved on failure to ./screenshots'
puts 'ENV DISABLE_FAILURE_SCREENSHOTS will do what it says on the tin'
puts 'default will prune old screenshots'
Capybara.save_and_open_page_path = screenshot_dir
Capybara::Screenshot.autosave_on_failure = false if ENV['DISABLE_SCREENSHOTS']
Capybara::Screenshot.prune_strategy = :keep_last_run

def take_screenshot
  Capybara::Screenshot.screenshot_and_save_page
end

After do |_scenario|
  # Do something after each scenario.
  # The +scenario+ argument is optional, but
  # if you use it, you can inspect status with
  # the #failed?, #passed? and #exception methods.
end
