if command -v openssl > /dev/null
then
  mkdir -p dist
  openssl req -new -x509 -nodes -days 365 -keyout dist/server.key -out dist/server.crt -subj "//O=/C=US/CN=localhost"
else
  echo unknown command: openssl
fi
