module API
  module V1
    # Registrations controller
    class RegistrationsController < Devise::SessionsController
      prepend_before_action :require_no_authentication, only: [:create]
      before_action :authenticate_with_token!, only: %I[update destroy]

      # respond_to :json

      def create
        @user = User.create(sign_up_params)

        if @user.save
          render jsonapi: @user
        else
          render status: 400, json: { message: @user.errors.full_messages }
        end
      end

      private

      def sign_up_params
        params.require(:user).permit(:email, :username, :password)
      end
    end
  end
end
