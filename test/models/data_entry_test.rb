require 'test_helper'

class DataEntryTest < ActiveSupport::TestCase
  test 'responds to title and subtitle' do
    data_entry = DataEntry.new
    assert_nil data_entry.title
    assert_nil data_entry.subtitle
  end

  test 'responds to longitude and latitude' do
    data_entry = DataEntry.new
    assert_nil data_entry.longitude
    assert_nil data_entry.latitude
  end

  test 'responds to notes' do
    data_entry = DataEntry.new
    assert_nil data_entry.notes
  end

  test 'responds to username' do
    data_entry = DataEntry.new
    assert_nil data_entry.username
  end

  test 'assigns attributes on initialisation' do
    data_entry = DataEntry.new(title: 'example title',
                               subtitle: 'example subtitle',
                               longitude: 50.393756,
                               latitude: -4.149570,
                               notes: 'example notes')

    assert data_entry.valid?
  end

  test 'data entries are persisted on creation' do
    assert_difference 'DataEntry.count', 1 do
      DataEntry.create!(title: 'example title')
    end
  end
end
