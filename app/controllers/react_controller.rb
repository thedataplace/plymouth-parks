# Controller for react views
class ReactController < ApplicationController
  include ActionView::Helpers::UrlHelper

  before_action :authenticate_user!, unless: -> { is_root_path? }

  def index
    @feature_flags = FeatureFlag.all
  end

  private

  def is_root_path?
    current_page?(root_url)
  end
end
