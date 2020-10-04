# Controller for react views
class ReactController < ApplicationController
  include ActionView::Helpers::UrlHelper

  before_action :authenticate_user!, unless: -> { root_path? }

  def index
    @feature_flags = FeatureFlag.all
  end

  private

  def root_path?
    current_page?(root_url)
  end
end
