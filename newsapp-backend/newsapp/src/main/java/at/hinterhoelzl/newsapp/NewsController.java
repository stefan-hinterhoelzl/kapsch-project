package at.hinterhoelzl.newsapp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import at.hinterhoelzl.newsapp.model.StringResponse;

@RestController
public class NewsController {

    @GetMapping("/news")
    StringResponse getNews() {
        return new StringResponse("Hallo");
    }
    
}
