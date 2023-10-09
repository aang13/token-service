package com.aang13.generator.token_generator;

import com.aang13.generator.token_generator.dto.TokenGeneratorPostRequest;
import com.aang13.generator.token_generator.dto.TokenGeneratorPostResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class TokenGeneratorService {
    int desiredTokenLength = 16;
    public TokenGeneratorPostResponse generateToken(TokenGeneratorPostRequest tokenPostRequest) throws Exception {
        List<Integer> numberList = tokenPostRequest.numberList();

        if(numberList.size() == 0) {
            throw new Exception();
        }

        StringBuilder token = generate(numberList);
        String formattedToken = formatToken(token.toString());
        
        return new TokenGeneratorPostResponse(formattedToken);
    }

    private StringBuilder generate(List<Integer> numberList) {
        StringBuilder token = new StringBuilder();

        Random random = new Random();
        for(int i= 0; i< desiredTokenLength; i++){
            int randomIndex = random.nextInt(numberList.size());
            int randomDigit = numberList.get(randomIndex);
            token.append(randomDigit);
        }

        return token;
    }

    private String formatToken(String token) {
        String formattedToken = "";

        for( int i =0; i< token.length(); i++) {
            if(i%4 == 0 && i != 0 ) {
                formattedToken += "-";
            }
            formattedToken += token.charAt(i);
        }

        return formattedToken;
    }
}
