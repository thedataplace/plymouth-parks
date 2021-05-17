require 'test_helper'

class API::V2::DataEntriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:johnsmith)
    @data_entry = data_entries(:one)
    @auth_params = { email: @user.email, password: 'password12345' }
  end

  test 'should create when authorized' do
    api_sign_in @user

    post api_v2_data_entries_url,
      params: {
      data_entry: {
        latitude: @data_entry.latitude,
        longitude: @data_entry.longitude,
        notes: @data_entry.notes,
        subtitle: @data_entry.subtitle,
        title: @data_entry.title,
        username: @data_entry.username
      },
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'Authorization': @authorization_header
      }
    }

    assert_response :success
  end

  test 'should create data_entry' do
    api_sign_in @user

    assert_difference('DataEntry.count') do
      post api_v2_data_entries_url,
        params: {
        data_entry: {
          latitude: @data_entry.latitude,
          longitude: @data_entry.longitude,
          notes: @data_entry.notes,
          subtitle: @data_entry.subtitle,
          title: @data_entry.title,
          username: @data_entry.username
        },
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
          'Authorization': @authorization_header
        }
      }
    end

    assert_response :success
  end
end
