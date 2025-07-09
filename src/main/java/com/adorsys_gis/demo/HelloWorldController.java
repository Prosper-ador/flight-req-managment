package com.adorsys_gis.demo;

// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;

// @Controller
// public class HelloWorldController {

//     @GetMapping("/hello")
//     public String helloWorld() {
//         return "Hello World";
//     }
// }

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/hello")
public class HelloWorldController {

    @GetMapping()
    public String helloWorld() {
        log.info("[LOG] SLF4J log from /hello endpoint");
        return "Good Morning and Win Today.";
    }
}

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// public class HelloWorldController {
//     private static final Logger logger = LoggerFactory.getLogger(HelloWorldController.class);

//     @GetMapping("/logtest")
//     public String logTest() {
//         logger.info("SLF4J log from /logtest endpoint");
//         return "Check your console for the log message!";
//     }
// }