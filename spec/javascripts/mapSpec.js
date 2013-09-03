var emptyMap = [];

jQuery.get('http://localhost/index.html', function(data) {
  alert(data);
  emptyMap = data;
});


var map = new ROT.Map.Arkham(141, 41, emptyMap);

describe("a map of Arkham", function() {

  it("is 141 characters wide and 41 characters high", function() {
    expect(map._width).toEqual(141);
    expect(map._height).toEqual(41);
  });

  it("always has a path to the eastern tower", function() {

  });

  it("always has a path to the western tower", function() {

  });

  it("always has a path to the southern tower", function() {

  });

  it("always has a path to the northern tower", function() {

  });

});