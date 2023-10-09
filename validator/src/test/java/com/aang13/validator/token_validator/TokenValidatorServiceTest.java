package com.aang13.validator.token_validator;

import com.aang13.validator.token_validator.dto.TokenValidatorGetRequest;
import com.aang13.validator.token_validator.dto.TokenValidatorGetResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;

class TokenValidatorServiceTest {

    @InjectMocks
    private TokenValidatorService tokenValidatorService;

    @BeforeEach
    public void init(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testValidationWithValidInputTrue() throws Exception {
        String testToken = "5425-2334-3010-9903";
        TokenValidatorGetRequest request = new TokenValidatorGetRequest(testToken);

        TokenValidatorGetResponse response = tokenValidatorService.validateToken(request);

        assertNotNull(response);
        assertTrue(response.isValid());
    }

    @Test
    public void testValidationWithValidInputFalse() throws Exception {
        String testToken = "5426-2334-3010-9903";
        TokenValidatorGetRequest request = new TokenValidatorGetRequest(testToken);

        TokenValidatorGetResponse response = tokenValidatorService.validateToken(request);

        assertNotNull(response);
        assertFalse(response.isValid());
    }

    @Test
    public void testValidationWithEmptyInput() throws Exception {
        String testToken = "";

        TokenValidatorGetRequest request = new TokenValidatorGetRequest(testToken);

        assertThrows(Exception.class, ()->tokenValidatorService.validateToken(request));
    }
}