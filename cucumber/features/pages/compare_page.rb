# compare_page.rb
class Comparepage
  include Capybara::DSL
  def url
    "#{host}/stores/#{store_id}/compare"
  end

  def go
    visit url
  end

  def title
    'Sentia Analytics - Compare'
  end

  def start_date(group, date)
    find("##{group}-start-date-picker")
    fill_in "#{group}-start-date-picker", with: "#{date}\n"
  end

  def end_date(group, date)
    find("##{group}-end-date-picker")
    fill_in "#{group}-end-date-picker", with: "#{date}\n"
    find('body').click
  end

  def total_revenue (group)
    find("##{group}-total-revenue")
  end

  def total_people (group)
    find("##{group}-total-people")
  end

  def total_queue(group)
    find("##{group}-total-queue");
  end

  def total_transactions(group)
    find("##{group}-total-transactions")
  end

  def basket_size(group)
    find("##{group}-basket-size")
  end

  def conversion(group)
    find("##{group}-conversion")
  end
end

def compare_page
  @compare_page ||= Comparepage.new
end
