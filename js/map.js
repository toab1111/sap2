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
  "White": CartoDB_Positron,
  "White2": Stamen_TonerBackground,
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
var sf_rice_layer = L.layerGroup();
var sf_maize_layer = L.layerGroup();
var hotspot_layer = L.layerGroup();
var maize_layer = L.layerGroup();

var forest_area = new L.tileLayer.wms("https://csrs.ku.ac.th/geoserver/btfpws/wms", {
  layers: 'btfpws:sap2_forest_area',
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.5,
  attribution: '| ข้อมูลแนวเขตป่าสงวนแห่งชาติจาก &copy; <a href="https://data.forest.go.th/dataset/reserve_forest/resource/971b289e-dd9f-4539-8305-c9b5099994b4?inner_span=True">data.forest.go.th</a>',
}).addTo(forest_area_layer);
var sf_rice = new L.tileLayer.wms("https://csrs.ku.ac.th/geoserver/btfpws/wms", {
  layers: 'btfpws:sap2_soilfert_rice',
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.7
}).addTo(sf_rice_layer);
var sf_maize = new L.tileLayer.wms("https://csrs.ku.ac.th/geoserver/btfpws/wms", {
  layers: 'btfpws:sap2_soilfert_maize',
  format: 'image/png',
  transparent: true,
  version: '1.1.0',
  opacity: 0.7
}).addTo(sf_maize_layer);

// var firms_J1_VIIRS = new L.tileLayer.wms("http://tamfire.net/geoserver/tamfire/wms", {
//     layers: 'tamfire:hotspot',
//     format: 'image/png',
//     transparent: true,
//     version: '1.1.1',
//     CQL_FILTER: "src in ('J1_VIIRS','SUOMI_VIIRS') AND acq_localdate = '2023-02-01'",
// }).addTo(hotspot_layer);

// var maize = new L.tileLayer.wms("https://ecoplant.gistda.or.th/rest/gis/wms", {
//     layers: 'ecoplant:maize_01',
//     format: 'image/png',
//     transparent: true,
//     version: '1.3.0',
//     APIID: "th.co.softoo.rest"
// }).addTo(maize_layer);

// var rice_test = new L.tileLayer.wms("http://localhost:8080/geoserver/demo/wms", {
//   layers: 'demo:rice_20230331',
//   format: 'image/png',
//   transparent: true,
//   version: '1.1.1',
//   STYLES: "demo:test",
//   exceptions: 'application/vnd.ogc.se_inimage'
// }).addTo(maize_layer);




// maize_layer.addTo(mymap);
// maize_layer.setZIndex(12);


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
  // console.log(dateFormat1);
  list_date.unshift(dateFormat1)

  // Increment the date by one day
  startDate.setDate(startDate.getDate() + 1);
}


function getLastDayOfMonth(year, month) {
  // Month in JavaScript starts from 0 (January is 0, February is 1, and so on)
  const lastDay = new Date(year, month, 0).getDate();
  return lastDay;
}

console.log(getLastDayOfMonth("2023", 2));

