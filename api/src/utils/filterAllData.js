const relevantData = function (array) {
    const myData = array.map((element) => {
      return {
        id: element.id,
        name: element.name,
        description: element.description,
        release: element.release,
        rating: element.rating,
        genres: element.genres.map((genre) => genre.name),
        platforms: element.platforms.map((plat)=> plat.name),
        background_image: element.background_image,
        createdByUser: element.createdByUser,
      };
    });
    return myData;
  };
  module.exports={relevantData}