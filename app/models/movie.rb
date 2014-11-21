class Movie < ActiveRecord::Base
  has_many :vines
  accepts_nested_attributes_for :vines
  
end
