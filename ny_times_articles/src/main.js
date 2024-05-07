var sort_by_selection;
var time_frame_selection;
var key = 'VimoDG1qozWj4hmfMfLa7jvp050RhDzQ';

async function getResponse(num_string,article_num){
    if(article_num>15||article_num<1){
        alert("Please enter a number between 1 and 15");
        return;
    }

    if(num_string=='0'){
        sort_by_selection = 'viewed';
        time_frame_selection = '1';
    }
    else if(num_string=='1'){
        time_frame_selection = '1';
    }
    else if(num_string=='2'){
        time_frame_selection = '7';
    }
    else if(num_string=='3'){
        time_frame_selection = '30';
    }
    else if(num_string=='a'){
        sort_by_selection = 'viewed';
    }
    else if(num_string=='b'){
        sort_by_selection = 'shared';
    }
    else if(num_string=='c'){
        sort_by_selection = 'emailed';
    }
    var url;
    if(sort_by_selection=='shared'){
        url = "https://api.nytimes.com/svc/mostpopular/v2/shared/"+time_frame_selection+"/facebook.json?api-key="+key;
    }
    else{
        url = "https://api.nytimes.com/svc/mostpopular/v2/"+sort_by_selection+"/"+time_frame_selection+".json?api-key="+key;
    }
    //fetch request
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
        var i = -1;
        var article_count = -1;
        var article_title;
        var article_abstract;
        var article_date;
        var article_image_url;
        while(article_count < article_num){
            try{
                i++;
                article_title = data.results[i].title;
                console.log("Title: ");
                console.log(article_title);
                article_title = data.results[i].title;
                console.log("Title: ");
                console.log(article_title);
                article_abstract = data.results[i].abstract;
                console.log("Abstract: ");
                console.log(article_abstract);
                article_date = data.results[i].published_date;
                console.log("published_date: ");
                console.log(article_date);
                article_image_url = data.results[i].media[0]["media-metadata"][0].url;
                console.log("image url: ");
                console.log(article_image_url);
                article_count ++;
            }
            catch(error){
                article_title = "Article not available";
                article_image_url = "./Components/default-placeholder.png"
                article_date = "0000-00-00"
                article_abstract = error.message;
                console.error("Error occurred while processing article:", error.message);
                article_count++;
            }
        }
    } else {
        console.log("No articles found.");
    }
}