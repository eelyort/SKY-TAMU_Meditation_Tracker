OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '117887850590-ekck049bkcopmo0v73v5f7mt4b7afm5r.apps.googleusercontent.com', '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', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end