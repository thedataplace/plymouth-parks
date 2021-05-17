require 'test_helper'
require 'minitest/mock'

class DataEntryTest < ActiveSupport::TestCase
  setup do
    @example_image_storage_url = 'http://service-url.com/12345'
  end

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

  test 'expiry scope returns correct records' do
    assert_equal 1, DataEntry.with_image_urls_near_expiry.count
  end
end
