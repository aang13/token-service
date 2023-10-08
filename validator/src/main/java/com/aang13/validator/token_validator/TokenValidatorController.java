package com.aang13.validator.token_validator;

import com.aang13.validator.token_validator.dto.TokenValidatorGetRequest;
import com.aang13.validator.token_validator.dto.TokenValidatorGetResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/validator")
@CrossOrigin
public class TokenValidatorController {

    private final TokenValidatorService service;

    public TokenValidatorController(TokenValidatorService service) {
        this.service = service;
    }

    @GetMapping(value="", produces = MediaType.APPLICATION_JSON_VALUE)
    public TokenValidatorGetResponse validateToken(@RequestParam("token") TokenValidatorGetRequest request) throws Exception {
        return service.validateToken(request);
    }
}
