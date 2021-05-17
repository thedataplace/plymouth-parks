module API
  module V1
    # API controller for data entries
    class UsersController < MainController
      # skip_before_action :authenticate_api_user!
      # GET /notes
      def index
        render jsonapi: current_user
      end
    end
  end
end
