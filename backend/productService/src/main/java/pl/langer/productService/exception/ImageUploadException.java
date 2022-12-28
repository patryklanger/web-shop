package pl.langer.productService.exception;

public class ImageUploadException extends RuntimeException{
    public ImageUploadException(){
        super("Unable to upload image!");
    }
}
