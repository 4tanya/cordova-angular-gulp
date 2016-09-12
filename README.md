To run application with gulp enter following commands:

bower install

npm install

gulp dev // for development environment with live-reload

gulp prod // building app for production with static server for testing


To run angular application inside cordova application:

1) Install cordova according to the manual:

https://cordova.apache.org/docs/en/latest/guide/cli/index.html#installing-the-cordova-cli


2) Install android sdk and packages:

https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#setting-environment-variables


3) In your terminal run following commands:

cordova platform add android --save

gulp cordova:emulate

