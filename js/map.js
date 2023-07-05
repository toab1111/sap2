/**********************************************************************************
* Url/layer/style geoserver wms
**********************************************************************************/
const forest_area_url = "https://csrs.ku.ac.th/geoserver/btfpws/wms"
const forest_area_layer_name = 'btfpws:sap2_forest_area'

const forest_protected_area_url = "http://localhost:8080/geoserver/forest/wms"
const forest_protected_layer_name = 'forest:forest'
const forest_protected_style_name = 'forest:forest4'

const sf_rice_url = "http://localhost:8080/geoserver/sf_rice/wms"
const sf_rice_layer_name = 'sf_rice:sf_rice_all'
const sf_rice_style_name = 'sf_rice:sf_rice'

const sf_maize_url = "https://csrs.ku.ac.th/geoserver/btfpws/wms"

const hotspot_url = "http://localhost:8080/geoserver/test_hospot/wms"
const hotspot_layer_name = 'test_hospot:hotspot_test'
const hotspot_style_name = 'test_hospot:hotspot'

const maize_tif_url = "http://localhost:8080/geoserver/maize_tif/wms"
const maize_tif_style_name = "raster"


const rice_tif_url = "http://localhost:8080/geoserver/rice_tif/wms"
const rice_tif_style_name = "raster"



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

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors  <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20
});

var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  maxZoom: 20,
  ext: 'png'
});


var mymap = L.map('mapid', {
  zoomControl: false,
  layers: [CartoDB_Positron],
  timeDimension: true,
  timeDimensionControl: true,
}).setView([12.15, 100.54], 6);



/////////////////// basemap setting ///////////////////


var baseMaps = {
  "CartoDB Positron": CartoDB_Positron,
  "Stamen TonerBackground": Stamen_TonerBackground,
  "ถนน": googleStreets,
  "ภูมืประเทศ": googleTerrain,
  "ภาพถ่ายดาวเทียม": googleSat,
  "ภาพถ่ายดาวเทียมและถนน": googleHybrid
};



var layerControl = L.control.layers(baseMaps).addTo(mymap);


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
var forest_protected_area_layer = L.layerGroup();
var sf_rice_layer = L.layerGroup();
var sf_maize_layer = L.layerGroup();
var hotspot_layer = L.layerGroup();
var maize_layer = L.layerGroup();

var forest_area = new L.tileLayer.wms(forest_area_url, {
  layers: forest_area_layer_name,
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.8,
}).addTo(forest_area_layer);

var forest_protected_area = new L.tileLayer.wms(forest_protected_area_url, {
  layers: forest_protected_layer_name,
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.7,
  STYLES: forest_protected_style_name,
  attribution: '| ข้อมูลแนวเขตป่าสงวนแห่งชาติจาก &copy; <a href="https://data.forest.go.th/dataset/reserve_forest/resource/971b289e-dd9f-4539-8305-c9b5099994b4?inner_span=True">data.forest.go.th</a>',
}).addTo(forest_protected_area_layer);

var sf_rice = new L.tileLayer.wms(sf_rice_url, {
  layers: sf_rice_layer_name,
  format: 'image/png',
  transparent: true,
  version: '1.1.1',
  STYLES: sf_rice_style_name,
  opacity: 0.5
}).addTo(sf_rice_layer);
var sf_maize = new L.tileLayer.wms(sf_maize_url, {
  layers: 'btfpws:sap2_soilfert_maize',
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.5
}).addTo(sf_maize_layer);



// var rice_test = new L.tileLayer.wms("http://localhost:8080/geoserver/maize_tif/wms", {
//   layers: '	maize_tif:20221231_maize.tif',
//   format: 'image/png',
//   transparent: true,
//   version: '1.1.0',
//   STYLES: "maize_tif:raster"
// }).addTo(maize_layer);


// maize_layer.addTo(mymap);
// maize_layer.setZIndex(12);


/**********************************************************************************
* Accordion
**********************************************************************************/

/////////////////// Accordion setting ///////////////////

$('.ui.accordion').accordion();
const myButton = document.getElementById('layers-list-toggler');
const clearLayer = document.getElementById('clear-select');
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

