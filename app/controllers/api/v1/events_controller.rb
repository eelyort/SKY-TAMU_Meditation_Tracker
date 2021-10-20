class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]

  # GET /events or /events.json
  def index
    @events = Event.all
    render json: @events
  end

  # GET /events/1 or /events/1.json
  def show
    if @event
      render json: @event
    else
      render json: @event.errors
    end
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  # POST /events or /events.json
  def create
    @event = Event.create!(event_params)
    if @event
      render json: @event
    else
      render json: @event.errors
    end
  end

  # PATCH/PUT /events/1 or /events/1.json
  def update
    if @event.update(event_params)
      render json: @event
    else
        render json: @event.errors
    end
  end

  # DELETE /events/1 or /events/1.json
  def destroy
    @event.destroy
    render json: { message: 'Event deleted!' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_params
      params.permit(:event_id, :admin_id, :title, :description, :time)
    end
end
