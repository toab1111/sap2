/**********************************************************************************
* Map
**********************************************************************************/
/////////////////// map setting ///////////////////
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


/////////////////// basemap setting ///////////////////

let basemaps = L.layerGroup()
  .addLayer(googleHybrid)
  .addTo(mymap);

var legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML = '<select id="basemap_select" class="tiny ui floating dropdown button "><option id="hybrid">ภาพถ่ายดาวเทียมและถนน</option><option id="terrain">ภูมิประเทศ</option><option id="road">ถนน</option><option id="satellite">ภาพถ่ายดาวเทียม</option></select>';
  div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
  return div;
};
legend.addTo(mymap);

$('#basemap_select').dropdown({})
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

function openOverlay() {
  overlay.style.display = 'block';
}

function closeOverlay() {
  overlay.style.display = 'none';
}

mymap.on('click', openOverlay);

const overlay = document.getElementById('map-overlay');
const overlayContent = document.querySelector('.overlay-content');
const closeOverlayBtn = document.getElementById('close-overlay');


/////////////////// Layer setting ///////////////////

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


/**********************************************************************************
* Accordion
**********************************************************************************/

/////////////////// Accordion setting ///////////////////

$('.ui.accordion').accordion();
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

});

/**********************************************************************************
* Initializes
**********************************************************************************/
/////////////////// Year select setting ///////////////////


var yearsOption = "";
for (var yy = (new Date()).getFullYear() + 543; yy > 2557; yy--) {
  yearsOption += '<option value="' + (yy) + '">' + "ปี " + (yy) + '</option>';
}
$filterYear = $("#select_year_drop").html(yearsOption);
var $layersList = $("#layers-list");


var field_option_hotspot= ""
hotspot_field = "Hotspot"
list_month = ["01","02","04","05","10","08","07","04","05","10"]
list_year = ["2566","2565","2564","2563","2562","2566","2565","2564","2563","2562"]
for (let index = 0; index < list_month.length; index++) {
  const element = list_month[index];
  const element2 = list_year[index];
  let data_field = element2+"_"+element+"_"+hotspot_field
  field_option_hotspot+='<div class="field" data-layer="'+data_field+'"><div class="ui radio checkbox"><input type="radio" name="radio_select" value="'+data_field+'"><label>'+data_field+'</label></div></div>'
}
$hotspot_field = $(".hotspot_field").html(field_option_hotspot);


var field_option_rice= ""
field_rice = "แปลงเพาะปลูกพืชข้าว"
list_month = ["01","02","04","05","10","08","07","04","05","10"]
list_year = ["2566","2565","2564","2563","2562","2566","2565","2564","2563","2562"]
for (let index = 0; index < list_month.length; index++) {
  const element = list_month[index];
  const element2 = list_year[index];
  let data_field = element2+"_"+element+"_"+field_rice
  field_option_rice+='<div class="field" data-layer="'+data_field+'"><div class="ui radio checkbox"><input type="radio" name="radio_select" value="'+data_field+'"><label>'+data_field+'</label></div></div>'
}
$rice_field = $(".rice_field").html(field_option_rice);


var field_option_maize= ""
field_maize = "แปลงเพาะปลูกพืชข้าวโพดเลี้ยงสัตว์"
list_month = ["02","07","04","05","10","08","07","04","05","10"]
list_year = ["2566","2566","2566","2565","2565","2565","2564","2560","2561","2561"]
for (let index = 0; index < list_month.length; index++) {
  const element = list_month[index];
  const element2 = list_year[index];
  let data_field = element2+"_"+element+"_"+field_maize
  field_option_maize+='<div class="field" data-layer="'+data_field+'"><div class="ui radio checkbox"><input type="radio" name="radio_select" value="'+data_field+'"><label>'+data_field+'</label></div></div>'
}
$maize_field = $(".maize_field").html(field_option_maize);


var now_year = (new Date()).getFullYear() + 543

$layersList.find('.field:not([data-layer^="' + now_year + '"])').hide(0);
$layersList.find('.field[data-layer^="' + now_year + '"]').show(0);

/**********************************************************************************
* Filter
**********************************************************************************/
/////////////////// Year Filter setting ///////////////////

