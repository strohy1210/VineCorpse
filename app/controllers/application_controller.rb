class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
  end

  def logged_in?
   !!current_user
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def login(user)
    session[:user_id] = @user.id
  end  

  def logout
    session[:user_id] = nil
  end

  helper_method :current_user, :logged_in?
end
