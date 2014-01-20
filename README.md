# async-images #

This plugin allows you to asynchronously replace small, low-resolution images on your page with higher-resolution ones.
You can define multiple high-def images by associating them with a minimum device width. The image which has a bigger width than the device is used.

## How to use ##

### Method 1: function call ###

```javascript
$.asyncImages({
	"#img1": {
		1000: "./img/img1_lo.jpg",
		1500: "./img/img1_me.jpg",
		2000: "./img/img1_hi.jpg"
	}
});
```
```html
<img src="./img/img1_lo.jpg" id="img1" height="some_height" width="some_width">
```
Async-images will now check your device width. If it's higher than 1000px but smaller than 1500px, nothing will change. But if your device is wider than 1500px, `img1_me.jpg` will be loaded. As soon as this is done, the image in `#img1` will be replaced. If your device is wider than 2000px, `img1_hi.jpg` will be loaded and replaces the low-res image in `#img1`.

### Method 2: data-attributes (slightly inconvenient - will probably change) ###

```javascript
$.imageLoader();
```
This will search for all images with the data-loader atttribute:
```html
<img src="./img/img1_lo.jpg" data-loader="true" data-lowRes="1000"
	data-1500="./img/img1_me.jpg" data-2000="./img/img1_hi.jpg"
	height="some_height" width="some_width">
```
This will replace `img1_lo.jpg` with `img1_me.jpg` if your display is wider than 1500px and `img1_hi.jpg` if it's wider than 2000px.

## Important ##
Always set the height and width of the images. Otherwise they will get bigger when the bigger images are loaded.

## ToDo ##
- Moar automation! prefixes, suffixes and stuff...
- Add option to use device-pixel-ratio instead of width
