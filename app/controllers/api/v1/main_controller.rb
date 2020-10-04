module API
  module V1
    class MainController < ApplicationController
      include ::ActionController::Cookies
      skip_before_action :verify_authenticity_token
      before_action :authenticate_api_user!

      def authenticate_api_user!
        warden.env['HTTP_AUTHORIZATION'] = "Bearer #{cookies.signed[:jwt]}"
        result = catch(:warden) { warden.authenticate!(scope: :user) }
        head :unauthorized if result.is_a?(Hash)
      end
    end
  end
end
