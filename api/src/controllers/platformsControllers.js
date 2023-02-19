const { getApiGames } = require("../utils/getApiData")
const { Platforms } = require("../db");


const getAllPlatforms = async function(){
    let results = []
    const platformsInDb = await Platforms.findAll();

    if(platformsInDb.length !== 0){
        console.log("Platforms request")
        return results = [... platformsInDb]
    }
    const apiData = await getApiGames(2) //I just call 2 pages in order to make request faster because a lot of platforms repeats and barely adds 1 or 2 more
    let gamesPlatforms = apiData.map((game)=> game.platforms.map((e)=> e.name))
    //Filter from the Array of Arrays, all the platforms that do not repeat
    gamesPlatforms.map((element) =>
    element.forEach((platform) => {
        if (!results.find((platformDB) => platformDB === platform)) {
        results.push(platform);
        }
    })
    );
    
    results.forEach((e)=> Platforms.findOrCreate( { where: {name:e} } ))
    console.log("Platforms types were loaded from VIDEOGAMES into DB")
    //return await Platforms.findAll();
}

module.exports = { getAllPlatforms}

/* ---------------DATA STRUCTURE OF ONE GAME FROM getApiGames----------------
[
 { 
        "id": 3498,
        "name": "Grand Theft Auto V",
        "rating": 4.47,
        "platforms": [
            {
                "platform": {
                    "id": 187,
                    "name": "PlayStation 5",
                    "slug": "playstation5",
                    "image": null,
                    "year_end": null,
                    "year_start": 2020,
                    "games_count": 797,
                    "image_background": "https://media.rawg.io/media/games/739/73990e3ec9f43a9e8ecafe207fa4f368.jpg"
                },
                "released_at": "2013-09-17",
                "requirements_en": null,
                "requirements_ru": null
            },
            {
                "platform": {
                    "id": 186,
                    "name": "Xbox Series S/X",
                    "slug": "xbox-series-x",
                    "image": null,
                    "year_end": null,
                    "year_start": 2020,
                    "games_count": 716,
                    "image_background": "https://media.rawg.io/media/games/5ec/5ecac5cb026ec26a56efcc546364e348.jpg"
                },
                "released_at": "2013-09-17",
                "requirements_en": null,
                "requirements_ru": null
            },
            {
                "platform": {
                    "id": 18,
                    "name": "PlayStation 4",
                    "slug": "playstation4",
                    "image": null,
                    "year_end": null,
                    "year_start": null,
                    "games_count": 6569,
                    "image_background": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg"
                },
                "released_at": "2013-09-17",
                "requirements_en": null,
                "requirements_ru": null
            },
            {
                "platform": {
                    "id": 4,
                    "name": "PC",
                    "slug": "pc",
                    "image": null,
                    "year_end": null,
                    "year_start": null,
                    "games_count": 523373,
                    "image_background": "https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg"
                },
                "released_at": "2013-09-17",
                "requirements_en": {
                    "minimum": "Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.",
                    "recommended": "Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:"
                },
                "requirements_ru": null
            },
            {
                "platform": {
                    "id": 16,
                    "name": "PlayStation 3",
                    "slug": "playstation3",
                    "image": null,
                    "year_end": null,
                    "year_start": null,
                    "games_count": 3416,
                    "image_background": "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg"
                },
                "released_at": "2013-09-17",
                "requirements_en": null,
                "requirements_ru": null
            },
            {
                "platform": {
                    "id": 14,
                    "name": "Xbox 360",
                    "slug": "xbox360",
                    "image": null,
                    "year_end": null,
                    "year_start": null,
                    "games_count": 2776,
                    "image_background": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg"
                },
                "released_at": "2013-09-17",
                "requirements_en": null,
                "requirements_ru": null
            },
            {
                "platform": {
                    "id": 1,
                    "name": "Xbox One",
                    "slug": "xbox-one",
                    "image": null,
                    "year_end": null,
                    "year_start": null,
                    "games_count": 5476,
                    "image_background": "https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg"
                },
                "released_at": "2013-09-17",
                "requirements_en": null,
                "requirements_ru": null
            }
        ],
        "background_image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        "createdByUser": false
    },*/