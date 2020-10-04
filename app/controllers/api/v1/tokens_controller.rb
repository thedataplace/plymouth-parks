module API
  module V1
    class TokensController < Devise::SessionsController
      include ::ActionController::Cookies
      # protect_from_forgery with: :null_session
      # skip CSRF check for APIs
      # skip device auth check
      skip_before_action :verify_authenticity_token
      prepend_before_action :require_no_authentication, only: [:create]
      prepend_before_action :rewrite_auth_headers, only: [:destroy]
      before_action :rewrite_param_names, only: [:create]

      # The default method to call if Devise fails to authenticate user
      # @api public
      # @return renders json
      def new
        error = {
          title: 'Unauthorized',
          detail: 'Invalid email or password.'
        }
        render jsonapi_errors: error, status: 401
      end

      # action to authenticate a user, create a new session / token
      # @api public
      # @param auth_options [Hash] strong params for resource
      # @example POST /portal_data/sessions/create
      # @return renders jsonapi response
      def create
        self.resource = warden.authenticate!(auth_options)
        sign_in(resource_name, resource)
        yield resource if block_given?

        cookies.signed[:jwt] = {
          value: resource.token,
          httponly: true
        }

        resource.token = nil

        render jsonapi: resource
      end

      def destroy
        # sign_out(resource_name, resource)
        # yield resource if block_given?

        cookies.signed[:jwt] = nil
        # resource.token = nil

        # render jsonapi: resource
        head :no_content
      end

      private

      def rewrite_auth_headers
        warden.env['HTTP_AUTHORIZATION'] = "Bearer #{cookies.signed[:jwt]}"
      end

      # Warden uses request.params values when doing authentication,
      # so we need rewrite params from json to correct format for warden.
      # @api private
      # @request [Object] the request object
      # @example rewrite_param_names
      # @return [Hash] rewrite params
      def rewrite_param_names
        request.params[:user] = {
          email: request.params[:email],
          password: request.params[:password]
        }
      end

      # Devise defaults to redirecting users to the login page, so
      # we need to override the response to return no content
      # @api private
      # @example respond_to_on_destroy
      def respond_to_on_destroy
        cookies.delete(:jwt)
        head :no_content
      end
    end
  end
end
