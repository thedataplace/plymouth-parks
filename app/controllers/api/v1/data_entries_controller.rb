module API
  module V1
    # API controller for data entries
    class DataEntriesController < MainController
      # GET /notes
      def index
        @data_entries = DataEntry.all

        render jsonapi: @data_entries
      end

      # POST /notes
      def create
        @data_entry = DataEntry.new(data_entry_params)

        # rubocop:disable Style/RescueStandardError
        begin
          # NOTE: This is a hack to get around an issue with S3 images saving
          # and timing issues with the after_save callback.
          @data_entry.save!
          @data_entry.save_image_storage_url!

          render jsonapi: @data_entry, status: :created
        rescue
          render jsonapi_errors: @data_entry.errors, status: :unprocessable_entity
        end
        # rubocop:enable Style/RescueStandardError
      end

      private

      # Only allow a trusted parameter "white list" through.
      def data_entry_params
        params.require(:data_entry).permit(
          :image,
          :secondary_image,
          :latitude,
          :longitude,
          :notes,
          :subtitle,
          :title,
          :username
        )
      end
    end
  end
end