function getMonthYearPairs(startDate) {
  const currentDate = new Date("2023-08-01");
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

let list_date_rice = ["16_28_02_2023"]
// Example usage:
const startDateRice = new Date("2023-03-01");
const monthYearPairsRice = getMonthYearPairs(startDateRice);
for (let index = 0; index < monthYearPairsRice.length; index++) {
  const element = monthYearPairsRice[index];
  let mouth_ = ('00' + element.month).slice(-2);
  let mouth_next = ('00' + (element.month + 1)).slice(-2);
  console.log(element.month);

  let year_ = element.year
  const lastDay = getLastDayOfMonth(element.year, element.month);
  const checkDate = new Date(year_ + "-" + mouth_next + "-" + "01");
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


let list_date_maize = ["16_31_12_2023"]
// Example usage:
const startDateMaize = new Date("2023-01-01");
const monthYearPairsMaize = getMonthYearPairs(startDateMaize);
for (let index = 0; index < monthYearPairsMaize.length; index++) {
  const element = monthYearPairsMaize[index];
  let mouth_ = ('00' + element.month).slice(-2);
  let mouth_next = ('00' + (element.month + 1)).slice(-2);

  let year_ = element.year
  const lastDay = getLastDayOfMonth(element.year, element.month);
  const checkDate = new Date(year_ + "-" + mouth_next + "-" + "01");
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



var yearsOption = "";
for (var yy = (new Date()).getFullYear(); yy > 2019; yy--) {
  yearsOption += '<option value="' + (yy) + '">' + "ปี " + (yy) + '</option>';
}
$filterYear = $("#select_year_drop").html(yearsOption);
var $layersList = $("#layers-list");


var field_option_hotspot = ""
hotspot_field = "Hotspot"
for (let index = 0; index < list_date.length; index++) {
  const element = list_date[index];
  let data_field = element + "_" + hotspot_field
  field_option_hotspot += '<div class="field" data-layer="' + data_field + '"><div class="ui radio checkbox"><input type="radio" name="radio_select" value="' + data_field + '"><label>' + data_field + '</label></div></div>'
}
$hotspot_field = $(".hotspot_field").html(field_option_hotspot);

const thaiMonthAbbreviations = [
  "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
  "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];


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
function update_hotspot_area(CQL_FILTER) {
  all_layer.clearLayers()
  var hotspot_layer = new L.tileLayer.wms("http://localhost:8080/geoserver/test_hospot/wms", {
    layers: 'test_hospot:hotspot_test',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    exceptions: 'application/vnd.ogc.se_inimage',
    STYLES: "test_hospot:pm25",
    CQL_FILTER: CQL_FILTER,
  })

  hotspot_layer.addTo(all_layer)
  all_layer.setZIndex(12);
  all_layer.addTo(mymap)

}

function update_rice_area(date_layer) {
  layers = "rice_" + date_layer
  var rice_test = new L.tileLayer.wms("http://localhost:8080/geoserver/demo/wms", {
    layers: layers,
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    STYLES: "demo:test",
    exceptions: 'application/vnd.ogc.se_inimage',
    opacity: 0.9
  }).addTo(rice_maize_layer);
  rice_test.addTo(rice_maize_layer);
  rice_maize_layer.addTo(mymap);
  rice_maize_layer.setZIndex(12);

}

function update_maize_area(date_layer) {
  layers =  date_layer+"_"+"maize"
  var rice_test = new L.tileLayer.wms("http://localhost:8080/geoserver/demo/wms", {
    layers: layers,
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    exceptions: 'application/vnd.ogc.se_inimage',
    STYLES: "demo:test_maize",
    opacity: 0.9
  }).addTo(rice_maize_layer);
  rice_test.addTo(rice_maize_layer);
  rice_maize_layer.addTo(mymap);
  rice_maize_layer.setZIndex(12);

}

function date_firms_VIIRS(date) {
  var scr = "ACQ_DATE = "
  var date = date
  var scr_date = scr + "'" + date + "'"
  return scr_date
}

const sf_rice_label = document.getElementById('sf_rice_label');
const sf_maize_label = document.getElementById('sf_maize_label');
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
    console.log(type_layer);

    if (type_layer == "Hotspot") {
      all_layer.clearLayers();
      update_hotspot_area(date_firms_VIIRS(date_cq))
      title_hotspot_label.style.color = 'red'
    } if (type_layer == "rice") {
      rice_maize_layer.clearLayers();
      update_rice_area(date_rice_maize)
      title_rice_label.style.color = 'red'
      title_maize_label.style.color = 'black'

    }if (type_layer == "maize") {
      rice_maize_layer.clearLayers();
      update_maize_area(date_rice_maize)
      title_maize_label.style.color = 'red'
      title_rice_label.style.color = 'black'
    }

  },
  onUnchecked: function () {
    var $this = $(this);
    var value = $this.val();
    const myArray = value.split("_");
    let type_layer = myArray[3]
    console.log(value);
    if (type_layer == "Hotspot") {
      all_layer.clearLayers();
      mymap.removeLayer(all_layer);
      title_hotspot_label.style.color = 'black'

    }
    if (type_layer == "rice") {
      rice_maize_layer.clearLayers();
      mymap.removeLayer(rice_maize_layer);
      title_rice_label.style.color = 'black'
    }
    if (type_layer == "maize") {
      rice_maize_layer.clearLayers();
      mymap.removeLayer(rice_maize_layer);
      title_maize_label.style.color = 'black'
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
