class Vine < ActiveRecord::Base

  def self.find_by_tag(tagname='starwars')

    json =  open(URI::encode("https://api.vineapp.com/timelines/tags/#{tagname}"))
    parsed_json = JSON.load(json)

    parsed_json["data"]["records"].collect do |record|
      Vine.new(video_url: record['videoUrl'])
    end    
  end

end
