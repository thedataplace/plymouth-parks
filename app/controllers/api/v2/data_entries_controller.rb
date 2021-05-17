module API
  module V2
    # API controller for data entries
    class DataEntriesController < MainController
      # GET /data_entries
      def index
        @data_entries = DataEntry.all

        render jsonapi: @data_entries
      end

      # POST /data_entries
      def create
        set_data_entry

        # rubocop:disable Style/RescueStandardError
        begin
          # NOTE: This is a hack to get around an issue with S3 images saving and timing issues with the after_save.
          @data_entry.save!
          @data_entry.save_image_storage_url!
          render jsonapi: @data_entry, status: :created
        rescue
          render jsonapi_errors: @data_entry.errors, status: :unprocessable_entity
        end
        # rubocop:enable Style/RescueStandardError
      end

      def set_data_entry
        @data_entry = DataEntry.new(data_entry_params)

        primary_image = data_entry_params[:image]
        secondary_image = data_entry_params[:secondary_image]

        @data_entry.image.attach(data: primary_image) if primary_image
        @data_entry.secondary_image.attach(data: secondary_image) if secondary_image
      end

      private

      # Only allow a trusted parameter "allow list" through.
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
