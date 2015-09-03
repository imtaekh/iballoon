require('dotenv').load();

var config={
  port: 3001
  ,db: process.env.WDI_PROJECT_4_DB
  ,secret: process.env.WDI_PROJECT_4_SESSION_SECRET
  ,INSTAGRAM_CLIENT_ID: process.env.WDI_PROJECT_4_INSTAGRAM_CLIENT_ID
  ,INSTAGRAM_CLIENT_SECRET: process.env.WDI_PROJECT_4_INSTAGRAM_CLIENT_SECRET
  ,instagramCallbackUrl: process.env.WDI_PROJECT_4_INSTAGRAM_CALLBACK_URL
};

module.exports = config;
