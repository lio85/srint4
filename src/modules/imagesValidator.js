module.exports = {
    isImage: function (file_path){
        let length= file_path.length;
        let bmp_gif_jpg_png= length -4;
        let jpeg_webp= length -5;
    
        let bmp = file_path.indexOf(".bmp");
        let gif= file_path.indexOf(".gif"); // si no lo encuentra -1, si si me tira posicion donde empieza
        let jpg = file_path.indexOf(".jpg");
        let png= file_path.indexOf(".png");
        
        let webp = file_path.indexOf(".webp");
        let jpeg = file_path.indexOf(".jpeg");
    
        if (bmp == bmp_gif_jpg_png){
            return true;
        }
        else if (gif == bmp_gif_jpg_png){
            return true;
        }
        else if (jpg == bmp_gif_jpg_png){
            return true;
        }
        else if (png == bmp_gif_jpg_png){
            return true;
        }
        else if (jpeg == jpeg_webp){
            return true;
        }
        else if (webp == jpeg_webp){
            return true;
        }
        else {
            return false;
        }
    }
}