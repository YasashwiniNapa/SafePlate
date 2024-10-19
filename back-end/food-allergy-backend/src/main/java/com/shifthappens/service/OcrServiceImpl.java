package com.shifthappens.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class OcrServiceImpl implements OcrService {

    private final Tesseract tesseract;

    public OcrServiceImpl() {
        tesseract = new Tesseract();
        tesseract.setDatapath("/tessdata/eng.traineddata"); // Update with your tessdata path
        tesseract.setLanguage("eng"); // Set language as needed
    }

    public String extractText(File imageFile) {
        try {
            return tesseract.doOCR(imageFile);
        } catch (TesseractException e) {
            e.printStackTrace();
            return "Error extracting text";
        }
    }
}
