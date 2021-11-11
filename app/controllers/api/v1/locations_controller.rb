# frozen_string_literal: true

module Api
  module V1
    # event locations
    class LocationsController < ApplicationController
      before_action :set_location, only: %i[show edit update destroy]
      wrap_parameters format: []

      # GET /locations or /locations.json
      def index
        @locations = Location.all.order('id ASC')
        render json: @locations
      end

      # GET /locations/1 or /locations/1.json
      def show
        if @location
          render json: @location
        else
          render json: @location.errors
        end
      end

      # GET /locations/new
      def new
        @location = Location.new
      end

      # GET /locations/1/edit
      def edit; end

      # POST /locations or /locations.json
      def create
        @location = Location.create!(location_params)
        if @location
          render json: @location
        else
          render json: @location.errors
        end
      end

      # PATCH/PUT /locations/1 or /locations/1.json
      def update
        if @location.update(location_params)
          render json: @location
        else
          render json: @location.errors
        end
      end

      # DELETE /locations/1 or /locations/1.json
      def destroy
        @location.destroy
        render json: { message: 'Location deleted!' }
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_location
        @location = Location.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def location_params
        params.permit(:event_id, :virtual_link, :building, :room, :city, :stateloc, :date, :time)
      end
    end
  end
end
