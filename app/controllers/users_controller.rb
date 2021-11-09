# frozen_string_literal: true

# members and admins
class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]

  # GET /users or /users.json
  def index
    @user = User.all
    render_user
  end

  # GET /users/1 or /users/1.json
  def show
    render_user
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
    format.json { render json: @user }
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.json { render json: @user, status: :ok }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.json { render json: :no_content, status: :ok }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # passback user as json for React to render it
  def render_user
    respond_to do |format|
      format.json { render json: @user, status: :ok }
    end
  end

  # Only allow a list of trusted parameters through.
  def user_params
    # params.fetch(:user)
    params.require(:user).permit(:id, :username, :firstname, :lastname, :user_type, :created_at, :updated_at)
  end
end
