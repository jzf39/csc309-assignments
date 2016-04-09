var map;
var geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 43.6628606,
            lng: -79.3990682
        },
        zoom: 14
    });


    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var json = xhr.responseText;
                var businesses = JSON.parse(json);
                populateMap(businesses);
            } else {
                console.log('Something went wrong');
            }
        }
    };
    xhr.open('GET', '/all');
    xhr.send();
}

function populateMap(businesses) {
    while (businesses.length == 0) {
        console.log("wait");
    };

    for (i = 0; i < businesses.length; i++) {
        var address = businesses[i].address;

        geocoder = new google.maps.Geocoder();
        if (geocoder) {

            geocoder.geocode({
                    'address': address,
                },
                makeCallback(businesses, i));
        }
    }
    console.log(businesses);
}

function makeCallback(businesses, i){
  var geoCallback = function(results, status) {
  console.log(results);

  if (status == google.maps.GeocoderStatus.OK) {
      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
          map.setCenter(results[0].geometry.location);

          var infowindow = new google.maps.InfoWindow({
              //content: '<b>' + businesses[i].name + '</b>',
              size: new google.maps.Size(150, 50)
          });

          var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: map,
              //title: address,
              name: businesses[i].name,
          });


          google.maps.event.addListener(marker, 'mouseover', function() {
             infowindow.setContent('<b>' +  marker.name + '</b>');
             infowindow.open(map, this);
          });

          google.maps.event.addListener(marker, 'mouseout', function() {
              infowindow.close();
          });

          google.maps.event.addListener(marker, 'click', function() {
              window.location.href = '/business/' + businesses[i]._id;
          });
      } else {
          alert("No results found");
      }
  } else {
      alert("Geocode was not successful for the following reason: " + status);
  }
}
  return geoCallback;
}