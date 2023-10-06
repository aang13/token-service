package com.aang13.generator.token_generator;

import com.aang13.generator.token_generator.dto.TokenGeneratorPostRequest;
import com.aang13.generator.token_generator.dto.TokenGeneratorPostResponse;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class TokenGeneratorService {
    int length = 16;
    public TokenGeneratorPostResponse generateToken(TokenGeneratorPostRequest tokenPostRequest) {
        StringBuilder token = new StringBuilder();

        Random random = new Random();
        for(int i= 0; i< length; i++){
            int randomIndex = random.nextInt(tokenPostRequest.numberList().size());
            int randomDigit = tokenPostRequest.numberList().get(randomIndex);
            token.append(randomDigit);
        }
        
        return new TokenGeneratorPostResponse(token.toString());
    }
}
