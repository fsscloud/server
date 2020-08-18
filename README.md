# FSS Cloud Server ☁

FSS Cloud is a fork from the NextCloud project and is looking to focus the project on the File Sync and share. Once the needed goals are acomplished; we might look at reverse merge with the NextCloud project if the team likes our contributions.


Otherwise, git checkouts can be handled the same as release archives, by using the `stable*` branches. Note they should never be used on production systems.


### Building front-end code 🏗

We are moving more and more towards using Vue.js in the frontend, starting with Settings. For building the code on changes, use these terminal commands in the root folder:

``` bash
# install dependencies
make dev-setup

# build for development
make build-js

# build for development and watch edits
make watch-js

# build for production with minification
make build-js-production
```

**When making changes, also commit the compiled files!**

We still use Handlebars templates some places in Files and Settings. We will replace these step-by-step with Vue.js, but in the meantime you need to compile them separately.

If you don’t have Handlebars installed yet, you can do it with this terminal command:
```
sudo npm install -g handlebars
```

Then inside the root folder of your local Nextcloud development installation, run this command in the terminal every time you changed a `.handlebars` file to compile it:
```
./build/compile-handlebars-templates.sh
```


### Tools we use 🛠

- [👀 BrowserStack](https://browserstack.com) for cross-browser testing
- [🌊 WAVE](https://wave.webaim.org/extension/) for accessibility testing
- [🚨 Lighthouse](https://developers.google.com/web/tools/lighthouse/) for testing of performance, accessibility and more
