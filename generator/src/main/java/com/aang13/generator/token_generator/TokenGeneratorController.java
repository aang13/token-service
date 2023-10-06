package com.aang13.generator.token_generator;

import com.aang13.generator.token_generator.dto.TokenGeneratorPostRequest;
import com.aang13.generator.token_generator.dto.TokenGeneratorPostResponse;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/generate")
public class TokenGeneratorController {

    private final TokenGeneratorService tokenService;

    public TokenGeneratorController(TokenGeneratorService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public TokenGeneratorPostResponse generateToken(@RequestBody @Valid TokenGeneratorPostRequest tokenPostRequest) {
        return this.tokenService.generateToken(tokenPostRequest);
    }
}