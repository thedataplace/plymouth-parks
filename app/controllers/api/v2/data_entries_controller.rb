module API
  module V2
    # API controller for data entries
    class DataEntriesController < MainController
      # deserializable_resource :note, only: [:create, :update]
      # before_action :set_note, only: [:show, :update, :destroy]

      # GET /data_entries
      def index
        @data_entries = DataEntry.all

        render jsonapi: @data_entries
      end

      # POST /data_entries
      def create
        @data_entry = DataEntry.new(data_entry_params)

        @data_entry.image.attach(data: data_entry_params[:image])
        @data_entry.secondary_image.attach(data: data_entry_params[:secondary_image])

        if @data_entry.save
          render jsonapi: @data_entry, status: :created
        else
          render jsonapi_errors: @data_entry.errors, status: :unprocessable_entity
        end
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
