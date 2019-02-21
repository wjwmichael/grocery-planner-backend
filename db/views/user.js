module.exports = {
    "views": {
        "all": {
            "map": (function(doc) { if (doc.dbClass === "USER") { emit(doc._id); } }),
            "reduce": "_count"
        }
    }
};