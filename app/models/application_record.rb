# Application wide configuration for controllers
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
