This is the design note for part 2 of enabling source file editing from the Node-RED admin ui.

Please refer to Issue #43 for the part 1 design notes that show everything implemented in uibuilder v1.1.0.

**NOTE**: If using Node-RED's "projects" feature, each project now gets its own `uibuilder` folder. Without projects, this is located at `<userDir>/uibuilder/`. With projects, it will not be located at `<userDir>/projects/<projectName>/uibuilder/`. **This location will now be referred to as `<uibRoot>`**.


- [ ] Allow change of uibuilder.url to:
   - [x] Check url is free to use - using the uibindex api
   - [x] Does not contain leading dots or underscores
   - [x] Does not contain `/` or `\`
   - [ ] Copy (or rename?) current folder to new folder

###

- Improvements to front-end (`uibuilderfe.js` and templates)
   - [x] (v2) Move socket.io client library path to include `httpNodeRoot`.
   - [x] Change default template from jquery + normalize.cs to VueJS + bootstrap-vue (much the same size)
      - [x] Needs to auto-install vue and boostrap-vue packages.

###

- Improvements to back-end (`uibuilder.js`)
   - [x] (v2) Move vendor file serving from instance level to module level so it is only ever done once. Also rationalise.
   - [x] Move uibindex API from standard to admin web interfaces.
   - [x] Add `<adminurl>/uibvendorpackages` admin API.
   - [x] Use `<adminurl>/uibvendorpackages` API to list available vendor package urls in admin ui.
   - [x] (v2) Move socket.io client library path to include `httpNodeRoot`.
   - [x] Move active vendor package list from `settings.json` to `<uibRoot>/` to allow it to be updated by install handling. (Breaking change)
   - [x] Add initial process to move settings after migration from v1 to v2.
   - [x] Add Socket.IO path to the `<adminurl>/uibindex` API - in preparation for enabling other nodes to communicate with uibuilder front-end's.
  
   - [x] Add `<adminurl>/uibnpm` admin API. Enable npm commands to be called from the admin ui. Checks whether `package.json` is available. Work against `userDir` or `<uibRoot>/<url>` locations (optional `url` parameter).
     - [x] List all installed top-level packages
     - [x] Allow check if `package.json` and `node_modules` are present
     - [x] Allow creation of `package.json` in `userDir` or `<uibRoot>/<url>`.
     - [x] Allow package installations/updates/removals.
     - [ ] Allow edit of `package.json` in `<uibRoot>/<url>`.
     - [ ] Handle npm restart scripts
  
   - [x] Use projects folder if projects are in use. See [PR #47](https://github.com/TotallyInformation/node-red-contrib-uibuilder/pull/47) for details.
     - [ ] Add advanced option to uibuilder.html - use of project folder is optional
  
   - [ ] Move custom middleware load from settings.js to `<uibRoot>/.mware/`. Possibly also allow for `<uibRoot>/<url>/.mware/`.
   - [ ] *Update close processing to use vendorPaths. Need to check whether this is actually needed.*

###

- Improvements to admin config ui (`uibuilder.html`)
  - [x] Swap vendor path list to uibvendorpackages API
  - [x] Cancel and Done buttons disabled if there are unsaved changes to a file. Either Save or reset the file to re-enable them.
  - [x] Improved validation for url setting. It must not be more than 20 characters, must not equal 'template'. Must not contain '..', '/' or '\'. Must not start with '_', '.'. It must also be unique (e.g. not already in use).
  - [x] Default/previously selected file opened for edit automatically.
  - [x] Improved handling of reopening the ui - last file selection retained.
  - [x] Add input parameter and path validation
  - [x] ~~(uibuilder.html) Mark node as "dirty" if file not saved. (`RED.nodes.dirty(true)`).~~ Disable Done/Cancel buttons instead, a lot easier.
  - [x] Hide path and module info by default and allow toggle to show

  - [x] New _Advanced settings_ option (hidden by default)
     - [ ] Add flag to make use of project folder optional.
     - [ ] Allow (advanced option) use of a NEW ExpressJS app (rather than reusing RED.httpNode) - giving the ability to have extra control, use a different port and separate security.
        - [ ] Need to make use of Node-RED middleware optional.
  
  - [ ] Add server path to info panel `<userDir>/uibuilder/<url>` or `<userDir>/projects/<projectName>/uibuilder/<url>`.
  - [ ] Add interface for npm operations. Using `<adminurl>/uibnpm` admin API.
  - [ ] Add file delete (button is in place but disabled)
  - [ ] Deleting one of the template files will reset it to the default if the copy flag is enabled in the main properties.
  - [ ] Add validation hints for users


- [x] Move back-end log files from `<userDir>` to `<uibRoot>/.logs`

   - [ ] add check for writable
   - [ ] add check for prod/dev, prod+no dev should use standard RED.log
   - [ ] Find a way to have different logs per instance.

###

- [ ] Add a "Build" button, disabled by default. uibuilder will check whether there is a `package.json` file in the `<uibRoot>/<uibuilder.url>` folder and whether it contains a script called "build". If that exists, the build button will be enabled.

     This will need you to have followed the [build instructions in the WIKI](https://github.com/TotallyInformation/node-red-contrib-uibuilder/wiki/Using-VueJS-with-Webpack). Or to have come up with some other build process.

    - [ ] Add example webpack build file.

###

- [ ] (v2) Update WIKI and examples for new paths


## Maybe

* [ ] FE - special control msg to create a new channel - to be used for components

* [ ] BE - new node - "component" - Define a component to load {name, file/url, (schema)}. Trigger FE to lazy load the component on new (re)connection. Create socket.io channel

* [ ] FE - add function to reload the page - allow for a control msg to do so.

- [ ] Allow folder name to be independent of uibuilder.url?

- [ ] Consider option to expose both `src` and `dist` folders to the web server.

    Not directly related to this feature set but probably quite useful anyway as it would allow admins to switch between them. 

- [ ] Add GIT processing?
   - [ ] Is git command available?
   - [ ] is front-end src folder a git repository?
   - [ ] git commit
   - [ ] git push


## References

* FE/BE API: [Serialport node](https://github.com/node-red/node-red-nodes/tree/master/io/serialport). [html](https://github.com/node-red/node-red-nodes/blob/master/io/serialport/25-serial.html#L333), [js](https://github.com/node-red/node-red-nodes/blob/master/io/serialport/25-serial.js#L424)
* Expand edit area: [Function node](https://github.com/node-red/node-red/blob/master/nodes/core/core/80-function.html)
* Switch editor type: [Template node](https://github.com/node-red/node-red/blob/master/nodes/core/core/80-template.html). [drop-down/select html](https://github.com/node-red/node-red/blob/master/nodes/core/core/80-template.html#L20)
* Admin ui button: [Google Authenticate config node](https://github.com/node-red/node-red-web-nodes/blob/master/google/google.html#L37)
* ACE [How-To](https://ace.c9.io/#nav=howto), [Configuring](https://github.com/ajaxorg/ace/wiki/Configuring-Ace)
* ExpressJS v4 [Docs](http://expressjs.com/en/api.html#res.sendFile)
* jQuery [Docs](https://api.jquery.com)
* [Official docs for creating nodes](https://nodered.org/docs/creating-nodes/)
* [How the deploy button works](https://github.com/node-red/node-red/blob/a6ef755139613a7261372c692189f21115b2d0c6/editor/js/ui/deploy.js#L260)
* [CORS failure when using jQuery POST](https://stackoverflow.com/questions/5584923/a-cors-post-request-works-from-plain-javascript-but-why-not-with-jquery))