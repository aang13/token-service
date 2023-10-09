package com.aang13.generator.token_generator;

import com.aang13.generator.token_generator.dto.TokenGeneratorPostRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class TokenGeneratorServiceTest {
    @InjectMocks
    private TokenGeneratorService tokenGeneratorService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGenerateTokenWithValidInput() throws Exception {
        List<Integer> numberList = Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

        TokenGeneratorPostRequest request = new TokenGeneratorPostRequest(numberList);

        String generatedToken = tokenGeneratorService.generateToken(request).token();

        // Check if the generated token is not null and has the correct format (length and hyphens)
        assertNotNull(generatedToken);
        assertTrue(generatedToken.matches("^\\d{4}-\\d{4}-\\d{4}-\\d{4}$"));
    }

    @Test
    public void testGenerateTokenWithEmptyInput() {
        List<Integer> emptyList = List.of();

        TokenGeneratorPostRequest request = new TokenGeneratorPostRequest(emptyList);

        assertThrows(Exception.class, () -> tokenGeneratorService.generateToken(request));
    }
}




