1. To run application with gulp enter following commands:

1.1 bower install

1.2 npm install

1.3 gulp dev // for development environment with live-reload

1.4 gulp prod // building app for production with static server for testing


2. To run angular application inside cordova application:

2.1 Install cordova according to the manual:

https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli


2.2 Install android sdk and packages:

https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#setting-environment-variables


2.3 In your terminal run following commands:

2.3.1 cordova platform add android --save

2.3.2 gulp cordova:emulate

