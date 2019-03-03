require 'application_system_test_case'

class DataEntriesTest < ApplicationSystemTestCase
  setup do
    @data_entry = data_entries(:one)
  end

  test 'creating a Data entry' do
    visit root_url

    fill_in 'Latitude', with: @data_entry.latitude
    fill_in 'Longitude', with: @data_entry.longitude
    fill_in 'Notes', with: @data_entry.notes
    fill_in 'Subtitle', with: @data_entry.subtitle
    fill_in 'Title', with: @data_entry.title
    fill_in 'Username', with: @data_entry.username

    attach_file('data_entry[image]',
                File.absolute_path('./test/fixtures/files/treepic.jpg'),
                make_visible: true)

    click_on 'Submit Data Entry'

    assert_text 'Data entry was successfully created'
  end
end
