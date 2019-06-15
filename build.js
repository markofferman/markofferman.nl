var metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var googleAnalytics = require('metalsmith-google-analytics');
var markdown = require('metalsmith-markdown');
var metallic = require('metalsmith-metallic');
var drafts = require('metalsmith-drafts');
var favicons = require('metalsmith-favicons');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var hbtdate = require('handlebars-helper-formatdate')(handlebars);
var permalinks = require('metalsmith-permalinks');
var assets = require('metalsmith-assets');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

metalsmith(__dirname)
	.metadata({
		site: {
			name: 'THE PIRATE',
			baseurl: 'http://markofferman.nl',
			author: 'Mark Offerman',
			description: '.....'
		}
	})
	.source('./src')
	.destination('public')
	.use(drafts())
	.use(favicons({
		src: '**/logo.png',
		destination: '/favicons/',
		icons: {
			android: true,
			appleIcon: true,
			favicons: true
		}
	}))
	.use(collections({
		articles:{
			pattern: 'articles/**/*.md',
			sortBy: 'date',
			reverse: true
		},
	}))
	.use(markdown(
		))
	.use(metallic(
		))
	.use(permalinks({
		relative: false,
		pattern: ':title',
	}))
	.use(layouts({
		engine: 'handlebars',
		directory: './layouts',
		default: 'article.html',
		pattern: ["*/*/*html", "*/*html", "*html"],
		partials: {
			header: 'partials/header',
			footer: 'partials/footer'
		}
	}))
	.use(assets({
		source: './assets',
		destination: './assets'
	}))
	.use(serve({
		port: 8081,
		verbose: true
	}))
	.use(watch({
		paths: {
			"${source}/*/*": true,
			"layout/**/*": "**/*",
			"assets/*/*": true,
			"layouts/index.html": true,
		}
	}))
	// .use(googleAnalytics('UD-Tracking-ID'))
	.build(function (err) {
		if (err) {
			console.log(err);
		}
		else {
			console.log('build succesfull!!');
		}
	});
