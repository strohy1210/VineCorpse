class SearchController < ApplicationController
  def search
    if params[:tag] && params[:tag].size > 0
      vines = Vine.find_by_tag(params[:tag])
      @tag = params[:tag]
      @vines = vines[0..11]
      @movie = Movie.new
    end
  end
end