clearLayer.addEventListener('click', function () {
  rice_maize_layer.clearLayers();
  all_layer.clearLayers()
  mymap.removeLayer(sf_maize_layer);
  mymap.removeLayer(sf_rice_layer);
  mymap.removeLayer(forest_area_layer);
  mymap.removeLayer(forest_protected_area_layer);
  legend_forst.style.display = 'none'
  maize_legend.style.display = 'none'
  rice_legend.style.display = 'none'
  sf_legend.style.display = 'none'
  hotspot_legend.style.display = "none"
  title_hotspot_label.style.color = 'black'
  sf_maize_title_label.style.color = 'black'
  title_rice_label.style.color = 'black'
  title_maize_label.style.color = 'black'
  sf_rice_title_label.style.color = 'black'
  forest_area_label.style.color = 'black'
  $('.checkbox input[type="radio"]').prop('checked', false);
  $('.checkbox input[type="checkbox"]').prop('checked', false);
})

/**********************************************************************************
* Initializes
**********************************************************************************/
/////////////////// Year select setting ///////////////////

var startDay = 1;
var startMonth = 1;
var startYear = 2021;

// Create the start date object
var startDate = new Date(startYear, startMonth - 1, startDay);

// Get the current date object
var currentDate = new Date();

// Loop through the dates from the start date to the current date
list_date = []
while (startDate <= currentDate) {
  dateFormat1 = moment(startDate).format('YYYY_MM_DD');
  list_date.unshift(dateFormat1)

  // Increment the date by one day
  startDate.setDate(startDate.getDate() + 1);
}
list_date.shift()  // Delete now days

var yearsOption = "";
for (var yy = (new Date()).getFullYear(); yy > 2020; yy--) {
  yearsOption += '<option value="' + (yy) + '">' + "ปี " + (yy) + '</option>';
}
$filterYear = $("#select_year_drop").html(yearsOption);
var $layersList = $("#layers-list");

const thaiMonthAbbreviations = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];


function getLastDayOfMonth(year, month) {
  // Month in JavaScript starts from 0 (January is 0, February is 1, and so on)
  const lastDay = new Date(year, month, 0).getDate();
  return lastDay;
}

function getMonthYearPairs(startDate) {
  const currentDate = new Date();
  const startMonth = startDate.getMonth();
  const startYear = startDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthYearPairs = [];

  let year = startYear;
  let month = startMonth;

  while (year <= currentYear) {
    while ((year < currentYear && month <= 11) || (year === currentYear && month <= currentMonth)) {
      monthYearPairs.push({ month: month + 1, year });
      month++;
    }
    month = 0;
    year++;
  }

  return monthYearPairs;
}


/////////////////// Rice select setting ///////////////////

let list_date_rice = ["16_28_02_2023"]
const startDateRice = new Date("2023-03-01");
const monthYearPairsRice = getMonthYearPairs(startDateRice);
for (let index = 0; index < monthYearPairsRice.length; index++) {
  const element = monthYearPairsRice[index];
  let mouth_ = ('00' + element.month).slice(-2);
  let mouth_check = ('00' + (element.month + 1)).slice(-2);
  let year_ = element.year
  const lastDay = getLastDayOfMonth(element.year, element.month);
  const checkDate = new Date(year_ + "-" + mouth_check + "-" + "01");
  /// check date is first day of mouth of next mouth 
  if (currentDate > checkDate) {
    first_pe = "01_" + "15_" + mouth_ + "_" + year_
    last_pe = "16_" + lastDay + "_" + mouth_ + "_" + year_
    list_date_rice.push(first_pe)
    list_date_rice.push(last_pe)
  }
  if (currentDate.getDate() > 15 && currentDate.getMonth() + 1 == element.month) {
    first_pe = "01_" + "15_" + mouth_ + "_" + year_
    list_date_rice.push(first_pe)
  }

}
list_date_rice = list_date_rice.reverse();


var field_option_rice = ""
field_rice = "rice"


