# helper method to create "[UserName] Smith" user
# @api public
# @param name [String] name of user
# @example create_name_smith(name)
# @return [Object] an example user object
def create_user(name)
  name_array = name.split(' ')
  firstname = name_array[0]
  lastname = name_array[1]
  username = "#{firstname.downcase}#{lastname.downcase}"

  AdminUser.create!(email: "#{username}@example.com",
                    password_confirmation: 'password123',
                    password: 'password123')
end
