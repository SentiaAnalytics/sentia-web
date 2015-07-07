# dashboard_page.rb
class DashboardPage
  include Capybara::DSL
  def url
    "#{host}/#/"
  end

  def go
    visit url
  end

  def title
    'Sentia Analytics - Dashboard'
  end

  def set_start_date(date)
    fill_in 'start-date-picker', with: "#{date}\n"
  end

  def set_end_date(date)
    fill_in 'end-date-picker', with: "#{date}\n"
  end

  def get_revenue
    find('#jhg')
    find('#total-revenue').text
  end

  def get_transactions
    find('#total-transactions').text
  end
end

def dashboard_page
  @dashboard_page ||= DashboardPage.new
end
