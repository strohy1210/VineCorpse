class AddMovieToVines < ActiveRecord::Migration
  def change
    add_column :vines, :movie_id, :integer
  end
end
