class VinesController < ApplicationController

  def index    
  
  end
  def destroy
    @movie= Movie.find(params[:movie_id])
    @vine= @movie.vines.find(params[:id])
    @vine.destroy
  end


end
