package com.aang13.validator.token_validator;

import com.aang13.validator.token_validator.dto.TokenValidatorGetRequest;
import com.aang13.validator.token_validator.dto.TokenValidatorGetResponse;
import org.springframework.stereotype.Service;

@Service
public class TokenValidatorService {
    int preferredTokenLength = 16;
    public TokenValidatorGetResponse validateToken(TokenValidatorGetRequest request) throws Exception {
        String token = request.token();
        String sanitizedToken = sanitizeToken(token);

        if(sanitizedToken.length() != preferredTokenLength) {
            throw new Exception();
        }
        return new TokenValidatorGetResponse(isValidToken(sanitizedToken));
    }

    private String sanitizeToken(String token) {
        String result = token.replaceAll("-","");
        return result;
    }

    private boolean isValidToken(String number) {
        String reverseNumber = new StringBuilder(number).reverse().toString();

        int sum =0;
        boolean isDoubleDigit = false;

        for(char digitChar: reverseNumber.toCharArray()) {
            int digit = Character.getNumericValue(digitChar);

            if(isDoubleDigit) {
                digit *= 2;
                if(digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isDoubleDigit = !isDoubleDigit;
        }
        return (sum % 10) == 0;
    }


}
