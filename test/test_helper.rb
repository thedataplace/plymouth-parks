ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

module ActiveSupport
  class TestCase
    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def parsed_response
      JSON.decode(@response.body)
    end

    def assert_response_jsonapi
      assert_equal %w(data jsonapi), parsed_response.keys
    end

    def jsonapi_headers
      {
        'Accept' => 'application/json',
        'CONTENT_TYPE' => 'application/vnd.api+json',
        'Authorization' => @authorization_header
      }
    end

    def api_sign_in(user)
      post api_v2_tokens_url, params: {
        email: user.email,
        password: 'password12345'
      }

      @authorization_header = @response.headers['Authorization']
    end
  end
end

class ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
end
