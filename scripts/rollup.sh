#Download source files
mkdir -p temp/
curl https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.js -o temp/js.cookie.js

#Combine all js files in temp > vendor.js
mkdir -p dist/assets
cat temp/*.js > dist/assets/vendor.js

#delete temp directory
rm -f -r temp
