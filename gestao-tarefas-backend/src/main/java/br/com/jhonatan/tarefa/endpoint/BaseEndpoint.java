package br.com.jhonatan.tarefa.endpoint;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import br.com.jhonatan.tarefa.endpoint.error.Error;

public abstract class BaseEndpoint {
	
	@Autowired
	protected MessageSource messageSource;

	
	@ExceptionHandler
	protected ResponseEntity<?> handleBindException(BindException exception) {
		return ResponseEntity.badRequest().body(convert(exception.getAllErrors()));
	}
	
	@ExceptionHandler
	protected ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException exception) {
		
		final List<Error> errors = new ArrayList<>();

		for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
			final String value = (violation.getInvalidValue() == null ? null : violation.getInvalidValue().toString());
			errors.add(new Error(violation.getPropertyPath().toString(), value, violation.getMessage()));
		}
		
		return ResponseEntity.badRequest().body(errors);
	}

	@ExceptionHandler
	protected ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {	
		return ResponseEntity.badRequest().body(convert(exception.getBindingResult().getAllErrors()));
	}

	@ExceptionHandler
	protected ResponseEntity<?> handleServletRequestBindingException(ServletRequestBindingException exception) {
		return ResponseEntity.badRequest().body(new Error(null, null, exception.getMessage()));
	}

	@ExceptionHandler
	protected ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException exception) {
		return ResponseEntity.badRequest().body(new Error(null, null, exception.getMessage()));
	}
	
	@ExceptionHandler
	protected ResponseEntity<?> handleEmptyResultDataAccessException(EmptyResultDataAccessException exception) {
		return ResponseEntity.badRequest().body(new Error(null, exception.getMessage(), "Valor não encontrado"));
	}

	protected List<Error> convert(List<ObjectError> objectErrors) {
		
		final List<Error> errors = new ArrayList<>();
		
		for (ObjectError objectError : objectErrors) {

			String message = objectError.getDefaultMessage(); 
			if (message == null) {
				message = messageSource.getMessage(objectError, null);
			}
			
			Error error = null;
			if (objectError instanceof FieldError) {
				final FieldError fieldError = (FieldError) objectError;
				final String value = (fieldError.getRejectedValue() == null ? null : fieldError.getRejectedValue().toString());
				error = new Error(fieldError.getField(), value, message);
			} else {
				error = new Error(objectError.getObjectName(), objectError.getCode(), objectError.getDefaultMessage());
			}
			
			errors.add(error);
		}
		
		return errors;
	}

}
