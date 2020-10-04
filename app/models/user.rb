class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Allowlist
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  attr_accessor :token

  has_many :notes
  has_many :chunks

  validates :name, presence: true

  def on_jwt_dispatch(token, payload)
    super
    self.token = token
  end
end
