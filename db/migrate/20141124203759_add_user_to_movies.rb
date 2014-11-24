class AddUserToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :user_id, :integer
    
  end
end
