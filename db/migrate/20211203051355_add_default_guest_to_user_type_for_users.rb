class AddDefaultGuestToUserTypeForUsers < ActiveRecord::Migration[6.1]
  def change
    change_column_default :users, :user_type, from: 1, to: 2
  end
end
