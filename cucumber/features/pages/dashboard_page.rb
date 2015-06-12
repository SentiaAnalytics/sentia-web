# dashboard_page.rb
class DashboardPage
  include Capybara::DSL
  def url
    "#{host}/#/dashboard"
  end

  def go
    visit url
  end

  def title
    'Sentia Analytics - Dashboard'
  end
end

def dashboard_page
  @dashboard_page ||= DashboardPage.new
end
