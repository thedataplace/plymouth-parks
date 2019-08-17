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

  test 'saves image storage url when saved ' do
    data_entry = DataEntry.new(username: 'John Smith')
    data_entry.stub :image_url, @example_image_storage_url do
      data_entry.save!
      assert_equal @example_image_storage_url, data_entry.image_storage_url
    end
  end

  test 'saves image storage url expiry date on save' do
    data_entry = DataEntry.new(username: 'John Smith')
    data_entry.stub :image_url, @example_image_storage_url do
      data_entry.save!
      assert_equal Date.today + 6.days, data_entry.image_storage_url_expiry_date
    end
  end

  test 'expiry scope returns correct records' do
    # data_entries(:with_persisted_image_storage_url)
    assert_equal 1, DataEntry.with_image_urls_near_expiry.count
  end

  test 'refreshes stale image storage urls' do
    data_entry = data_entries(:with_persisted_image_storage_url)
    new_image_storage_url = 'http://service-url.com/6789'

    DataEntry.stub_any_instance(:image_url, new_image_storage_url) do
      DataEntry.refresh_stale_image_storage_urls
      data_entry.reload
      assert_equal new_image_storage_url, data_entry.image_storage_url
    end
  end
end
