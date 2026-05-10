// Load the VIIRS Nighttime Day/Night Band Composites collection
// Filter the collection to the date range
var filtered1 = nightData.filter(ee.Filter.date('2015-05-01', '2015-06-01'));
var filtered2 = nightData.filter(ee.Filter.date('2020-05-01', '2020-06-01'));
// Extract the 'avg_rad' band which represents the nighttime lights
var nightBand1 = filtered1.select('avg_rad');
var nightBand2 = filtered2.select('avg_rad');
// Clip the image to the geometry of your city
var kolkata = urban.filter(ee.Filter.eq('UC_NM_MN', 'Kolkata')).geometry();
var image1 = nightBand1.first().clip(kolkata);
var image2 = nightBand2.first().clip(kolkata);
Map.centerObject(kolkata);
Map.addLayer(image1, {min:0, max:50}, 'nightOf2015');
Map.addLayer(image2, {min:0, max:50}, 'nightOf2020');
// Export the resulting image for 2015
Export.image.toDrive({image:image1,
description:'kolkata_2015',
folder:'earthEngineAssignment',
fileNamePrefix:'kolkata_2015',
region:kolkata,
scale:500,
maxPixels:1e9});
// Export the resulting image for 2020
Export.image.toDrive({image:image2,
description:'kolkata_2020',
folder:'earthEngineAssignment',
fileNamePrefix:'kolkata_2020',
region:kolkata,
scale:500,
maxPixels:1e9});