for (let index = 0; index < list_date_rice.length; index++) {

  const element = list_date_rice[index];
  var year = element.split("_")[3]
  var month = element.split("_")[2]
  var day_end = element.split("_")[1]
  var day_start = element.split("_")[0]
  let data_field = year + "_" + month + "_" + day_end
  let data_value = year + "_" + month + "_" + day_end + "_" + field_rice
  let data_label = day_start + " - " + day_end + " " + thaiMonthAbbreviations[parseInt(month) - 1] + " " + year
  field_option_rice += '<div class="field" data-layer="' + data_field + '"><div class="ui radio checkbox"><input type="radio" name="radio_select_farm" value="' + data_value + '"><label>' + data_label + '</label></div></div>'
}
$rice_field = $(".rice_field").html(field_option_rice);


/////////////////// Maize select setting ///////////////////

let list_date_maize = ["16_31_12_2022"]
const startDateMaize = new Date("2023-01-01");
const monthYearPairsMaize = getMonthYearPairs(startDateMaize);
for (let index = 0; index < monthYearPairsMaize.length; index++) {
  const element = monthYearPairsMaize[index];
  let mouth_ = ('00' + element.month).slice(-2);
  let mouth_check = ('00' + (element.month + 1)).slice(-2);
  let year_ = element.year
  const lastDay = getLastDayOfMonth(element.year, element.month);
  const checkDate = new Date(year_ + "-" + mouth_check + "-" + "01");
  /// check date is first day of mouth of next mouth 
  if (currentDate > checkDate) {
    first_pe = "01_" + "15_" + mouth_ + "_" + year_
    last_pe = "16_" + lastDay + "_" + mouth_ + "_" + year_
    list_date_maize.push(first_pe)
    list_date_maize.push(last_pe)
  }
  if (currentDate.getDate() > 15 && currentDate.getMonth() + 1 == element.month) {
    first_pe = "01_" + "15_" + mouth_ + "_" + year_
    list_date_maize.push(first_pe)
  }

}
list_date_maize = list_date_maize.reverse();

var field_option_maize = ""
field_maize = "maize"

for (let index = 0; index < list_date_maize.length; index++) {
  const element = list_date_maize[index];
  var year = element.split("_")[3]
  var month = element.split("_")[2]
  var day_end = element.split("_")[1]
  var day_start = element.split("_")[0]
  let data_field = year + "_" + month + "_" + day_end
  let data_value = year + "_" + month + "_" + day_end + "_" + field_maize
  let data_label = day_start + " - " + day_end + " " + thaiMonthAbbreviations[parseInt(month) - 1] + " " + year
  field_option_maize += '<div class="field" data-layer="' + data_field + '"><div class="ui radio checkbox"><input type="radio" name="radio_select_farm" value="' + data_value + '"><label>' + data_label + '</label></div></div>'
}
$maize_field = $(".maize_field").html(field_option_maize);


/////////////////// Hotspot select setting ///////////////////

var field_option_hotspot = ""
hotspot_field = "Hotspot"
for (let index = 0; index < list_date.length; index++) {
  const element = list_date[index];
  let year = element.split("_")[0]
  let month = element.split("_")[1]
  let day = element.split("_")[2]
  let month_th = thaiMonthAbbreviations[parseInt(month) - 1]
  let data_field = element + "_" + hotspot_field
  let data_label = day + " " + month_th + " " + year
  field_option_hotspot += '<div class="field day-field" data-layer="' + data_field + '"><div class="ui radio checkbox"><input type="radio" name="radio_select" value="' + data_field + '"><label>' + data_label + '</label></div></div>'
}
$hotspot_field = $(".hotspot_field").html(field_option_hotspot);



/////////////////// default when open web is select now year ///////////////////

var now_year = (new Date()).getFullYear()

$layersList.find('.field:not([data-layer^="' + now_year + '"])').hide(0);
$layersList.find('.field[data-layer^="' + now_year + '"]').show(0);



/**********************************************************************************
* Filter
**********************************************************************************/

/////////////////// Year Filter setting ///////////////////

