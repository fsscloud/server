!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/js/",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);i(1),i(2),i(3),i(4),i(5),i(6);window.OCA.SystemTags=OCA.SystemTags},function(e,i){OCA.SystemTags||(OCA.SystemTags={}),OCA.SystemTags.App={initFileList:function(e){return this._fileList?this._fileList:(this._fileList=new OCA.SystemTags.FileList(e,{id:"systemtags",fileActions:this._createFileActions(),config:OCA.Files.App.getFilesConfig(),shown:!0}),this._fileList.appName=t("systemtags","Tags"),this._fileList)},removeFileList:function(){this._fileList&&this._fileList.$fileList.empty()},_createFileActions:function(){var t=new OCA.Files.FileActions;return t.registerDefaultActions(),t.merge(OCA.Files.fileActions),this._globalActionsInitialized||(this._onActionsUpdated=_.bind(this._onActionsUpdated,this),OCA.Files.fileActions.on("setDefault.app-systemtags",this._onActionsUpdated),OCA.Files.fileActions.on("registerAction.app-systemtags",this._onActionsUpdated),this._globalActionsInitialized=!0),t.register("dir","Open",OC.PERMISSION_READ,"",function(t,e){OCA.Files.App.setActiveView("files",{silent:!0}),OCA.Files.App.fileList.changeDirectory(OC.joinPaths(e.$file.attr("data-path"),t),!0,!0)}),t.setDefault("dir","Open"),t},_onActionsUpdated:function(t){this._fileList&&(t.action?this._fileList.fileActions.registerAction(t.action):t.defaultAction&&this._fileList.fileActions.setDefault(t.defaultAction.mime,t.defaultAction.name))},destroy:function(){OCA.Files.fileActions.off("setDefault.app-systemtags",this._onActionsUpdated),OCA.Files.fileActions.off("registerAction.app-systemtags",this._onActionsUpdated),this.removeFileList(),this._fileList=null,delete this._globalActionsInitialized}},$(document).ready(function(){$("#app-content-systemtagsfilter").on("show",function(t){OCA.SystemTags.App.initFileList($(t.target))}),$("#app-content-systemtagsfilter").on("hide",function(){OCA.SystemTags.App.removeFileList()})})},function(e,i){var n;(n=function(t,e){this.initialize(t,e)}).prototype=_.extend({},OCA.Files.FileList.prototype,{id:"systemtagsfilter",appName:t("systemtags","Tagged files"),_systemTagIds:[],_lastUsedTags:[],_clientSideSort:!0,_allowSelection:!1,_filterField:null,initialize:function(t,e){if(OCA.Files.FileList.prototype.initialize.apply(this,arguments),!this.initialized){e&&e.systemTagIds&&(this._systemTagIds=e.systemTagIds),OC.Plugins.attach("OCA.SystemTags.FileList",this);var i=this.$el.find("#controls").empty();_.defer(_.bind(this._getLastUsedTags,this)),this._initFilterField(i)}},destroy:function(){this.$filterField.remove(),OCA.Files.FileList.prototype.destroy.apply(this,arguments)},_getLastUsedTags:function(){var t=this;$.ajax({type:"GET",url:OC.generateUrl("/apps/systemtags/lastused"),success:function(e){t._lastUsedTags=e}})},_initFilterField:function(e){var i=this;return this.$filterField=$('<input type="hidden" name="tags"/>'),e.append(this.$filterField),this.$filterField.select2({placeholder:t("systemtags","Select tags to filter by"),allowClear:!1,multiple:!0,toggleSelect:!0,separator:",",query:_.bind(this._queryTagsAutocomplete,this),id:function(t){return t.id},initSelection:function(t,e){var i=$(t).val().trim();if(i){var n=i.split(","),s=[];OC.SystemTags.collection.fetch({success:function(){_.each(n,function(t){var e=OC.SystemTags.collection.get(t);_.isUndefined(e)||s.push(e.toJSON())}),e(s)}})}else e([])},formatResult:function(t){return OC.SystemTags.getDescriptiveTag(t)},formatSelection:function(t){return OC.SystemTags.getDescriptiveTag(t)[0].outerHTML},sortResults:function(t){return t.sort(function(t,e){var n=i._lastUsedTags.indexOf(t.id),s=i._lastUsedTags.indexOf(e.id);return n!==s?-1===s?-1:-1===n?1:n<s?-1:1:OC.Util.naturalSortCompare(t.name,e.name)}),t},escapeMarkup:function(t){return t},formatNoMatches:function(){return t("systemtags","No tags found")}}),this.$filterField.on("change",_.bind(this._onTagsChanged,this)),this.$filterField},_queryTagsAutocomplete:function(t){OC.SystemTags.collection.fetch({success:function(){var e=OC.SystemTags.collection.filterByName(t.term);t.callback({results:_.invoke(e,"toJSON")})}})},_onUrlChanged:function(t){if(t.dir){var e=_.filter(t.dir.split("/"),function(t){return""!==t.trim()});this.$filterField.select2("val",e||[]),this._systemTagIds=e,this.reload()}},_onTagsChanged:function(t){var e=$(t.target).val().trim();this._systemTagIds=""!==e?e.split(","):[],this.$el.trigger(jQuery.Event("changeDirectory",{dir:this._systemTagIds.join("/")})),this.reload()},updateEmptyContent:function(){"/"===this.getCurrentDirectory()?(this._systemTagIds.length?this.$el.find("#emptycontent").html('<div class="icon-systemtags"></div><h2>'+t("systemtags","No files found for the selected tags")+"</h2>"):this.$el.find("#emptycontent").html('<div class="icon-systemtags"></div><h2>'+t("systemtags","Please select tags to filter by")+"</h2>"),this.$el.find("#emptycontent").toggleClass("hidden",!this.isEmpty),this.$el.find("#filestable thead th").toggleClass("hidden",this.isEmpty)):OCA.Files.FileList.prototype.updateEmptyContent.apply(this,arguments)},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},updateStorageStatistics:function(){},reload:function(){if(this._setCurrentDir("/",!1),!this._systemTagIds.length)return this.updateEmptyContent(),this.setFiles([]),$.Deferred().resolve();this._selectedFiles={},this._selectionSummary.clear(),this._currentFileModel&&this._currentFileModel.off(),this._currentFileModel=null,this.$el.find(".select-all").prop("checked",!1),this.showMask(),this._reloadCall=this.filesClient.getFilteredFiles({systemTagIds:this._systemTagIds},{properties:this._getWebdavProperties()}),this._detailsView&&this._updateDetailsView(null);var t=this.reloadCallback.bind(this);return this._reloadCall.then(t,t)},reloadCallback:function(t,e){return e&&e.unshift({}),OCA.Files.FileList.prototype.reloadCallback.call(this,t,e)}}),OCA.SystemTags.FileList=n},function(t,e){OCA.SystemTags=_.extend({},OCA.SystemTags),OCA.SystemTags||(OCA.SystemTags={}),OCA.SystemTags.FilesPlugin={ignoreLists:["trashbin","files.public"],attach:function(t){if(!(this.ignoreLists.indexOf(t.id)>=0)){var e=new OCA.SystemTags.SystemTagsInfoView;t.registerDetailView(e),_.each(t.getRegisteredDetailViews(),function(t){if(t instanceof OCA.Files.MainFileInfoDetailView){var i=new OCA.SystemTags.SystemTagsInfoViewToggleView({systemTagsInfoView:e});return i.render(),i.listenTo(t,"pre-render",function(){i.$el.detach()}),void i.listenTo(t,"post-render",function(){t.$el.find(".file-details").append(i.$el)})}})}}},OC.Plugins.register("OCA.Files.FileList",OCA.SystemTags.FilesPlugin)},function(t,e){!function(t){function e(t){var e=t.toJSON();return OC.isUserAdmin()||e.canAssign||(e.locked=!0),e}var i=t.Files.DetailFileInfoView.extend({_rendered:!1,className:"systemTagsInfoView hidden",_inputView:null,initialize:function(t){var i=this;t=t||{},this._inputView=new OC.SystemTags.SystemTagsInputField({multiple:!0,allowActions:!0,allowCreate:!0,isAdmin:OC.isUserAdmin(),initSelection:function(t,n){n(i.selectedTagsCollection.map(e))}}),this.selectedTagsCollection=new OC.SystemTags.SystemTagsMappingCollection([],{objectType:"files"}),this._inputView.collection.on("change:name",this._onTagRenamedGlobally,this),this._inputView.collection.on("remove",this._onTagDeletedGlobally,this),this._inputView.on("select",this._onSelectTag,this),this._inputView.on("deselect",this._onDeselectTag,this)},_onSelectTag:function(t){this.selectedTagsCollection.create(t.toJSON())},_onDeselectTag:function(t){this.selectedTagsCollection.get(t).destroy()},_onTagRenamedGlobally:function(t){var e=this.selectedTagsCollection.get(t.id);e&&e.set(t.toJSON())},_onTagDeletedGlobally:function(t){this.selectedTagsCollection.remove(t)},setFileInfo:function(t){var i=this;this._rendered||this.render(),t&&(this.selectedTagsCollection.setObjectId(t.id),this.selectedTagsCollection.fetch({success:function(t){t.fetched=!0;var n=t.map(e);i._inputView.setData(n),0!==n.length?i.show():i.hide()}})),this.hide()},render:function(){this.$el.append(this._inputView.$el),this._inputView.render()},isVisible:function(){return!this.$el.hasClass("hidden")},show:function(){this.$el.removeClass("hidden")},hide:function(){this.$el.addClass("hidden")},openDropdown:function(){this.$el.find(".systemTagsInputField").select2("open")},remove:function(){this._inputView.remove()}});t.SystemTags.SystemTagsInfoView=i}(OCA)},function(e,i){
/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
!function(e){var i=OC.Backbone.View.extend({tagName:"span",className:"tag-label",events:{click:"click"},_systemTagsInfoView:null,template:function(e){return'<span class="icon icon-tag"/>'+t("systemtags","Tags")},initialize:function(t){if(t=t||{},this._systemTagsInfoView=t.systemTagsInfoView,!this._systemTagsInfoView)throw'Missing required parameter "systemTagsInfoView"'},click:function(){this._systemTagsInfoView.isVisible()?this._systemTagsInfoView.hide():(this._systemTagsInfoView.show(),this._systemTagsInfoView.openDropdown())},render:function(){return this.$el.html(this.template()),this}});e.SystemTags.SystemTagsInfoViewToggleView=i}(OCA)},function(t,e,i){var n=i(7);"string"==typeof n&&(n=[[t.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};i(9)(n,s);n.locals&&(t.exports=n.locals)},function(t,e,i){(t.exports=i(8)(!1)).push([t.i,"/*\n * Copyright (c) 2016\n *\n * This file is licensed under the Affero General Public License version 3\n * or later.\n *\n * See the COPYING-README file.\n *\n */\n#app-content-systemtagsfilter .select2-container {\n  width: 30%;\n  margin-left: 10px; }\n\n#app-sidebar .mainFileInfoView .tag-label {\n  cursor: pointer;\n  padding: 13px; }\n\n#app-sidebar .mainFileInfoView .icon-tag {\n  opacity: .5;\n  vertical-align: middle; }\n",""])},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var s=(r=n,a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(l," */")),o=n.sources.map(function(t){return"/*# sourceURL=".concat(n.sourceRoot).concat(t," */")});return[i].concat(o).concat([s]).join("\n")}var r,a,l;return[i].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(i,"}"):i}).join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},s=0;s<this.length;s++){var o=this[s][0];null!=o&&(n[o]=!0)}for(var r=0;r<t.length;r++){var a=t[r];null!=a[0]&&n[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="(".concat(a[2],") and (").concat(i,")")),e.push(a))}},e}},function(t,e,i){var n,s,o={},r=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===s&&(s=n.apply(this,arguments)),s}),a=function(t){var e={};return function(t,i){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,i);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),l=null,c=0,f=[],u=i(10);function d(t,e){for(var i=0;i<t.length;i++){var n=t[i],s=o[n.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](n.parts[r]);for(;r<n.parts.length;r++)s.parts.push(v(n.parts[r],e))}else{var a=[];for(r=0;r<n.parts.length;r++)a.push(v(n.parts[r],e));o[n.id]={id:n.id,refs:1,parts:a}}}}function p(t,e){for(var i=[],n={},s=0;s<t.length;s++){var o=t[s],r=e.base?o[0]+e.base:o[0],a={css:o[1],media:o[2],sourceMap:o[3]};n[r]?n[r].parts.push(a):i.push(n[r]={id:r,parts:[a]})}return i}function h(t,e){var i=a(t.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=f[f.length-1];if("top"===t.insertAt)n?n.nextSibling?i.insertBefore(e,n.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),f.push(e);else if("bottom"===t.insertAt)i.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var s=a(t.insertAt.before,i);i.insertBefore(e,s)}}function g(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=f.indexOf(t);e>=0&&f.splice(e,1)}function m(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var n=function(){0;return i.nc}();n&&(t.attrs.nonce=n)}return y(e,t.attrs),h(t,e),e}function y(t,e){Object.keys(e).forEach(function(i){t.setAttribute(i,e[i])})}function v(t,e){var i,n,s,o;if(e.transform&&t.css){if(!(o="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=o}if(e.singleton){var r=c++;i=l||(l=m(e)),n=C.bind(null,i,r,!1),s=C.bind(null,i,r,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),h(t,e),e}(e),n=function(t,e,i){var n=i.css,s=i.sourceMap,o=void 0===e.convertToAbsoluteUrls&&s;(e.convertToAbsoluteUrls||o)&&(n=u(n));s&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var r=new Blob([n],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(r),a&&URL.revokeObjectURL(a)}.bind(null,i,e),s=function(){g(i),i.href&&URL.revokeObjectURL(i.href)}):(i=m(e),n=function(t,e){var i=e.css,n=e.media;n&&t.setAttribute("media",n);if(t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}.bind(null,i),s=function(){g(i)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else s()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=r()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var i=p(t,e);return d(i,e),function(t){for(var n=[],s=0;s<i.length;s++){var r=i[s];(a=o[r.id]).refs--,n.push(a)}t&&d(p(t,e),e);for(s=0;s<n.length;s++){var a;if(0===(a=n[s]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete o[a.id]}}}};var T,_=(T=[],function(t,e){return T[t]=e,T.filter(Boolean).join("\n")});function C(t,e,i,n){var s=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=_(e,s);else{var o=document.createTextNode(s),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var i=e.protocol+"//"+e.host,n=i+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var s,o=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?t:(s=0===o.indexOf("//")?o:0===o.indexOf("/")?i+o:n+o.replace(/^\.\//,""),"url("+JSON.stringify(s)+")")})}}]);
//# sourceMappingURL=systemtags.js.map