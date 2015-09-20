# camera_page.rb
class CameraPage
  include Capybara::DSL

  def url(camera_id)
    "#{host}/store/#{store_id}/cameras/#{camera_id}"
  end

  def go
    visit url
  end

end

def camera_page
  @camera_page ||= CameraPage.new
end
