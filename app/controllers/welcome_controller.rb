class WelcomeController < ApplicationController

  def index
    @map = []
    map_template = ''
    File.open( (File.join(Rails.root, "arkham-map.txt")) , "r") do |file|
      map_template = file.read
    end
    map_template = map_template.split(/\n/);

    map_template[0].split(//).each_with_index do |letter, i|
      @map[i] = []
    end

    map_template.each do |line|
      line = line.split(//)
      line.each_with_index do |char, j|
        @map[j] << line[j]
      end
    end

    @map

    respond_to do |format|
      format.html {}
      format.json { render json: @map }
    end
  end

end