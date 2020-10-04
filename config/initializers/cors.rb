Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins Rails.application.credentials.allowed_origins
    resource '*',
             headers: :any,
             methods: :any,
             expose: %w(Authorization),
             max_age: 600,
             credentials: true
  end
end
