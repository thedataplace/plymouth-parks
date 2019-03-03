require 'test_helper'

class AdminUserTest < ActiveSupport::TestCase
  test 'responds email and password' do
    admin = AdminUser.new
    assert_equal admin.email, ''
    assert_nil admin.password
  end

  test 'is valid with an email and a password' do
    admin = AdminUser.new(email: 'jsmith@gmail.com', password: 'password123')
    assert admin.valid?
  end
end
