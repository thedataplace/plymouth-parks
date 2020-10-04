require 'test_helper'

class TokensControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:johnsmith)
    @params = { email: @user.email, password: 'password12345' }
  end

  test 'POST /api/v1/tokens responds with success status code' do
    post api_v1_tokens_url, params: @params
    assert_response :success
  end

  test 'POST /api/v1/tokens responds with Authorization header' do
    post api_v1_tokens_url, params: @params
    assert_response :success
    assert_match 'Bearer', @response.headers['Authorization']
    assert_equal 235, @response.headers['Authorization'].length
  end
  #
  # test 'POST /api/v1/tokens responds with valid JSONAPI data' do
  #   post api_v1_tokens_url, params: @params
  #   assert_response_jsonapi
  #   assert_equal @user.email, parsed_response['data']['attributes']['email']
  # end
  #
  # test 'POST /api/v1/tokens creates whitelisted JWT' do
  #   assert_difference('WhitelistedJwt.count', +1) do
  #     post api_v1_tokens_url, params: @params
  #   end
  # end

  # test 'POST /sessions/create handles bad credentials' do
  #   bad_params = { email: @user.email, password: 'badpass' }
  #   post '/portal_data/sessions/create', params: bad_params
  #   assert_response :unauthorized
  #   assert_nil @response.headers['Authorization']
  #   response_data = JSON.parse(@response.body)
  #   assert_equal 'Authentication required', response_data['response']
  # end

  # test 'POST /sessions/destroy removes jwt and returns no content ' do
  #   assert_difference -> { AllowlistedJwt.count }, +1 do
  #     post api_v1_tokens_url, params: @params
  #   end
  #
  #   auth_token = @response.headers['Authorization']
  #
  #   assert_difference -> { AllowlistedJwt.count }, -1 do
  #     delete api_v1_tokens_url, headers: {
  #       'Content-Type': 'application/json',
  #       'Accepts': 'application/json',
  #       'Authorization': auth_token
  #     }
  #   end
  #   assert_response :no_content
  # end
end
