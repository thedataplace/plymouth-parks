require 'test_helper'

class API::V2::TokensControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:johnsmith)
    @params = { email: @user.email, password: 'password12345' }
  end

  test 'POST /api/v2/tokens responds with success status code' do
    post api_v2_tokens_url, params: @params
    assert_response :success
  end

  test 'POST /api/v2/tokens responds with Authorization header' do
    post api_v2_tokens_url, params: @params
    assert_response :success
    assert_match 'Bearer', @response.headers['Authorization']
    assert_equal 235, @response.headers['Authorization'].length
  end

  test 'POST /api/v2/tokens responds with valid JSONAPI data' do
    post api_v2_tokens_url, params: @params
    assert_response_jsonapi
    assert_equal @user.email, parsed_response['data']['attributes']['email']
  end

  test 'POST /api/v2/tokens creates AllowlistedJwt record' do
    assert_difference('AllowlistedJwt.count', +1) do
      post api_v2_tokens_url, params: @params
    end
  end

  test 'POST /sessions/create handles bad credentials' do
    bad_params = { email: @user.email, password: 'badpass' }
    post api_v2_tokens_url, params: bad_params
    assert_response :unauthorized
    assert_nil @response.headers['Authorization']
    response_data = JSON.parse(@response.body)

    assert_equal 'Unauthorized', response_data['errors'][0]['title']
    assert_equal 'Invalid email or password.', response_data['errors'][0]['detail']
  end

  test 'POST /sessions/destroy removes jwt and returns no content ' do
    api_sign_in @user

    assert_difference -> { AllowlistedJwt.count }, -1 do
      delete api_v2_tokens_url, headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'Authorization': @authorization_header
      }
    end
    assert_response :no_content
  end
end
