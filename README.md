 
## Synopsis

This is a command-line interface application that retrieves the weather forecast for a given/ saved address.  

It was created with the help of:

* Node.js
* Yargs
* Axios

## Installation

Use `npm init` to instantiate the required modules.
Run application through a command-line interface.

## How it works

The application provides weather information after you pass in an address directly or may use an already saved address (default address).

The app has some predefined commands:
* `app.js -a "city/ postal code/ country"`    - add a new address, fetch weather with it ("on the fly" address fetching);
* `app.js default -s "p"`                     - add a default address/ replace already existing default address;
* `app.js default -l`                         - list the saved default address;
* `app.js default -r`                         - remove default address;
* `app.js default`                            - run app with default address (same as: `app.js -a` or `app.js default -a`);
* `app.js -a`                                 - run app with default address;
* `app.js default` -a                         - run app with default address;

To retrieve address for Sofia, you may use following command: `app.js -a "sofia BG"`:

![Alt text](screenShots/01.JPG?raw=true "App Preview 1")

If you try to list/ remove the default address without setting it first, you will get warning messages:

![Alt text](screenShots/02.JPG?raw=true "App Preview 2")

Preview of output using default/ saved address:

![Alt text](screenShots/03.JPG?raw=true "App Preview 3")

Before you can change/ save another address, you get prompted for confirmation first. After confirmation, you may list the address to make sure it got saved:

![Alt text](screenShots/04.JPG?raw=true "App Preview 4")

You may also remove your default address altogether, confirmation is need for this step as well:

![Alt text](screenShots/05.JPG?raw=true "App Preview 5")

## Contributors

Patricia Georgescu

## License
This is an app based on my Udemy courses knowledge whose main purposes are learning and practicing skills.

