def register_firefox_driver
  puts '...using selenium/firefox'
  Capybara.default_driver = :selenium
end
