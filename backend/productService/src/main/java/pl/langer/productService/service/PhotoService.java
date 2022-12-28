package pl.langer.productService.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pl.langer.productService.utils.FileUploadUtil;

import java.io.IOException;

@Service
@AllArgsConstructor
public class PhotoService {
    public String saveProductPhoto(MultipartFile multipartFile, Long productId) throws IOException {
        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir = "photos/product/" + productId;

        FileUploadUtil.saveFile(uploadDir, filename, multipartFile);

        return "api/products/" + uploadDir + "/" + filename;
    }

    public String saveCategoryPhoto(MultipartFile multipartFile, Long categoryId) throws IOException {
        String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        String uploadDir = "photos/category/" + categoryId;

        FileUploadUtil.saveFile(uploadDir, filename, multipartFile);

        return "api/products/" + uploadDir + "/" + filename;
    }
}
