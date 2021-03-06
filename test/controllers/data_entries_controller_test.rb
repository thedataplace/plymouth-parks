require 'test_helper'

class DataEntriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @data_entry = data_entries(:one)
  end

  test 'should get new' do
    get new_data_entry_url
    assert_response :success
  end

  test 'should create data_entry' do
    assert_difference('DataEntry.count') do
      post data_entries_url, params: {
        data_entry: {
          latitude: @data_entry.latitude,
          longitude: @data_entry.longitude,
          notes: @data_entry.notes,
          subtitle: @data_entry.subtitle,
          title: @data_entry.title,
          username: @data_entry.username
        }
      }
    end
    assert_redirected_to root_url
  end
end
