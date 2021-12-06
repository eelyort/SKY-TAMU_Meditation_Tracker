class AddDeletedAtToTables < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :deleted_at, :datetime
    add_index :users, :deleted_at

    add_column :events, :deleted_at, :datetime
    add_index :events, :deleted_at

    add_column :attendances, :deleted_at, :datetime
    add_index :attendances, :deleted_at

    add_column :locations, :deleted_at, :datetime
    add_index :locations, :deleted_at
  end
end
