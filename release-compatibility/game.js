
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', '.git', true, true);
Module['FS_createPath']('/.git', 'logs', true, true);
Module['FS_createPath']('/.git/logs', 'refs', true, true);
Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git', 'hooks', true, true);
Module['FS_createPath']('/.git', 'refs', true, true);
Module['FS_createPath']('/.git/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/refs', 'heads', true, true);
Module['FS_createPath']('/.git', 'objects', true, true);
Module['FS_createPath']('/.git/objects', 'bf', true, true);
Module['FS_createPath']('/.git/objects', 'ee', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', '32', true, true);
Module['FS_createPath']('/.git/objects', '14', true, true);
Module['FS_createPath']('/.git/objects', '97', true, true);
Module['FS_createPath']('/.git/objects', '18', true, true);
Module['FS_createPath']('/.git/objects', '10', true, true);
Module['FS_createPath']('/.git/objects', '83', true, true);
Module['FS_createPath']('/.git/objects', '13', true, true);
Module['FS_createPath']('/.git/objects', '1a', true, true);
Module['FS_createPath']('/.git/objects', 'ad', true, true);
Module['FS_createPath']('/.git/objects', '11', true, true);
Module['FS_createPath']('/.git/objects', 'f4', true, true);
Module['FS_createPath']('/.git/objects', '85', true, true);
Module['FS_createPath']('/.git', 'info', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 5084, "filename": "/main.lua"}, {"audio": 0, "start": 5084, "crunched": 0, "end": 5095, "filename": "/.git/COMMIT_EDITMSG"}, {"audio": 0, "start": 5095, "crunched": 0, "end": 5168, "filename": "/.git/description"}, {"audio": 0, "start": 5168, "crunched": 0, "end": 5191, "filename": "/.git/HEAD"}, {"audio": 0, "start": 5191, "crunched": 0, "end": 5328, "filename": "/.git/index"}, {"audio": 0, "start": 5328, "crunched": 0, "end": 5602, "filename": "/.git/config"}, {"audio": 0, "start": 5602, "crunched": 0, "end": 5716, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 5716, "crunched": 0, "end": 6635, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 6635, "crunched": 0, "end": 7291, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 7291, "crunched": 0, "end": 7502, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 7502, "crunched": 0, "end": 8421, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 8421, "crunched": 0, "end": 8965, "filename": "/.git/hooks/pre-receive.sample"}, {"audio": 0, "start": 8965, "crunched": 0, "end": 12292, "filename": "/.git/hooks/fsmonitor-watchman.sample"}, {"audio": 0, "start": 12292, "crunched": 0, "end": 17190, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 17190, "crunched": 0, "end": 18086, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 18086, "crunched": 0, "end": 18275, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 18275, "crunched": 0, "end": 18699, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 18699, "crunched": 0, "end": 20341, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 20341, "crunched": 0, "end": 23951, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 23951, "crunched": 0, "end": 25299, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 25299, "crunched": 0, "end": 25777, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 25777, "crunched": 0, "end": 27269, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 27269, "crunched": 0, "end": 27310, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 27310, "crunched": 0, "end": 27342, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 27342, "crunched": 0, "end": 27383, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 27383, "crunched": 0, "end": 27976, "filename": "/.git/objects/bf/86aaf03a87560d80903b44fad3d4701813fa65"}, {"audio": 0, "start": 27976, "crunched": 0, "end": 29306, "filename": "/.git/objects/ee/f5ca4d7c069e2dd4ef770a01961f80c5f5e2aa"}, {"audio": 0, "start": 29306, "crunched": 0, "end": 29321, "filename": "/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391"}, {"audio": 0, "start": 29321, "crunched": 0, "end": 29374, "filename": "/.git/objects/32/d944148b30bef622653c0fe2c6720dfcad3e95"}, {"audio": 0, "start": 29374, "crunched": 0, "end": 29427, "filename": "/.git/objects/14/24d454a4262514a31f4ee7b73a73332ef325db"}, {"audio": 0, "start": 29427, "crunched": 0, "end": 29592, "filename": "/.git/objects/97/47e230993566d4d564246dead1c1327402cd11"}, {"audio": 0, "start": 29592, "crunched": 0, "end": 29763, "filename": "/.git/objects/18/a448e112787375c1b619f36d5ce9a43f26a5c5"}, {"audio": 0, "start": 29763, "crunched": 0, "end": 29845, "filename": "/.git/objects/10/14402beafb2e74d9e60fa5931feb1f4aca009c"}, {"audio": 0, "start": 29845, "crunched": 0, "end": 31164, "filename": "/.git/objects/83/e38c7951ca9d650e961ce4ab332793906957b7"}, {"audio": 0, "start": 31164, "crunched": 0, "end": 31336, "filename": "/.git/objects/13/ec139da4f856b008b3c4604fd4d48c9aa58129"}, {"audio": 0, "start": 31336, "crunched": 0, "end": 31418, "filename": "/.git/objects/1a/39c187d08a60f53f021bbfe999cb0bf8c74a4c"}, {"audio": 0, "start": 31418, "crunched": 0, "end": 31947, "filename": "/.git/objects/ad/ab124b84604a5e166fb2263f1a09ddd404a532"}, {"audio": 0, "start": 31947, "crunched": 0, "end": 32000, "filename": "/.git/objects/11/69b565a9f803ff90692414c9b3b8356786801f"}, {"audio": 0, "start": 32000, "crunched": 0, "end": 32895, "filename": "/.git/objects/f4/0f9e11d6d7a9f4ed70b63a1a535d3411960dbe"}, {"audio": 0, "start": 32895, "crunched": 0, "end": 33072, "filename": "/.git/objects/85/819226eb6ee87d6987ed44adefec0720e038fd"}, {"audio": 0, "start": 33072, "crunched": 0, "end": 33312, "filename": "/.git/info/exclude"}], "remote_package_size": 33312, "package_uuid": "fe4f26ba-c6c6-4bc0-83c9-cb7eebc89622"});

})();
