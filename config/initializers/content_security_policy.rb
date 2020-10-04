# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy
# For further information see the following documentation
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

# If you are using UJS then enable automatic nonce generation
# Rails.application.config.content_security_policy_nonce_generator = -> request { SecureRandom.base64(16) }

# Report CSP violations to a specified URI
# For further information see the following documentation:
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
# Rails.application.config.content_security_policy_report_only = true
# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy
# For further information see the following documentation
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

# rubocop:disable Metrics/BlockLength
Rails.application.config.content_security_policy do |policy|
  policy.default_src :self,
                     :https,
                     :blob,
                     'http://192.168.0.12:3000',
                     'https://parks.thedata.place'

  policy.font_src    :self, :https, :data
  policy.img_src     :self, :https, :data, :blob
  policy.object_src  :none
  policy.script_src  :self, :https
  policy.style_src   :self, :https, :unsafe_inline
  policy.worker_src  :self, :blob

  if Rails.env.development?
    policy.connect_src :self,
                       :https,
                       'http://localhost:3035',
                       'ws://localhost:3035',
                       'http://0.0.0.0:3035',
                       'ws://0.0.0.0:3035',
                       'http://gis.thedata.place',
                       'https://fresh-dragon-28.loca.lt',
                       'https://dataplace-parks.ams3.digitaloceanspaces.com'
  else
    policy.connect_src :self,
                       :https,
                       'http://gis.thedata.place',
                       'https://dataplace-parks.ams3.digitaloceanspaces.com'
  end

  # Specify URI for violation reports
  # policy.report_uri "/csp-violation-report-endpoint"
end
# rubocop:enable Metrics/BlockLength
