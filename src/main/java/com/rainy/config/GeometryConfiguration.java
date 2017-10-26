package com.rainy.config;

import com.vividsolutions.jts.geom.GeometryFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by che on 26/10/2560.
 */
@Configuration
public class GeometryConfiguration {
    @Bean
    public GeometryFactory geometryFactory() {
        return new GeometryFactory();
    }
}
