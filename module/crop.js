const sharp = require('sharp');
const fileUpload = require('express-fileupload');
const fs = require('fs');
var sizeOf = require('image-size');

function cropIMG(file, product_id ,new_name){
    new_name = new_name.toString();
    const base64 = file.split(';base64,')[1];
    // const binaryData = new Buffer(base64, 'base64').toString('binary');
    const buffer = Buffer.from(base64, "base64");

    fs.writeFile(`public/img/tempImg/${product_id+new_name}.png`, buffer, {encoding: 'base64'}, function(){

        sizeOf(`public/img/tempImg/${product_id+new_name}.png`, (err, sizes)=>{
                    // console.log(new_name);
            var height, width;

            if(sizes){
                height = sizes.height;
                width  = sizes.width;
            }
            if(height == width){
                sharp(`public/img/tempImg/${product_id+new_name}.png`)
                .extract({width: width, height: height, left: 0, top: 0})
                .toFile(`public/img/product/product-${product_id}${new_name}.png`)
                .then( () =>{
                    fs.unlink(`public/img/tempImg/${product_id+new_name}.png`, () =>{
                        // console.log(`Delete temporary image at public/img/tempImg/${product_id+new_name}.png`)
                    });
                });
            }
            if(height > width){
                var top = Math.round((height-width)/2);
                sharp(`public/img/tempImg/${product_id+new_name}.png`)
                .extract({width: width, height: width, left: 0, top: top})
                .toFile(`public/img/product/product-${product_id}${new_name}.png`)
                .then( () =>{
                    fs.unlink(`public/img/tempImg/${product_id+new_name}.png`, () =>{
                        // console.log(`Delete temporary image at public/img/tempImg/${product_id+new_name}.png`)
                    });
                });
            }
            if(height < width){
                var left = Math.round((width - height)/2);
                sharp(`public/img/tempImg/${product_id+new_name}.png`)
                .extract({width: height, height: height, left: left, top: 0})
                .toFile(`public/img/product/product-${product_id}${new_name}.png`)
                .then( () =>{
                    fs.unlink(`public/img/tempImg/${product_id+new_name}.png`, () =>{
                        // console.log(`Delete temporary image at public/img/tempImg/${product_id+new_name}.png`)
                    });
                });
            }
        });
    })
}

module.exports = { cropIMG }