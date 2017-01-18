// 这里定义数据库模型，也可以添加方法
module.exports = { 
    user:{
        // blogname:{type:String,required:false},
        name:{type:String,required:true},
        password:{type:String,required:true}
    },
    blog:{
    	title:{type:String,required:true},
    	user:{type:String,required:true},
    	content:{type:String,required:true},
        MDcontent:{type:String,required:false},
    	postDate:{type:Date,required:true}
    }
};