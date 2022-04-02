package at.hinterhoelzl.newsapp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import net.minidev.json.JSONObject;
import reactor.core.publisher.Flux;


@RestController
public class NewsController {

    private WebClient webClient = WebClient.create("https://newsapi.org");
    
    @Value("${newsapiKey}")
    private String apiKey;

    @GetMapping("/news")
    Flux<JSONObject> getNewsPerSearchterm(@RequestParam(required = true) String q, @RequestParam(required = false) Integer page) {   
                
        StringBuilder b = new StringBuilder("/v2/top-headlines");
        b.append("?apiKey="+apiKey);
        b.append("&q="+q);
        if (page != null) b.append("&page="+page.intValue());
        

        String uri = b.toString();

        return webClient.get().uri(uri)
        .retrieve()
        .bodyToFlux(JSONObject.class);
    }
    
}
