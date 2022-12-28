package pl.langer.productService.controller;

import jdk.jfr.ContentType;
import lombok.AllArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/products/photos")
public class PhotoController {

    ServletContext context;

    @CrossOrigin
    @GetMapping(path = "/**")
    public ResponseEntity<byte[]> getImage(HttpServletRequest request) throws IOException {
        String requestURL = request.getRequestURL().toString();
        final String photo = "/photos/" + requestURL.split("/photos")[1];
        final HttpHeaders headers = new HttpHeaders();
        String[] strings = photo.split("/");
        String fileName = strings[strings.length - 1];
        strings = Arrays.copyOf(strings, strings.length - 1);
        String.join("/", strings);
        Path uploadPath = Paths.get(System.getProperty("user.dir") + String.join("/", strings)).resolve(fileName);

        headers.set("content-type", new MimetypesFileTypeMap().getContentType(uploadPath.toFile()));

        return ResponseEntity.ok().headers(headers).body(Files.readAllBytes(uploadPath));
    }
}
