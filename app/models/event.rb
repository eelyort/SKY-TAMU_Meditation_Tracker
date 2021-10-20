class Event < ApplicationRecord
    validates :admin_id, presence: true
    validates :title, presence: true
    validates :time, presence: true
    validates :description, presence: true
end
