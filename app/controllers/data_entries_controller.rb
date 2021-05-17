# Handles CRUD functionality for DataEntry records
class DataEntriesController < ApplicationController
  before_action :set_data_entry, only: %i[show edit update destroy]

  # GET /data_entries/new
  def new
    @data_entry = DataEntry.new
  end

  # POST /data_entries
  # POST /data_entries.json
  def create
    @data_entry = DataEntry.new(data_entry_params)

    respond_to do |format|
      if @data_entry.valid?
        format.html { redirect_to root_path, notice: 'Data entry was successfully created.' }
        format.json { render :show, status: :created, location: @data_entry }
      else
        format.html { render :new }
        format.json { render json: @data_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_data_entry
    @data_entry = DataEntry.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
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
