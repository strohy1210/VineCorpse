class VinesController < ApplicationController

  def index    
    @vines = Vine.find_by_tag(params[:tag])
  end
end
