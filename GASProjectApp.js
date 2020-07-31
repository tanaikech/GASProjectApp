/**
 * GitHub  https://github.com/tanaikech/GASProjectApp<br>
 * Get standalone Google Apps Script project.<br>
 * @param {String} fileId the file ID of standalone Google Apps Script project.
 * @param {String} fields fields of the method of Files: export in Drive API v3.
 * @return {Object} JSON object of project
 */
function getProject(fileId, fields) {
    return new GASProjectApp().getProject(fileId, fields || null);
}

/**
 * Create project.<br>
 * @param {Object} object object for creating Google Apps Script project.
 * @return {Object} Created project information.
 */
function createProject(object) {
    return new GASProjectApp().createProject(object);
}

/**
 * Update project.<br>
 * @param {Object} object object for updadting Google Apps Script project.
 * @return {Object} Return project information.
 */
function updateProject(object) {
    return new GASProjectApp().updateProject(object);
}
;
(function(r) {
  var GASProjectApp;
  GASProjectApp = (function() {
    class GASProjectApp {
      constructor() {
        this.name = "GASProjectApp";
        this.headers = {
          Authorization: `Bearer ${ScriptApp.getOAuthToken()}`
        };
      }

      getProject(fileId_, fields_) {
        var params, url;
        if (fileId_ === "" || (fileId_ == null)) {
          throw new Error("No fileId of standalone Google Apps Script project.");
        }
        url = `https://www.googleapis.com/drive/v3/files/${fileId_}/export?mimeType=application%2Fvnd.google-apps.script%2Bjson`;
        if (fields_) {
          url += `&fields=${encodeURIComponent(fields_)}`;
        }
        params = {
          method: "GET",
          headers: this.headers,
          muteHttpExceptions: true
        };
        return UrlFetchApp.fetch(url, params);
      }

      createProject(obj_) {
        var form, mimeType, params, url;
        if (obj_ == null) {
          throw new Error("No object for creating new Google Apps Script project.");
        }
        mimeType = "application/vnd.google-apps.script";
        if (!obj_.metadata) {
          obj_.metadata = {
            name: "sample",
            mimeType: mimeType
          };
        }
        if (!obj_.metadata.mimeType || obj_.metadata.mimeType !== mimeType) {
          obj_.metadata.mimeType = mimeType;
        }
        form = FetchApp.createFormData();
        form.append("metadata", Utilities.newBlob(JSON.stringify(obj_.metadata), "application/json"));
        if (obj_.body) {
          if (obj_.body) {
            form.append("file", Utilities.newBlob(JSON.stringify(obj_.body), `${mimeType}+json`));
          }
        }
        url = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
        if (obj_.fields) {
          url += `&fields=${encodeURIComponent(obj_.fields)}`;
        }
        params = {
          method: "POST",
          headers: this.headers,
          body: form,
          muteHttpExceptions: true
        };
        return FetchApp.fetch(url, params);
      }

      updateProject(obj_) {
        var form, mimeType, params, url;
        if (obj_ == null) {
          throw new Error("No object for updating new Google Apps Script project.");
        }
        if (obj_.fileId == null) {
          throw new Error("No file ID of the standalone Google Apps Script project.");
        }
        mimeType = "application/vnd.google-apps.script";
        if (!obj_.metadata) {
          obj_.metadata = {};
        }
        form = FetchApp.createFormData();
        form.append("metadata", Utilities.newBlob(JSON.stringify(obj_.metadata), "application/json"));
        if (obj_.body) {
          if (obj_.body.hasOwnProperty("files")) {
            if (obj_.body) {
              form.append("file", Utilities.newBlob(JSON.stringify(obj_.body), `${mimeType}+json`));
            }
          }
        }
        url = `https://www.googleapis.com/upload/drive/v3/files/${obj_.fileId}?uploadType=multipart`;
        if (obj_.fields) {
          url += `&fields=${encodeURIComponent(obj_.fields)}`;
        }
        params = {
          method: "PATCH",
          headers: this.headers,
          body: form,
          muteHttpExceptions: true
        };
        return FetchApp.fetch(url, params);
      }

    };

    GASProjectApp.name = "GASProjectApp";

    return GASProjectApp;

  }).call(this);
  return r.GASProjectApp = GASProjectApp;
})(this);
