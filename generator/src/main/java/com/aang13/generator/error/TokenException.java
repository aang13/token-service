package com.aang13.generator.error;

import org.springframework.web.ErrorResponseException;

public class TokenException extends ErrorResponseException {

    public TokenException(TokenErrorCode errorCode) {
        super(errorCode.getHttpStatus(), errorCode.toProblemDetail(), null);
    }
}
