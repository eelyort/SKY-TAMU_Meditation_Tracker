# frozen_string_literal: true

# rsvp and such
class AttendancesController < ApplicationController
  before_action :set_attendance, only: %i[show edit update destroy]

  # GET /attendances or /attendances.json
  def index
    @attendance = Attendance.all.order('id ASC')
    render_attendance
  end

  # GET /attendances_with_deleted
  def index_with_deleted
    @attendance = Attendance.with_deleted.order('id ASC')
    render_attendance
  end

  # GET /attendances/1 or /attendances/1.json
  def show; end

  # GET /attendances/new
  def new
    @attendance = Attendance.new
  end

  # GET /attendances/1/edit
  def edit; end

  # POST /attendances or /attendances.json
  def create
    @attendance = Attendance.create!(attendance_params)
    respond_to do |format|
      format.json { render json: :no_content, status: :ok }
    end
  end

  # PATCH/PUT /attendances/1 or /attendances/1.json
  def update
    # respond_to do |format|
    #  if @attendance.update(attendance_params)
    #    format.html { redirect_to @attendance, notice: "Attendance was successfully updated." }
    #    format.json { render :show, status: :ok, location: @attendance }
    #  else
    #    format.html { render :edit, status: :unprocessable_entity }
    #    format.json { render json: @attendance.errors, status: :unprocessable_entity }
    #  end
    # end
  end

  # DELETE /attendances/1 or /attendances/1.json
  def destroy
    @attendance.destroy
    respond_to do |format|
      format.json { render json: :no_content, status: :ok }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_attendance
    @attendance = Attendance.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def attendance_params
    params.require(:attendance).permit(:RSVP, :event_id, :user_id, :location_id)
  end

  # passback user as json for React to render it
  def render_attendance
    respond_to do |format|
      format.json { render json: @attendance, status: :ok }
    end
  end
end
