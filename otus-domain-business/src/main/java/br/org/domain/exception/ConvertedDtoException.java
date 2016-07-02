package br.org.domain.exception;

public class ConvertedDtoException extends RuntimeException implements ResponseError{
    @Override
    public Object getObjectError() {
        return new ErrorData();
    }

    class ErrorData{
        private String message = "Converted Error";
        private ErrorType errorType = ErrorType.OBJECT_INVALID;
    }
}
