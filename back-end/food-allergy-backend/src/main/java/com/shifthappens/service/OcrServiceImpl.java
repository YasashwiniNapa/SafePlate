package com.shifthappens.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OcrServiceImpl implements OcrService {

    private final Tesseract tesseract;

    public OcrServiceImpl() {
        tesseract = new Tesseract();
        tesseract.setDatapath("src/main/resources/tessdata"); // Update with your tessdata path
        tesseract.setLanguage("eng"); // Set language as needed
        tesseract.setPageSegMode(1);
        tesseract.setOcrEngineMode(1);
    }

    // Extract text from the provided image file
    public String extractText(File imageFile) {
        try {
            return tesseract.doOCR(imageFile);
        } catch (TesseractException e) {
            e.printStackTrace();
            return "Error extracting text";
        }
    }

    // Extract ingredients based on a regex pattern
    public String extractIngredients(String extractedText) {
        String ingredientsRegex = "Ingredients\\s*:\\s*(.*)"; // Regex to find the ingredients section
        Pattern pattern = Pattern.compile(ingredientsRegex, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(extractedText);

        if (matcher.find()) {
            String ingredients = matcher.group(1).trim();
            return ingredients.isEmpty() ? "No ingredients found after 'Ingredients'" : ingredients;
        } else {
            return "Ingredients are not correctly displayed."; // Error message
        }
    }
}
