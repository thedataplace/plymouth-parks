class DataEntriesController < ApplicationController
  before_action :set_data_entry, only: [:show, :edit, :update, :destroy]

  # GET /data_entries
  # GET /data_entries.json
  def index
    @data_entries = DataEntry.all
  end

  # GET /data_entries/1
  # GET /data_entries/1.json
  def show
  end

  # GET /data_entries/new
  def new
    @data_entry = DataEntry.new
  end

  # POST /data_entries
  # POST /data_entries.json
  def create
    @data_entry = DataEntry.new(data_entry_params)

    respond_to do |format|
      if @data_entry.save
        format.html { redirect_to root_path, notice: 'Data entry was successfully created.' }
        format.json { render :show, status: :created, location: @data_entry }
      else
        format.html { render :new }
        format.json { render json: @data_entry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /data_entries/1
  # DELETE /data_entries/1.json
  def destroy
    @data_entry.destroy
    respond_to do |format|
      format.html { redirect_to data_entries_url, notice: 'Data entry was successfully destroyed.' }
      format.json { head :no_content }
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
        :latitude,
        :longitude,
        :title,
        :subtitle,
        :username,
        :notes,
        :image
      )
    end
end
