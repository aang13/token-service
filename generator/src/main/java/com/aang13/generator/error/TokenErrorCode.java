package com.aang13.generator.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import java.util.Map;

public enum TokenErrorCode {
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "400", "Digit Error", "Atleast 1 digit must be selected!");

    private final HttpStatus httpStatus;

    private final String code;

    private final String title;

    private final String details;

    TokenErrorCode(HttpStatus httpStatus, String code, String title, String details) {
        this.httpStatus = httpStatus;
        this.code = code;
        this.title = title;
        this.details = details;
    }

    public ProblemDetail toProblemDetail() {
        return toProblemDetail(null);
    }

    public ProblemDetail toProblemDetail(Map<Object, Object> hints) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(httpStatus.value());
        problemDetail.setTitle(title);
        problemDetail.setDetail(details);
        problemDetail.setProperty("errorCode", code);
        problemDetail.setProperty("hints", hints);
        return  problemDetail;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
