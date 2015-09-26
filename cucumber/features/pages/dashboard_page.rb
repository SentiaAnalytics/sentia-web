# dashboard_page.rb
class DashboardPage
  include Capybara::DSL
  def url
    "#{host}/"
  end

  def go
    visit url
  end

  def title
    'Sentia Analytics - Dashboard'
  end

  def start_date(date)
    find('#start-date-picker')
    fill_in 'start-date-picker', with: "#{date}\n\t"
  end

  def end_date(date)
    find('#end-date-picker')
    fill_in 'end-date-picker', with: "#{date}\n\t"
    find('body').click
  end

  def total_revenue
    find('#total-revenue')
  end

  def total_queue
    find('#total-queue');
  end

  def total_transactions
    find('#total-transactions')
  end

  def basket_size
    find('#basket-size')
  end

  def conversion
    find('#conversion')
  end
end

def dashboard_page
  @dashboard_page ||= DashboardPage.new
end
