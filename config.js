// ------------------------------------------------------------------
// A. THE CONFIGURATION OBJECT
//    - All the data for the person is here.
//    - You will only need to edit this file to create a new card.
//    - This file is imported in index.html and used in index.js.
//    - The config object contains all the necessary data for the birthday card.
//    - I will so make the cake costumizable
// ------------------------------------------------------------------

const config = {
    // The main title lines, which will be separated by <br>
    titleLines: [
        "Sir Warren",
        "Happy birthday",
        "🎉🎂"
    ],

    // The subtitle text that will be typed out
    subtitleText: "Hey Sir Bestie! Ready for your special surprise? OwO",

    // Page 2: Cake
    // here is the cake configuration
    //!!!TODO: add more cake options

    cakePage: {
        // The number of candles on the cake
        totalCandles: 5,

        // The wish message that appears after blowing out the candles
        wishMessage: {
            title: "✨ Hsadkasdjaskldndappy Birthday! ✨",
            subtitle: "wishing for a fruitful day 🎂✨"
        }
    },

    // --- Audio Files ---
    // Group all audio files here for easy management
    audioFiles: {
        indexPage: "reggae, happy birthday.mp3",
        cakePage: "background.mp3",  
        blowSound: "blow.mp3",
        lettersPage: "emotional epit.mp3"
    },

    navigation: {
        indexPageNext: "cake.html",
        cakePageBack: "index.html",
        cakePageNext: "letter.html"
    }
};
