/**
 * Created by jabue on 16-07-25.
 */
var express = require('express');
var GoogleMapsAPI = require('googlemaps');
var router = express.Router();

router.get('/search', function (req, res, next) {
    var publicConfig = {
        key: 'AIzaSyBXPOwPvIo-rGIzThxv7iS9BadnjMQ8YRo',
        stagger_time:       1000,
        encode_polylines:   false,
        secure:             true
    };
    var gmAPI = new GoogleMapsAPI(publicConfig);
    var params = {
        input:req.query.input
    };
    gmAPI.placeAutocomplete(params, function(err, result){
        if(result) {
            res.json({
                predictions: [
                    result.predictions[0].description,
                    result.predictions[1].description,
                    result.predictions[2].description,
                    result.predictions[3].description,
                    result.predictions[4].description,
                ]
            });
        } else {
            res.json({
               predictions: 'No more places!'
            });
        }
    });
});

router.get('/', function (req, res, next) {
    res.json({
        title: 'Map API Instructions',
        APIS: [
            {
                api: '/map/search',
                describe: 'Search map places.',
                method: 'get',
                parameters: 'input:not required.',
                token: 'Not required.'
            }
        ]
    });
});

module.exports = router;