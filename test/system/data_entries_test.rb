require "application_system_test_case"

class DataEntriesTest < ApplicationSystemTestCase
  setup do
    @data_entry = data_entries(:one)
  end

  test "visiting the index" do
    visit data_entries_url
    assert_selector "h1", text: "Data Entries"
  end

  test "creating a Data entry" do
    visit data_entries_url
    click_on "New Data Entry"

    fill_in "Latitude", with: @data_entry.latitude
    fill_in "Longitude", with: @data_entry.longitude
    fill_in "Notes", with: @data_entry.notes
    fill_in "Subtitle", with: @data_entry.subtitle
    fill_in "Title", with: @data_entry.title
    fill_in "Username", with: @data_entry.username
    click_on "Create Data entry"

    assert_text "Data entry was successfully created"
    click_on "Back"
  end

  test "updating a Data entry" do
    visit data_entries_url
    click_on "Edit", match: :first

    fill_in "Latitude", with: @data_entry.latitude
    fill_in "Longitude", with: @data_entry.longitude
    fill_in "Notes", with: @data_entry.notes
    fill_in "Subtitle", with: @data_entry.subtitle
    fill_in "Title", with: @data_entry.title
    fill_in "Username", with: @data_entry.username
    click_on "Update Data entry"

    assert_text "Data entry was successfully updated"
    click_on "Back"
  end

  test "destroying a Data entry" do
    visit data_entries_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Data entry was successfully destroyed"
  end
end
