module API
  module V1
    # API controller for data entries
    class DataEntriesController < MainController
      # deserializable_resource :note, only: [:create, :update]
      # before_action :set_note, only: [:show, :update, :destroy]

      # GET /notes
      def index
        @data_entries = DataEntry.all

        render jsonapi: @data_entries
      end

      # GET /notes/1
      # def show
      #   render jsonapi: @note
      # end

      # POST /notes
      def create
        @data_entry = DataEntry.new(data_entry_params)

        if @data_entry.save
          render jsonapi: @data_entry, status: :created
        else
          render jsonapi_errors: @data_entry.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /notes/1
      # def update
      #   if @note.update(note_params)
      #     render jsonapi: @note
      #   else
      #     render jsonapi_errors: @note.errors, status: :unprocessable_entity
      #   end
      # end

      # DELETE /notes/1
      # def destroy
      #   @note.destroy
      # end

      private

      # Use callbacks to share common setup or constraints between actions.
      # def set_note
      #   @note = Note.find(params[:id])
      # end
      #
      # # Only allow a trusted parameter "white list" through.
      def data_entry_params
        params.require(:data_entry).permit(
          :image,
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
