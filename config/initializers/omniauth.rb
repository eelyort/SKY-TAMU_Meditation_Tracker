OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '777458461645-kr4fvhfu9eqgndbems4bcukj9eso4330.apps.googleusercontent.com', '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', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end