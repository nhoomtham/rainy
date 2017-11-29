package com.rainy.web.rest;

import com.rainy.config.ApplicationProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Resource to return the application information.
 */
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApplicationResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationResource.class);

    private ApplicationProperties applicationProperties;

    public ApplicationResource(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @GetMapping("/aws")
    public ResponseEntity<ApplicationProperties.Aws> getAws(){
        final ApplicationProperties.Aws aws = this.applicationProperties.getAws();
        log.debug("AWS:" + aws.toString());
        return new ResponseEntity<>(aws, HttpStatus.OK);

    }

}
