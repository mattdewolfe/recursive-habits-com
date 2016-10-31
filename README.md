# Relish Phaser Project Boilerplate

A Blank Phaser Project forked from the [Relish Phaser Project Boilerplate](https://bitbucket.org/relishinc/relish-phaser-project-boilerplate) repo.

# V2 Migration Guide 

## Project File Changes
----------
To migrate your project to use Dijon V2, you'll need to modify the following files.

### **app/package.json**
```package.json``` the "devDependencies" list in package.json should be a copy of the package.json file here. If you are upgrading an existing project, run 
```sh
npm update
```
from the terminal after updating the package.json file

### **app/bower.json**
```bower.json``` should be a direct copy of the file in this repo. Also, if you're upgrading an existing repo, you'll need to run
```sh
bower update
```
from the terminal after updating the bower.json file

### **app/gulpfile.js**
```gulpfile.js``` should be a direct copy of the gulpfile in this repo

### **app/src/index.html**
in your index.html file your ```script``` tags at the bottom should look like this:
```sh
<!-- build:js assets/js/app.min.js?v=@@version-->
    <script src="bower_components/phaser-official/build/phaser.js"></script>
    <script src="bower_components/phaser-debugger/dist/phaser-debug.js"></script>
    <script src="bower_components/systemjs/dist/system.js"></script>
    <script src="submodules/dijon/build/dijon.js"></script>
    <script src="assets/js/app.js"></script>
<!-- /build -->
```

### **app/src/js/bootstrap.js**
A file that gets appended to the app.js during build, and bootstraps your app.
*** Can be a direct copy of the file in the boilerplate app.***

### **app/src/scripts/bootstrap.ts**
A file that should import your main application file, and have a method named ```run``` that, when called, creates a new instance, thereby bootstrapping your app.
This file should also have the following TS reference:
```sh
/// <reference path="../../submodules/dijon/build/dijon.d.ts"/> 
```

## Module Importing
----------
### **Dijon library modules**
Dijon is now broken into the following module structure, and compiled, are *ambient modules*.:

* dijon
    * application
        * Application
    * core
        * AnalyticsManager
        * AssetManager
        * AudioManager
        * SequenceManager
        * StorageManager
        * TransitionManager
        * Game
        * GameObjectFactory
        * State
    * mvc
        * Model
        * Mediator
        * Notification
        * CopyModel
     * display
        * Sprite
        * Group
        * Text
        * InvisibleButton
        * Component
     * utils
        * Device
        * Notifications
     * interfaces
        * INotification
        * INotifier
        * IObserver
        * IGameConfig
        * IAsset
        * IAssetList
        * ISound
        * IPathConfig
        * ITransition
        * ITransitionHandler
        * IPreloadHandler
        * IBrowser
 
Imports are done in ES6 style, like so.

**Extend "dijon/application/Application"**
```sh
import {Application} from "dijon/application";

export default class MyApplication extends Application{
    ...
}
```
 
**Extend "dijon/display/Group" with an children that extends "dijon/display/Sprite" and "dijon/display/Text"**
```sh
import {Group, Sprite, Text} from "dijon/display";

export default class MyGroup extends Group{
    private _mySprite:Sprite;
    private _myText:Text;
    
    constructor(){
        super(0, 0);
        
        this.init();
        this.buildInterface();
    }
    
    public init():void{
    
    }
    
    public buildInterface():void{
        this._mySprite = this.game.add.dSprite(0, 0, 'key', 'frame');
    }
}
```  
----------  
### **Project modules**
If your project classes are all contained in their own files, an ambient module will be created for each class, and each class should have one *default* export, like in the ***Extend "dijon/application/Application"*** example above. Then, when importing your class to another class, do it like so:

**Create the "BaseState" class and extend it for all other states:**
```sh
import {State} from "dijon/core";

export default class BaseState extends State {
    ...
}
```
```sh
import BaseState from "./BaseState";

export default class Menu extends BaseState {
    ...
}
```
notice in the last example, there are no {} braces around the import. This signifies that the import is only going to import the ***default export*** from the referenced module.


# V1 (Deprecated)
## Pre-requisites

To build the project locally, you will need to have [node][node] and [gulp][gulp] set up on your machine.
Alternatively, upload the files in the /dist folder to run from any server.

## Getting started
To initialize the project, from the terminal * cd into the /app folder and run:

```sh
$ npm install
```
This will install the required node dependencies, and automatically run **bower install** and build the project.

## Main gulp commands
To package all source files and run on a local server simply run the following command:

```sh
$ gulp
```
To just run the server without packaging (restart if an error happened, or something), run:

To package for distribution (creates 'dist' folder):
```sh
$ gulp build
```
The contents of the dist folder can then be uploaded to any server to run the production version of the game.

## Other useful gulp commands
To compile all images (including spritesheets):
```sh
$ gulp images
```
To compile just spritesheets:
```sh
$ gulp spritesheets
```
To compile scripts:
```sh
$ gulp scripts
```

## Scaffold
* assets (image and sound files, use 'assets/file_name' in source code)
    * data
    * css
    * fonts
    * audio
    * img
    * js

* any static files that don't need to be compiled or run through gulp can go in the /static folder.

## Sound
* sound has been converted to audiosprites (for sfx) and single web audio files (ogg and mp3) for music
* tools used
    * [audacity][audacity] for music files (easier to make a proper loop, can export to any format)
    * [audiosprite][audiosprite] for making audiosprite files and json

####Encoding
######Here's our current process for this:
* Dump ALL the effects that are going to go in audio sprites into one folder.
* Pull them into Audacity.
* Set the project sample rate to 44100 (bottom left)
* Check them all for length, and padding on the end. You can add silence to the end a track by moving the playhead to the end and going to Generate > Silence. I made sure all the tracks were ~0.5 seconds at minimum.
* Go to File > Export Multiple.
* Choose MP3.
* In options, make sure the bitrate is 128. Single channel (joined).
* Export them all into one folder. From there you'll divide them into folders for the different audio sprites, as we did before.

####Audio sprite generation
Here's the tricky part. IE needs a 128 bitrate, which makes the filesize bigger. Other browsers don't need this.
So, we need to generate each audio sprite twice and always do the mp3 one first.

######Here are the two command line structures for building the sprites
First, open a terminal and cd into app/audio/src

######MP3 command line setting
`audiosprite  -c 1 -g 2 -r 44100 -e "mp3" -b 128 -o sprite/fx_1 sprite/fx_1/*`
*(this would pull all the files from the sprite/fx_1 folder into an audio sprite called fx_1)*

######M4A, OGG command line setting
`audiosprite  -c 1 -g 2 -r 44100 -e "m4a,ogg" -b 48 -o sprite/fx_1 sprite/fx_1/*`

######Single Tracks
For single tracks, we just use Audacity to generate an mp3, ogg and m4a file for each single track.

* fx (audio files and json) should exported to the src/audio/sprite folder * will be automatically copied to the assets folder when the gulp command is used
* music (just audio files) should be exported to the src/audio/sound folder * will be automatically copied to the assets folder when the gulp command is used

## Editing
When editing, make sure you update the files within the `app/src` directory. These files will then be compressed and added to the `dist` directory ready for publishing.

## Add-on libraries
You can make use of the [underscore][underscore] library in your project.
Relish's [Phaser plugins library][relish-phaser-plugins] is included as a bower component. By default, the Dijon Debugger is included in the build. To remove, you can comment out the script in index.html, and not require the plugin in Boot.js

## Submodules
Relish's [Dijon][dijon] code library is included as a submodule.

[node]:       http://nodejs.org/
[gulp]:       http://gulpjs.com/
[underscore]: http://underscorejs.org/
[audacity]: http://audacity.sourceforge.net/
[audiosprite]: https://github.com/tonistiigi/audiosprite
[dijon]: https://bitbucket.org/relishinc/dijon
[relish-phaser-project]: https://bitbucket.org/relishinc/relish-phaser-project
[relish-phaser-plugins]: https://bitbucket.org/relishinc/relish-phaser-plugins