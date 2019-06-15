# markofferman.nl


## How it works

The metalsmith framework builds an HTML site from markdown files. Modifying these files happens in src/.
When you want to build the site, you run the make file

```
.
├── LICENSE
├── Makefile
├── README.md
├── assets
├── build.js
├── layouts
├── node_modules
├── package-lock.json
├── package.json
├── public
└── src  
```


## Serving locally:

``` 
$ make
```


## Deploying publicly:

1. Create docker image 
2. Push image to registry
3. Update Kubernetes/Nomad to run the public folder (server from var/www)t

