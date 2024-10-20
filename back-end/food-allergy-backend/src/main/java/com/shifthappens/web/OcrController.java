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
@CrossOrigin(origins = "*")
@RequestMapping("/api/ocr")
public class OcrController {

    @Autowired
    private OcrServiceImpl ocrService;

    // try to include slf4j + log4j in your maven
    @PostMapping("/scan")
    public ResponseEntity<String> scanImage(@RequestParam("file") MultipartFile file) {
        String contentType = file.getContentType();
        System.out.println("content type {} " + contentType);
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity.badRequest().body("Please upload a valid image file.");
        }

        File tempFile = null;
        try {
            tempFile = File.createTempFile("ocr-", file.getOriginalFilename());
            file.transferTo(tempFile);

            // Extract text from the image
            String extractedText = ocrService.extractText(tempFile);

            // Return extracted text directly for testing
            return ResponseEntity.ok(extractedText);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File processing error: " + e.getMessage());
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }
}

