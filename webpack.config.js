module.exports={
    entry:"./src/index.js", //start from this point
    output:{
        path:__dirname+'/public',
        filename:'budle.js' // bundle all dependencies here
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                loader:'babel-loader'
            }
        ]
    }
};