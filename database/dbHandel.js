var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models");

for(var m in models){ 
	var model = new Schema(models[m]);
    mongoose.model(m,model);
}

module.exports = { 
    getModel: function(type){ 
        return _getModel(type);
    }
};

var _getModel = function(type){ 
    return mongoose.model(type);
};