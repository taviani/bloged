module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'KDE blog', // Navigation and Site Title
  siteTitleAlt: 'Mini Blog', // Alternative Site title for SEO
  siteTitleManifest: 'KDE blog',
  siteUrl: 'https://blog.kde.fr', // Domain of your site. No trailing slash!
  siteLanguage: 'fr', // Language Tag on <html> element
  siteHeadline: 'Macro blogging', // Headline for schema.org JSONLD
  siteBanner: '/social/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Petit blog pour évoquer les sujets qui m&#130;intéressent, personnels ou professionnels', // Your site description
  author: 'KDE', // Author for schemaORGJSONLD
  siteLogo: '/social/logo.png', // Image for schemaORGJSONLD


  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  github: 'https://github.com/taviani',
}
