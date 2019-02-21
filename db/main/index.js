
// Module Decleration
var path = require("path");
var fs = require("fs");

// DB handlers
var db;

// Default DB port for couchDB
var port = 5984;

// DB default urls for couchDB
var dburl = 'http://localhost:' + port;

// Default DB name
var DBName = "GroceryPlanner";
var createViews;

// config
var config;


/**
 * Load vars from config file
 */
try {
    var config = require("../config");

    if (config.DBName) {
        DBName = config.DBName;
    }

    if (config.createViews !== null) {
        createViews = config.createViews;
    }

    if (config.dburl) {
        dburl = config.dburl;
    }
} catch (e) {

}


new Promise(function(fulfill, reject) {
        var nano = require('nano')(dburl);

        nano.db.create(DBName, function() {
            db = nano.db.use(DBName);
            fulfill();
        });
}).then(function() {
    // Create the views by default unless explictly specified to not create the views in the db
    if (createViews && createViews !== false) {

        //view are under the folder db/views
        var pathToViews = path.join(__dirname, "..", "views/");

        if (fs.existsSync(pathToViews)) {
            var count = 0;
            fs.readdirSync(pathToViews).filter(function(file) {
                /**
                 * filter the files only
                 */
                return fs.statSync(pathToViews + path.join(file)).isFile();
            }).forEach(function(file) {
                ++count;
                var view = require(pathToViews + path.join(file));

                //extract the filename
                var viewName = file.substring(0, file.lastIndexOf("."));
                // Fetch the design doc which has the same name, to either create or update this design doc.
                db.get("_design/" + viewName, function(err, val) {
                    // Set the view ID as "_design/<file name>" to
                    view._id = "_design/" + viewName;
                    // In the case that the design doc exists add the _rev value to the
                    // view object, this allows to perform an update of the design doc.
                    if (val) {
                        view._rev = val._rev;
                    }
                    // Add the design doc to the DB
                    db.insert(view, function(err, val) {
                        --count;
                        if (count === 0) {
                            module.exports.initialized = true;
                        }
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            });
        } else {
            module.exports.initialized = true;
        }
    } else {
        module.exports.initialized = true;
    }

    // Export the DB connection object
    module.exports.conn = db;
    console.log('[INFO] Connected to DB: "' + DBName + '"');
})
module.exports.conn = null;
module.exports.initialized = false;

module.exports.init = function() {
    return new Promise(function(fulfill, reject) {
        function helper() {
            if (!module.exports.initialized) {
                setTimeout(helper, 0);
                return;
            }
            fulfill();
        }
        helper();
    });
}
