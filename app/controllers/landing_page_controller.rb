# Controller for default landing page
class LandingPageController < ApplicationController
  def index
    @feature_flags = FeatureFlag.all.to_json
  end
end
