# login_page.rb
class LoginPage
  include Capybara::DSL

  def url
    @url ||= "#{host}/login"
  end

  def go
    visit "#{host}/login"
  end

  def title
    'Sentia Analytics - Login'
  end

  def loginform
    find '#loginform'
  end

  def loginerror
    find '#loginerror'
  end

  def login(cred = credentials)
    within find('#loginform') do
      fill_in 'email', with: cred[:email]
      fill_in 'password', with: cred[:password]
      find('input[type=submit]').click
    end
  end
end

def login_page
  @login_page ||= LoginPage.new
end
