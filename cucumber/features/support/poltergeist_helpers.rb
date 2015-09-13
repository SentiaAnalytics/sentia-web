
def register_poltergeist_driver
  puts '...using poltergeist/phantomjs'
  Capybara.register_driver :poltergeist do |app|
    Capybara::Poltergeist::Driver.new(app, poltergeist_options)
  end
  Capybara.default_driver    = :poltergeist
  Capybara.javascript_driver = :poltergeist
end

def poltergeist_options
  {
    js_errors: true,
    timeout: 120,
    debug: ENV['DEBUG'] == '1',
    phantomjs_options: %w(--load-images=no --disk-cache=false),
    inspector: true, # use page.driver.debug
    window_size: [1200, 800]
  }
end
