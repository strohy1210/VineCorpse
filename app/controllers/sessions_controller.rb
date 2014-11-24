class SessionsController < ApplicationController


  def create
    @user = User.get_user_from_omniauth(auth_hash)
    login(@user)
    redirect_to root_path
  end

  def destroy
    logout
    redirect_to root_path
  end

 private
   def auth_hash
     request.env['omniauth.auth']
   end
end



