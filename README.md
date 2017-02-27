# Eventercom-Redux
[![wercker status](https://app.wercker.com/status/ee705428161ef99a90d3331cae4a398b/s/master "wercker status")](https://app.wercker.com/project/byKey/ee705428161ef99a90d3331cae4a398b)
--------------
The eventercom app - rewritten to use redux and webpack.

#### Development
```
$ npm start
```

#### Tech Stack
* [React JS](https://facebook.github.io/react/)
  * UI components
* [Redux](http://redux.js.org/)
  * Client side state management
* [Express JS](http://expressjs.com/)
  * Node JS server - as this is a universal JS application - the server side route requests are mapped to the corresponding client side route.
* [Wercker Continuous Integration](http://wercker.com/)
  * Trigger app linting, testing, asset building and pushing to Heroku.
* [Webpack asset bundling](https://webpack.github.io/)
  * Packs application modules into bundled assets
* [Heroku](https://www.heroku.com/)
  * Hosting and app pipeline (staging -> production) management
