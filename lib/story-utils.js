const md5 = require('md5');

module.exports = {
  createStoryFromApi(story) {
    const { title, description, publishedAt, urlToImage, url, source } = story;
    return {
      _id: md5(story.title),
      title,
      description,
      publishedAt,
      urlToImage,
      url,
      source,
    };
  },
};
