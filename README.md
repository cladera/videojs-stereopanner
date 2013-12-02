videojs-stereopanner
==================
Stereo Panner is a plugin for video-js. The porpose of this package is extend video-js audio controls adding stereo panning methods.

With StereoPanner you can control which track listen to of a video in stereo. This feature is useful for multilingual broadcasts where you use stereo to send audio in two languages, for instance, the original language through the left channel and the simultaneous translation through the right channel.

##Installation
Add videojs.stereopanner.min.js file to your head tag, just after videojs:

```html
<html>
	<head>
		<!--Latest VideoJS-->
		<link href="http://vjs.zencdn.net/4.3/video-js.css" rel="stylesheet">
		<script src="http://vjs.zencdn.net/4.3/video-js.js"></script>
		<!--StereoPanner Pluging-->
		<script src="js/videojs.stereopanner.min.js"></script>
	</head>
	<body>
		...
```
##Usage
After load video-js enable StereoPanner calling the plugin init:
```js
videojs('myvideo').stereopanner();
````
Additionally you can pass which track you want listen to first. The starting default is 'left':
```js
videojs('myvideo').stereopanner({starting:'right'});
```

##API Methods
Once the plugin is started, you can change change the stereo channel using the following functions:

### panToLeft() ###

Mute right channel and pan audio to left

```js
	mplayer.panToLeft();
```

### panToRight() ###

Mute left channel and pan audio to right

```js
	mplayer.panToRight();
```

### panToStereo() ###

Back to stereo mode

```js
	mplayer.panToStereo();
```
##TODO
 - Create a audio toogle button in menu bar. 