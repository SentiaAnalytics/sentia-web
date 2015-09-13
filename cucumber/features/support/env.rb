require 'capybara/cucumber'
require 'capybara/poltergeist'
require 'capybara-screenshot/cucumber'
require 'selenium-webdriver'
require 'rspec/core'
require 'random_data'
require File.expand_path("drivers", File.dirname(__FILE__))

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
when 'phantom'
  register_poltergeist_driver
when 'firefox'
  register_firefox_driver
else
  register_chrome_driver
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

After do |scenario|
  Cucumber.wants_to_quit = true if scenario.failed?
end
