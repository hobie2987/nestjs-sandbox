#Download source files
mkdir -p temp/
curl 'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.js' -o temp/js.cookie.js
curl 'https://polyfill.io/v3/polyfill.js?features=default&flags=always,gated' -o temp/polyfill.js


#Combine all js files in temp > vendor.js
mkdir -p dist/assets
cat temp/*.js > dist/assets/vendor.js

minify dist/assets/vendor.js > dist/assets/vendor.min.js

#delete temp directory
rm -f -r temp
