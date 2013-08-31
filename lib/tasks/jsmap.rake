namespace :jsmap do
  desc "makes an array text file from my map text file that I can easily paste into the Arkham map constructor"
  task :build => :environment do
    map_template = ''
    File.open( (File.join(Rails.root, "arkham-map.txt")) , "r") do |file|
      map_template = file.read
    end

    # split the file into lines
    map_template = map_template.split(/\n/);

    # turn each line into a string that describes an array
    map_template.each_with_index do |line, i|
      chars = line.split(//)
      chars.each_with_index do |char, j|
        chars[j] = "\'#{char}\'"
      end
      line = chars.join(',')
      map_template[i] = "[#{line}]"
    end

    # join all the lines with commas
    map_template = map_template.join(',')
    puts map_template

    # write to file
    File.open( File.join(Rails.root, "arkham-map-array.txt"), "w" ) do |file|
      file.write(map_template)
    end

  end

end
