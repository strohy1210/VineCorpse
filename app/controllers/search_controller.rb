class SearchController < ApplicationController
  def search
 
    vines = Vine.find_by_tag(params[:tag])
    @tag = params[:tag]
    @vines = vines[0..9]
    render :search
  end
end