$('#select_year_drop').change(function () {
  //Use $option (with the "$") to see that the variable is a jQuery object
  var $option = $(this).find('option:selected');
  //Added with the EDIT
  var value = $option.val();//to get content of "value" attrib
  var text = $option.text();//to get <option>Text</option> content
  $('.ui.dropdown.month').dropdown('clear')
  console.log(value);
  if ((value || "").length) {
    setTimeout(function () {
      $layersList.find('.field:not([data-layer^="' + value + '"])').hide(0);
      $layersList.find('.field[data-layer^="' + value + '"]').show(0);
    }, 250);
  } else {
    setTimeout(function () {
      $layersList.find(".field[data-layer]").show(0);
    }, 250);
  }
});
$('.ui.dropdown.year').dropdown({})

/////////////////// Month Filter setting ///////////////////

$('.ui.dropdown.month').dropdown({
  onChange: function (value) {
    var year = $('#select_year_drop').val();
    var keyword = year + "_" + value + "_";
    console.log(value);
    console.log(year);

    if ((value || "").length) {
      $(this).next(".dropdown.icon")
        .removeClass("dropdown")
        .addClass("delete");

      setTimeout(function () {
        $layersList.find('.field:not([data-layer*="' + keyword + '"])').hide(0);
        $layersList.find('.field[data-layer*="' + keyword + '"]').show(0);
      }, 250);
    } else {
      setTimeout(function () {
        $layersList.find('.field[data-layer^="' + year + '"]').show(0);
      }, 250);
    }
  }
});

$('.ui.dropdown .remove.icon').on('click', function (e) {
  $(this).parent('.dropdown').dropdown('clear');
  console.log('clear');
  e.stopPropagation();
});


/**********************************************************************************
* Radio select
**********************************************************************************/

/////////////////// Radio select 1 ///////////////////

const sf_rice_label = document.getElementById('sf_rice_label');
const sf_maize_label = document.getElementById('sf_maize_label');

var all_layer = L.layerGroup();


$('.ui.radio.checkbox').checkbox({
  uncheckable: true,
  onChecked: function () {
    var $this = $(this);
    var value = $this.val();
    all_layer.clearLayers();
    console.log(value);

    if (value == "Hotspot small") {
      forest_area_layer.addTo(all_layer)
      all_layer.setZIndex(11);
      all_layer.addTo(mymap)
    }
    if (value == "Hotspot medium") {
      sf_rice_layer.addTo(all_layer)
      all_layer.setZIndex(11);
      all_layer.addTo(mymap)
    }

  },
  onUnchecked: function () {
    var $this = $(this);
    var value = $this.val();

    layersStore = []
    all_layer.clearLayers();
    mymap.removeLayer(all_layer);
    console.log(layersStore);
  }
});



/////////////////// Radio select 2 ///////////////////

$('.ui.checkbox.square').checkbox();
const forest_area_label = document.getElementById('forest_area_label');


const radioButtons2 = document.querySelectorAll('input[name="radio_select_2"]');
// Add event listener to each radio button
radioButtons2.forEach(function (radioButton) {
  radioButton.addEventListener('change', function () {
    const selectedValue = this.value;
    const sf_maize_radio = document.querySelector('#sf_maize_radio');
    const sf_rice_radio = document.querySelector('#sf_rice_radio');

    if (selectedValue == "forest_area" && this.checked) {
      forest_area_layer.addTo(mymap)
      forest_area_layer.setZIndex(11);
      forest_area_label.style.color = 'red'
    } if (selectedValue == "forest_area" && !this.checked) {
      forest_area_label.style.color = 'black'
      mymap.removeLayer(forest_area_layer);
    }
    if (selectedValue == "sf_rice" && this.checked) {
      sf_rice_layer.addTo(mymap)
      sf_rice_layer.setZIndex(10);
      sf_rice_label.style.color = 'red'
      sf_maize_radio.checked = false;
      sf_maize_label.style.color = 'black'
      mymap.removeLayer(sf_maize_layer);
    }
    if (selectedValue == "sf_rice" && !this.checked) {
      sf_rice_label.style.color = 'black'
      mymap.removeLayer(sf_rice_layer);

    }
    if (selectedValue == "sf_maize" && this.checked) {
      sf_maize_layer.addTo(mymap)
      sf_maize_layer.setZIndex(10);
      sf_maize_label.style.color = 'red'
      sf_rice_radio.checked = false;
      sf_rice_label.style.color = 'black'
      mymap.removeLayer(sf_rice_layer);
    }
    if (selectedValue == "sf_maize" && !this.checked) {
      sf_maize_label.style.color = 'black'
      mymap.removeLayer(sf_maize_layer);
    }


  });
});


$('.ui.radio.checkbox.square').checkbox({
  uncheckable: true
});


/**********************************************************************************
* Popup
**********************************************************************************/

/////////////////// Popup info ///////////////////

$('.info').popup();
