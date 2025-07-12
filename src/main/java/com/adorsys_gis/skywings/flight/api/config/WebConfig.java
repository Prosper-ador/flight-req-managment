// package com.adorsys_gis.skywings.flight.api.config;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.lang.NonNull;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig {
//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Value("${cors.allowed-origins}")
//             private String[] allowedOrigins;
                    
//             @Override
//             public void addCorsMappings(@NonNull CorsRegistry registry) {
//                 registry.addMapping("/**")
//                     .allowedOrigins(allowedOrigins)
//                     .allowedMethods("*")
//                     .allowedHeaders("*")
//                     .allowCredentials(true);
//             }
//         };
//     }
// }
