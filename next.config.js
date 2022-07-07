const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    // cloudinary, spotify, animal crossing
    domains: ["res.cloudinary.com", "i.scdn.co", "acnhapi.com"], 
  },
});