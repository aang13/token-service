package com.aang13.validator.token_validator;

import com.aang13.validator.token_validator.dto.TokenValidatorGetRequest;
import com.aang13.validator.token_validator.dto.TokenValidatorGetResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TokenValidatorService {
    public TokenValidatorGetResponse validateToken(TokenValidatorGetRequest request) {
        return new TokenValidatorGetResponse(isValidToken(request.token()));
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
