class WelcomeController < ApplicationController

  def index
    map = []
    map_template = ''
    File.open( (File.join(Rails.root, "arkham-map.txt")) , "r") do |file|
      map_template = file.read
    end
    map_template = map_template.split(/\n/);
    map_template.each_with_index do |line, i|
      map[i] = []
      line = line.split(//)
      line.each_with_index do |char, j|
        map[i] << line[j]
      end
    end

    map
  end

  def map
  end

end