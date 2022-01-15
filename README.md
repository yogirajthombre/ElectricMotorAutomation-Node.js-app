Watch the live working demo of this Project on [YouTube](https://www.youtube.com/watch?v=uo8SwsEWS_E).

[Android app](https://github.com/yogirajthombre/ElectricMotorAutomationApp).

There are two major operations.

1.Sending data from app to raspberry pi to enable switching.

2.Recieving the water level data from raspberry pi to android app.


When the switch button was **ON** from the android app **isMotorRunning** parameter defined in schema of mongo dB was set to **true** and when button was set to OFF **isMotorRunning** was set to **false**.

Python Program running inside raspberry Pi fetches the response from particular api end point continuously and depending upon the value of the isMotorRunning parameter the switching of the appliance is done.

When it comes to the water level detection part the raspberry pi sends water level data that it receives from the distance sensor and it is stored in mongo dB in backend. As soon as backend starts receiving the data firebase cloud messaging enabled in backend starts sending notification to android app real time.

Also, in addition two more api's **Login** and **Register** were developed.

They enable personalized data process in app. First user registration is required in android app and when login is done **JWT** token gets generated from backend and is stored in the android app.

Hence whenever user will try to access api's for sending and receiving data JWT token will be required otherwise they won't be able to access those api's hence making api's private to user.