$('#select_year_drop').change(function () {
  // $('input[type=radio][name=radio_select_rice]').prop('checked',false);  //clear radio button
  var $option = $(this).find('option:selected');
  var value = $option.val();//to get content of "value" attrib
  var text = $option.text();//to get <option>Text</option> content
  $('.ui.dropdown.month').dropdown('clear')
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


    if ((value || "").length) {
      $(this).next(".dropdown.icon")
        .removeClass("dropdown")
        .addClass("delete");

      setTimeout(function () {
        $layersList.find('.field:not([data-layer*="' + keyword + '"])').hide(0);
        $layersList.find('.field[data-layer*="' + keyword + '"]').show(0);
        // day_filter()

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
  // day_filter()

  e.stopPropagation();
});


/**********************************************************************************
* Radio select
**********************************************************************************/

/////////////////// Radio select 1 ///////////////////
function update_hotspot_area(CQL_FILTER) {
  all_layer.clearLayers()
  var hotspot_layer = new L.tileLayer.wms(hotspot_url, {
    layers: hotspot_layer_name,
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    exceptions: 'application/vnd.ogc.se_inimage',
    STYLES: hotspot_style_name,
    CQL_FILTER: CQL_FILTER,
  })

  hotspot_layer.addTo(all_layer)
  all_layer.setZIndex(15);
  all_layer.addTo(mymap)

}

function update_rice_area(date_layer) {
  layers = "rice_" + date_layer + ".tif"
  var rice = new L.tileLayer.wms(rice_tif_url, {
    layers: layers,
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    STYLES: rice_tif_style_name,
    exceptions: 'application/vnd.ogc.se_inimage',
    opacity: 0.8
  }).addTo(rice_maize_layer);
  rice.addTo(rice_maize_layer);
  rice_maize_layer.addTo(mymap);
  rice_maize_layer.setZIndex(12);

}

function update_maize_area(date_layer) {
  layers = date_layer + "_" + "maize" + ".tif"
  if (layers == "20230615_maize.tif") {
    layers = "maize_20230615" + ".tif"
  }

  var maize = new L.tileLayer.wms(maize_tif_url, {
    layers: layers,
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    exceptions: 'application/vnd.ogc.se_inimage',
    STYLES: maize_tif_style_name,
    opacity: 0.8
  }).addTo(rice_maize_layer);
  maize.addTo(rice_maize_layer);
  rice_maize_layer.addTo(mymap);
  rice_maize_layer.setZIndex(12);

}

let scr_date_query = ""

function date_firms_VIIRS(date) {
  var scr = "ACQ_DATE = "
  var date = date
  var scr_date = scr + "'" + date + "'"
  scr_date_query = scr_date
  return scr_date
}


const sf_rice_title_label = document.getElementById('title-sf-rice');
const sf_maize_title_label = document.getElementById('title-sf-maize');
const legend_forst = document.getElementById('legend-forst');
const hotspot_legend = document.getElementById('legend-hotspot');
const maize_legend = document.getElementById('legend-maize');
const rice_legend = document.getElementById('legend-rice');
const sf_legend = document.getElementById('legend-sf');

const title_rice_label = document.getElementById('title-rice');
const title_maize_label = document.getElementById('title-maize');
const title_hotspot_label = document.getElementById('title-hotspot');

var all_layer = L.layerGroup();
var rice_maize_layer = L.layerGroup();

$('.ui.radio.checkbox').checkbox({
  uncheckable: true,
  onChecked: function () {
    var $this = $(this);
    var value = $this.val();
    const myArray = value.split("_");
    let type_layer = myArray[3]
    let date_cq = myArray[0] + "-" + myArray[1] + "-" + myArray[2]
    let date_rice_maize = myArray[0] + myArray[1] + myArray[2]

    if (type_layer == "Hotspot") {
      all_layer.clearLayers();
      update_hotspot_area(date_firms_VIIRS(date_cq))
      title_hotspot_label.style.color = 'red'
      hotspot_legend.style.display = "block"

    } if (type_layer == "rice") {
      rice_maize_layer.clearLayers();
      update_rice_area(date_rice_maize)
      title_rice_label.style.color = 'red'
      title_maize_label.style.color = 'black'
      rice_legend.style.display = "block"
      maize_legend.style.display = "none"
      // legend_forst.style.bottom = '335px'

    } if (type_layer == "maize") {
      rice_maize_layer.clearLayers();
      update_maize_area(date_rice_maize)
      title_maize_label.style.color = 'red'
      title_rice_label.style.color = 'black'
      maize_legend.style.display = "block"
      rice_legend.style.display = "none"
      // legend_forst.style.bottom = '335px'

    }

  },
  onUnchecked: function () {
    var $this = $(this);
    var value = $this.val();
    const myArray = value.split("_");
    let type_layer = myArray[3]
    if (type_layer == "Hotspot") {
      all_layer.clearLayers();
      mymap.removeLayer(all_layer);
      title_hotspot_label.style.color = 'black'
      hotspot_legend.style.display = "none"
    }
    if (type_layer == "rice") {
      rice_maize_layer.clearLayers();
      mymap.removeLayer(rice_maize_layer);
      title_rice_label.style.color = 'black'
      rice_legend.style.display = "none"
      // legend_forst.style.bottom = '70px'
    }
    if (type_layer == "maize") {
      rice_maize_layer.clearLayers();
      mymap.removeLayer(rice_maize_layer);
      title_maize_label.style.color = 'black'
      sf_maize_title_label.style.color = 'black'
      maize_legend.style.display = "none"
      // legend_forst.style.bottom = '70px'

    }



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
    const selectedValue_split = selectedValue.split('_')[0]

    if (selectedValue == "forest_area" && this.checked) {
      forest_area_layer.addTo(mymap)
      forest_area_layer.setZIndex(11);
      forest_protected_area_layer.addTo(mymap)
      forest_protected_area_layer.setZIndex(15);
      forest_area_label.style.color = 'red'
      legend_forst.style.display = 'block'
    } if (selectedValue == "forest_area" && !this.checked) {
      forest_area_label.style.color = 'black'
      legend_forst.style.display = 'none'
      mymap.removeLayer(forest_area_layer);
      mymap.removeLayer(forest_protected_area_layer);

    }

    if (selectedValue_split == "sf-rice" && this.checked) {
      sf_rice_layer.addTo(mymap)
      sf_rice_layer.setZIndex(10);
      sf_rice_title_label.style.color = 'red'
      sf_maize_title_label.style.color = 'black'
      sf_maize_radio.checked = false;
      sf_legend.style.display = 'block'

      mymap.removeLayer(sf_maize_layer);
    }
    if (selectedValue_split == "sf-rice" && !this.checked) {
      sf_rice_title_label.style.color = 'black'
      sf_legend.style.display = 'none'

      mymap.removeLayer(sf_rice_layer);

    }
    if (selectedValue_split == "sf-maize" && this.checked) {
      sf_maize_layer.addTo(mymap)
      sf_maize_layer.setZIndex(10);
      sf_maize_title_label.style.color = 'red'
      sf_rice_radio.checked = false;
      sf_rice_title_label.style.color = 'black'
      sf_legend.style.display = 'block'

      mymap.removeLayer(sf_rice_layer);
    }
    if (selectedValue_split == "sf-maize" && !this.checked) {
      sf_maize_title_label.style.color = 'black'
      sf_legend.style.display = 'none'
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


function sting_date(str) {
  year = str.slice(0, 4)
  month = str.slice(4, 6)
  day = str.slice(6, 8)
  date = year + "-" + month + "-" + day
  if (day == "15") {
    date_select = "01" + "_" + day + "_" + month + "_" + year
  } else {
    date_select = 16 + "_" + day + "_" + month + "_" + year
  }
  return date_select
}


// async function check_rice(x) {
//   const response = await axios({
//     method: 'get',
//     url: 'http://localhost:8080/geoserver/rest/workspaces/rice_tif/coveragestores.json',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       "Content-Type": 'application/json',
//       'Authorization': 'Basic ' + btoa('admin:geoserver')
//     }
//   })
//   const data_co = response.data.coverageStores.coverageStore;
//   list_check=[]
//   for (let index = 0; index < data_co.length; index++) {
//     const element = data_co[index];
//     list_maize_tif = element.name.replace(".tif", "").split("_")
//     date = list_maize_tif.sort()[0]
//     date_select = sting_date(date);
//     list_check.push(date_select)
//   }

//   return   list_check.includes(x)

// }



/**********************************************************************************
* Popup Hotspot when click
**********************************************************************************/


mymap.on("click", function (e) {
  var url = hotspot_url
  var loc = e.latlng
  var Coor_cen = mymap.getCenter();
  var lat_cen = Coor_cen.lat,
    lon_cen = Coor_cen.lng;

  var lat_i = loc.lat,
    lon_i = loc.lng;


  var bounds = mymap.getBounds();


  var north = bounds.getNorthWest().lat,
    West = bounds.getNorthWest().lng,
    south = bounds.getSouthEast().lat,
    East = bounds.getSouthEast().lng

  var dnorth = north - lat_cen,
    dWest = West - lon_cen,
    dsouth = south - lat_cen,
    dEast = East - lon_cen


  var box_north_i = lat_i + (dnorth * 0.25),
    box_West_i = lon_i + (dWest * 0.25),
    box_south_i = lat_i + (dsouth * 0.25),
    box_East_i = lon_i + (dEast * 0.25)


  var bbox_i = box_West_i.toString() + ',' + box_south_i.toString() + ',' + box_East_i.toString() + ',' + box_north_i.toString()
  var _layers = this._layers,
    layers = [];
  let check_cuhot = false;

  for (var x in _layers) {
    var _layer = _layers[x];
    if (_layer.wmsParams) {
      layers.push(_layer.wmsParams.layers);
      if (_layer.wmsParams.layers == hotspot_layer_name) {
        check_cuhot = true;
      }
    }
  }
  if (check_cuhot) {
    obj = {
      service: "WMS", // WMS (default)
      version: "1.1.1",
      request: "GetFeatureInfo",
      srs: 'EPSG:4326',
      bbox: bbox_i,
      width: 101,
      height: 101,
      X: 50,
      Y: 50,
      QUERY_LAYERS: hotspot_layer_name,
      LAYERS: hotspot_layer_name,
      info_format: "application/json", // text/plain (default), application/json for JSON (CORS enabled servers), text/javascript for JSONP (JSONP enabled servers)
      feature_count: 1,
      exceptions: 'application/vnd.ogc.se_inimage', // application/vnd.ogc.se_xml (default)
      CQL_FILTER: scr_date_query
    };
    var url_GetFeatureInfo = url + L.Util.getParamString(obj, url, true)
    axios({
      method: 'get',
      url: url_GetFeatureInfo,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": 'application/json',
      }
    }).then(function (respone) {
      geojson_firm = respone.data.features;
      geojson_firm_length = geojson_firm.length;
      geojson_firm_list = [];
      if (geojson_firm_length > 0) {
        for (let index = 0; index < geojson_firm.length; index++) {
          geojson_firm_properties = geojson_firm[index].properties;
          // console.log(geojson_firm_properties);
          html_input = "<p style=' width: 150px;'>" + "วันที่ : " + geojson_firm_properties.th_date + "</p>"
          html_input += "<p style=' width: 150px;'>" + "เวลา : " + geojson_firm_properties.th_time.slice(0, 2) + ":" + geojson_firm_properties.th_time.slice(2, 4) + "น." + "</p>"
          html_input += "<p style=' width: 150px;'>" + "การใช้ที่ดิน : " + geojson_firm_properties.LU_NAME + "</p>"
          html_input += "<p style=' width: 150px;'>" + "สถานที่ : " + "อ." + geojson_firm_properties.AMPHOE + " " + "จ." + geojson_firm_properties.CHANGWAT + "</p>"
          html_input += "<a style=' width: 150px;' href=" + geojson_firm_properties.linkGMap + ">Google map</a>"
          latlng = { lat: geojson_firm_properties.LATITUDE, lng: geojson_firm_properties.LONGITUDE }
          var popup = L.popup({ maxWidth: 'auto' });
          popup
            .setLatLng(latlng)
            .setContent(html_input)
            .openOn(mymap);
        }
      }
    })
  }


})