# floors_page.rb
class FloorsPage
  include Capybara::DSL

  def url
    @url ||= "#{host}/store/#{store_id}/floors"
  end

  def go
    visit url
  end

  def click_cam(camera_id)
    find("[data-camera-pin='#{camera_id}']").click
  end

end

def floors_page
  @floors_page ||= FloorsPage.new
end
