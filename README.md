# GASProjectApp

<a name="top"></a>

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENCE)

<a name="overview"></a>

# Overview

**This is a Google Apps Script library for creating, updating and exporting Google Apps Script project of the standalone type using Drive API. In this case, Apps Script API is not used.**

<a name="description"></a>

# IMPORTANT: PLEASE BE CAREFUL THIS.

![](images/fig1.png)

## **At first, please read this section**

## **<u>I cannot take responsibility for the problems occurred by this library. So when you use this library, please use it by according to your own decision and at your own responsibility.</u>**

## **This GAS library updates the existing standalone Google Apps Script project. So when you use the wrong object, the existing script is deleted. PLEASE BE CAREFUL THIS. So when you use the update method in this library, I would like to recommend to test using a sample Google Apps Script project.**

# Description

I had reported "Drive API cannot create Google Apps Script project no longer" before. [Ref](https://gist.github.com/tanaikech/0609f2cd989c28d6bd49d211b70b453d) About this, I had reported the future request. [Ref](https://issuetracker.google.com/issues/151165846) At July 30, 2020, I could confirm that the Google Apps Script project of the standalone type got to be able to be created by `multipart/form-data` using Drive API again. [Ref](https://gist.github.com/tanaikech/36821c7d70f9ce376d043c3d682d404e) This is a good news for me. By this, in order to use this with Google Apps Script, I created this library. Because in this case, when the update method is used, the special scope of `https://www.googleapis.com/auth/drive.scripts` is required. So I thought that when this is published as the Google Apps Script library, this will be useful for users.

# Limitation

- In this library, only the Google Apps Script project of the standalone type can be used. When you want to manage the container-bound script type, please use Google Apps Script API. [Ref](https://developers.google.com/apps-script/api)

I sincerely hope this library is useful for you.

<a name="methods"></a>

# Methods

| Method                                    | Description                                                                                                                                                     |
| :---------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getProject(fileId, fields)](#getproject) | Get standalone Google Apps Script project. `fileId` is the file ID of standalone Google Apps Script project.                                                    |
| [createProject(object)](#createproject)   | Create new standalone Google Apps Script project. In this case, the script can be included.                                                                     |
| [updateProject(object)](#updateproject)   | **When you use this, PLEASE BE CAREFUL. Please test this method using a sample Google Apps Script.** Update the existing standalone Google Apps Script project. |

# Library's project key

```
1to51j1yqDvtTrJIoHzgOffCnZOK9MTCcSkky6niwRJlTLTNpxIfj3bI-
```

# How to install

## Install this library

- Open Script Editor. Click as follows:
- -> Resource
- -> Library
- -> Input the Script ID in the text box. The Script ID is **`1to51j1yqDvtTrJIoHzgOffCnZOK9MTCcSkky6niwRJlTLTNpxIfj3bI-`**.
- -> Add library
- -> Please select the latest version
- -> Developer mode ON (Or select others if you don't want to use the latest version)
- -> The identifier is "**`GASProjectApp`**". This is set under the default.

[You can read more about libraries in Apps Script here](https://developers.google.com/apps-script/guide_libraries).

## Enable Drive API

In this library, Drive API is used. So [please enable Drive API at Advanced Google services](https://developers.google.com/apps-script/guides/services/advanced#enabling_advanced_services).

## About scopes

This library uses the following scope. This is installed in the library, and nothing further is required from the user.

- `https://www.googleapis.com/auth/drive`
- `https://www.googleapis.com/auth/drive.scripts`
- `https://www.googleapis.com/auth/script.external_request`

## Additional libraries

This library also uses the following GAS library.

- [FetchApp](https://github.com/tanaikech/FetchApp)

# Methods

<a name="getproject"></a>

## 1. getProject(fileId)

This method is used for retrieving the standalone Google Apps Script project.

### Sample script 1

```javascript
function myFunction() {
  const fileId = "###"; // Please set the file ID of the standalone Google Apps Script project.
  const res = GASProjectApp.getProject(fileId);
  const str = res.getContentText();
  console.log(str);
}
```

- This library returns Class HTTPResponse. [Ref](https://developers.google.com/apps-script/reference/url-fetch/http-response)
- **`fileId`** : File ID of standalone Google Apps Script project.
- **`fields`** : fields values of the method of "Files: export" in Drive API v3. [Ref](https://developers.google.com/drive/api/v3/reference/files/export) In the current stage, the result value is the same with and without `fields: "*"`.

<a name="createproject"></a>

## 2. createProject(object)

This method is used for creating new standalone Google Apps Script project. In this case, the script can be included.

### Sample script

```javascript
function myFunction() {
  const object = {
    metadata: {
      name: "sample project", // This is the filename of created Google Apps Script project.
      parents: ["###"], // This is a parent folder of created Google Apps Script project.
    },
    body: {
      files: [
        {
          name: "Code",
          type: "server_js",
          source: 'function sample() {\n  console.log("sample")\n}',
        },
      ],
    },
    fields: "id, name",
  };
  const res = GASProjectApp.createProject(object);
  const str = res.getContentText();
  console.log(str);
}
```

- This library returns Class HTTPResponse. [Ref](https://developers.google.com/apps-script/reference/url-fetch/http-response)
- **`metadata`** : This is the metadata of the method of "Files: create" in Drive API v3. [Ref](https://developers.google.com/drive/api/v3/reference/files/create)
- **`body`** : When you want to include the script when new Google Apps Script project is created, please use this. About the detail structure of `body`, you can confirm the retrieved value using `getProject` method. [Ref](#getproject) In this case, even when `appsscript.json` is not used, the default values are used. But in my environment, the default timezone was `America/Los_Angeles`. About this, I had already reported. But in the current stage, this is still not resolved. [Ref](https://issuetracker.google.com/issues/72019223) So please be careful this.
- **`fields`** : fields values of the method of "Files: create" in Drive API v3. [Ref](https://developers.google.com/drive/api/v3/reference/files/create)

<a name="updateproject"></a>

## 3. updateProject(object)

This method is used for updating the existing standalone Google Apps Script project.

### Sample script

**When you use this, PLEASE BE CAREFUL. Please test this method using a sample Google Apps Script.**

```javascript
function myFunction() {
  const object = {
    fileId: "###", // Please set the file ID of the existing standalone Google Apps Script project.
    metadata: {
      name: "updated filename",
    },
    body: {
      files: [
        {
          id: "###", // Please set the ID of each file in Google Apps Script project.
          name: "Code",
          type: "server_js",
          source: 'function sample() {\n  console.log("updated")\n}',
        },
      ],
    },
    fields: "name",
  };
  const res = GASProjectApp.updateProject(object);
  const str = res.getContentText();
  console.log(str);
}
```

- This library returns Class HTTPResponse. [Ref](https://developers.google.com/apps-script/reference/url-fetch/http-response)
- **`metadata`** : This is the metadata of the method of "Files: create" in Drive API v3. [Ref](https://developers.google.com/drive/api/v3/reference/files/create)
- **`body`** : When you want to include the script when new Google Apps Script project is created, please use this. About the detail structure of `body`, you can confirm the retrieved value using `getProject` method. [Ref](#getproject)
  - It seems that `id` is required. This `id` can be retrieved by the `getProject` method. [Ref](#getproject) This `id` cannot be retrieved with Apps Script API. Please be careful this.
- **`fields`** : fields values of the method of "Files: update" in Drive API v3. [Ref](https://developers.google.com/drive/api/v3/reference/files/update)

---

<a name="licence"></a>

# Licence

[MIT](LICENCE)

<a name="author"></a>

# Author

[Tanaike](https://tanaikech.github.io/about/)

If you have any questions or comments, feel free to contact me.

<a name="updatehistory"></a>

# Update History

- v1.0.0 (July 31, 2020)

  1. Initial release.

[TOP](#top)
