const tweetsContainer = document.getElementById("tweetsContainer");
const usernameInput = document.querySelector(".username");
const tweetInput = document.querySelector(".tweet");
const submitButton = document.getElementById("submit");
const tweetTemplate = document.querySelector(".more_tweet");

let arrayOftweet=[];

//like function
function handleLike(tweet, tweetElement) {
  const favorite = tweetElement.querySelector(".love");
  favorite.addEventListener("click", function (event) {
    event.stopPropagation();
    tweet.is_like = !tweet.is_like;
    localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
    favorite.style.color = tweet.is_like ? "red" : "rgb(110, 118, 125)";
  });
}

//retweet function 
function handleRetweet(tweet, tweetElement) {
  const repeatButton = tweetElement.querySelector(".repeat");
  repeatButton.addEventListener("click", function () {
    const clonedTweet = tweetElement.cloneNode(true);
    const usernameElement = clonedTweet.querySelector(".full_name");
    const tweetTextElement = clonedTweet.querySelector(".tweet_text");
    const likeButton = clonedTweet.querySelector(".love");

    const username = usernameElement.textContent;
    const tweetContent = tweetTextElement.textContent;
    const newTweetObject = {
      id: Date.now(),
      username: username,
      content: tweetContent,
      is_like: false,
    };

    arrayOftweet.push(newTweetObject);
    localStorage.setItem('tweets', JSON.stringify(arrayOftweet));

    // 
    handleLike(newTweetObject, clonedTweet);

    tweetsContainer.insertBefore(clonedTweet, tweetsContainer.firstChild);
  });
}


submitButton.addEventListener("click", function () {
  const username = usernameInput.value;
  const tweetContent = tweetInput.value;
  if (username !== "" && tweetContent !== "") {

    const newTweet = tweetTemplate.cloneNode(true);

    const newuserName = newTweet.querySelector(".full_name");
    newuserName.textContent = username;

    const authernameElement = newTweet.querySelector(".tweet_username");
    authernameElement.textContent = "@" + username;  

    const newtexttweet = newTweet.querySelector(".tweet_text");
    newtexttweet.textContent = tweetContent;

    tweetsContainer.insertBefore(newTweet, tweetsContainer.firstChild);

    const tweetObject = {
      id:Date.now(),
      username: username,
      content: tweetContent,
      is_like:false,
    };

    arrayOftweet.push(tweetObject);

// localstorge
    localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
   
    usernameInput.value = "";
    tweetInput.value = "";
//Call the like function
    handleLike(tweetObject, newTweet);
//Call the retweet function
    handleRetweet(tweetObject, newTweet);
   
  }
});


// complete localstorg
const storetweets = localStorage.getItem('tweets');

if (storetweets) {
  const parsetweet = JSON.parse(storetweets);
  parsetweet.forEach((tweet) => {
    const newTweet = tweetTemplate.cloneNode(true);
    const fullName = newTweet.querySelector(".full_name");
    fullName.textContent = tweet.username;

    const newuserName = newTweet.querySelector(".tweet_username");
    newuserName.textContent = "@"+tweet.username;

    const newtexttweet = newTweet.querySelector(".tweet_text");
    newtexttweet.textContent = tweet.content;

    const favoritetwo = newTweet.querySelector(".love");
    favoritetwo.style.color = tweet.is_like ? "red" : "rgb(110, 118, 125)";
    
    tweetsContainer.insertBefore(newTweet, tweetsContainer.firstChild);

//Call the like function 
    handleLike(tweet, newTweet);

//Call the retweet function
    handleRetweet(tweet, newTweet);

  });

  arrayOftweet = parsetweet;
}

