
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  crs: L.CRS.EPSG4326,
  attribution: '&copy; <a href="https://maps.google.com">google Maps</a> contributors.'

});

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&hl=th&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  crs: L.CRS.EPSG4326,
  attribution: '&copy; <a href="https://maps.google.com">google Maps</a> contributors.'

});

var googleTerrain = L.tileLayer('http://mt0.google.com/vt/lyrs=p&hl=th&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  crs: L.CRS.EPSG4326,
  attribution: '&copy; <a href="https://maps.google.com">google Maps</a> contributors.'

});


var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=y&hl=th&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  crs: L.CRS.EPSG4326,
  attribution: '&copy; <a href="https://maps.google.com">google Maps</a> contributors.'

});


var mymap = L.map('mapid', {
  zoomControl: false,
  // layers: [googleStreets],
  timeDimension: true,
  timeDimensionControl: true,
}).setView([12.15, 100.54], 6);


// baseMaps = {
//     'ถนน': googleStreets,
//     'ภาพถ่ายดาวเทียม': googleSat,
//     'ภูมิปรเทศ': googleTerrain,
//     'ภาพถ่ายดาวเทียมและถนน': googleHybrid,
// }



// L.control.layers(baseMaps).addTo(mymap);
var legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<select id="basemap_select" class="tiny ui floating dropdown button "><option id="terrain">ภูมิประเทศ</option><option id="road">ถนน</option><option id="satellite">ภาพถ่ายดาวเทียม</option><option id="hybrid">ภาพถ่ายดาวเทียมและถนน</option></select>';
  div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
  return div;
};
legend.addTo(mymap);

let basemaps = L.layerGroup()
  .addLayer(googleTerrain) // default layer to show
  .addTo(mymap);
var forest_area_layer = L.layerGroup();
var sf_rice_layer = L.layerGroup();
var sf_maize_layer = L.layerGroup();

var forest_area = new L.tileLayer.wms("https://csrs.ku.ac.th/geoserver/btfpws/wms", {
  layers: 'btfpws:sap2_forest_area',
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.5
}).addTo(forest_area_layer);
var sf_rice = new L.tileLayer.wms("https://csrs.ku.ac.th/geoserver/btfpws/wms", {
  layers: 'btfpws:sap2_soilfert_rice',
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.9
}).addTo(sf_rice_layer);
var sf_maize = new L.tileLayer.wms("https://csrs.ku.ac.th/geoserver/btfpws/wms", {
  layers: 'btfpws:sap2_soilfert_maize',
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.9
}).addTo(sf_maize_layer);





$('#basemap_select').on('change', function () {
  var selectedOption = $(this).find('option:selected').attr('id'); // Get the selected value
  if (selectedOption === 'road') {
    basemaps.clearLayers()
    basemaps.addLayer(googleStreets);
  } else if (selectedOption === 'satellite') {
    basemaps.clearLayers()
    basemaps.addLayer(googleSat);
  } else if (selectedOption === 'terrain') {
    basemaps.clearLayers()
    basemaps.addLayer(googleTerrain);
  } else if (selectedOption === 'hybrid') {
    basemaps.clearLayers()
    basemaps.addLayer(googleHybrid);
  }
});


const overlay = document.getElementById('map-overlay');
const overlayContent = document.querySelector('.overlay-content');
const closeOverlayBtn = document.getElementById('close-overlay');
const forest_area_label = document.getElementById('forest_area_label');


// Add event listener to open the overlay when needed
function openOverlay() {
  overlay.style.display = 'block';
}

// Add event listener to close the overlay
function closeOverlay() {
  overlay.style.display = 'none';
}

// Add event listener to open the overlay when a specific map event occurs
mymap.on('click', openOverlay);


$('.ui.accordion')
  .accordion()
  ;

$('.max.example .ui.normal.dropdown')
  .dropdown({
    maxSelections: 3
  })
  ;
$('.max.example .ui.special.dropdown')
  .dropdown({
    useLabels: false,
    maxSelections: 3
  })
  ;

$('.ui.checkbox').checkbox();


$('.ui.dropdown').dropdown();

$('.info').popup();


const radioButtons = document.querySelectorAll('input[name="radio_select_2"]');
// Add event listener to each radio button
radioButtons.forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
    // console.log(radioButton);
    const selectedValue = this.value;

    // if (checked===selectedValue) {
    //   console.log(checked);

    // }

    // Get the selected radio button's value
    // this.checked = false
    // this.checked = false;
    // radioButton.checked = false;
    // this.checked = true

    console.log(selectedValue);
    console.log(this.checked);
    // console.log(this.checked);
    // print(this.checked)
    // if (this.checked) {
    //   // Remove the checked attribute to deselect the radio button
    //   this.checked = false;
    // }
    if (selectedValue == "forest_area" && this.checked) {
      forest_area_layer.addTo(mymap)
      forest_area_layer.setZIndex(11);
      forest_area_label.style.color = 'red'
      checked = "forest_area"
    } if (selectedValue == "forest_area" && !this.checked) {
      forest_area_label.style.color = 'black'
      mymap.removeLayer(forest_area_layer);
    }
    if (selectedValue == "sf_rice" && this.checked) {
      sf_rice_layer.addTo(mymap)
      sf_rice_layer.setZIndex(10);
      sf_rice_label.style.color = 'red'
      checked = "sf_rice"
    }
    if (selectedValue == "sf_rice" && !this.checked) {
      sf_rice_label.style.color = 'black'
      mymap.removeLayer(sf_rice_layer);
    }
    if (selectedValue == "sf_maize" && this.checked) {
      sf_maize_layer.addTo(mymap)
      sf_maize_layer.setZIndex(10);
      sf_maize_label.style.color = 'red'
      checked = "sf_maize"
    }
    if (selectedValue == "sf_maize" && !this.checked) {
      sf_maize_label.style.color = 'black'
      mymap.removeLayer(sf_maize_layer);
    }


  });
});

const myButton = document.getElementById('layers-list-toggler');
const year_select = document.getElementById('map-overlay-year');
const form_select = document.getElementById('map-overlay-form');
// Add event listener to the button
myButton.addEventListener('click', function () {
  if (year_select.classList.contains('close-year')) {
    year_select.classList.remove('close-year');
    year_select.classList.add('open-year');
    form_select.classList.remove('close-form');
    form_select.classList.add('open-form');
  } else {
    year_select.classList.remove('open-year');
    year_select.classList.add('close-year');
    form_select.classList.remove('open-form');
    form_select.classList.add('close-form');
  }

  const className = this.className;

  console.log(className);
  // const value = "Some value";
  // console.log(value);
});


