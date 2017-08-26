class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: {}, status: :created
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if User.delete(params['id']) == 1
      render json: {}, status: :ok
    else
      render json: ['Cannot delete user that does not exist'], status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :level)
  end
end
