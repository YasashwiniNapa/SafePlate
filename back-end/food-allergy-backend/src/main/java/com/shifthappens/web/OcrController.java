package com.shifthappens.web;

import com.shifthappens.service.OcrServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    @Autowired
    private OcrServiceImpl ocrService;

    @PostMapping("/scan")
    public ResponseEntity<String> scanImage(@RequestParam("file") MultipartFile file) {
        // Check if the uploaded file is an image
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body("Please upload a valid image file.");
        }

        try {
            // Save the uploaded image file to a temporary location
            File tempFile = File.createTempFile("ocr-", file.getOriginalFilename());
            file.transferTo(tempFile);

            // Extract text from the image
            String extractedText = ocrService.extractText(tempFile);

            // Delete the temporary file
            tempFile.delete();

            return ResponseEntity.ok(extractedText);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File processing error");
        }
    }
}

