module.exports = {
    "views": {
        "all": {
            "map": (function(doc) { if (doc.dbClass === "RECIPE") { emit(doc._id); } }),
            "reduce": "_count"
        }
    }
};