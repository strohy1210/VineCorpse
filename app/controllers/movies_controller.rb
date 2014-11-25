class MoviesController < ApplicationController

  def index
    @movies = Movie.all
  end

  def create
    # binding.pry
    @movie = Movie.new(movie_params)
    @movie.user = current_user
    @movie.save
    redirect_to edit_movie_path(@movie)
  end

  def edit
    @movie = Movie.find(params[:id])
    if @movie.user == current_user
      @vines = @movie.vines
    else
      flash[:danger] = "You have to be the owner of the movie to edit it! But you can view it below"
      redirect_to movie_path(@movie)
    end
  end

  def update
    @movie = Movie.find(params[:id])
    @movie.update(movie_params)
  end

  def show
    @movie = Movie.find(params[:id])
  end

  private
    def movie_params
      params.require(:movie).permit(:title, :vines_attributes => [:video_url])
    end
end
