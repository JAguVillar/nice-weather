var placesAutocomplete = places({
  appId: 'plU99I6Y3I2Z',
  apiKey: '1cf647b42db5b6fc90b9892b48b04557',
  container: document.querySelector('#address-input'),
  templates: {
    value: function (suggestion) {
      return suggestion.name;
    }
  }
}).configure({
  type: 'city',
  aroundLatLngViaIP: false,
});

placesAutocomplete.on('change', e => console.log(e.suggestion.country));

placesAutocomplete.on('change', function (e) {
  console.log(e.suggestion.country);
});
