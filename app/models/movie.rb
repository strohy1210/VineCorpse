class Movie < ActiveRecord::Base
  has_many :vines
  accepts_nested_attributes_for :vines
  belongs_to :user

  before_save :set_default_title_on_empty

  private
  def set_default_title_on_empty
    self.title = 'Untitled' if self.title.empty?
  end
  
end
