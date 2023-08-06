(()=>{"use strict";var e=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))};function t(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r),document.removeEventListener("click",o)}function n(e){e.classList.add("popup_opened"),document.addEventListener("keydown",r),document.addEventListener("click",o)}function r(e){"Escape"===e.key&&t(document.querySelector(".popup_opened"))}function o(e){e.target.classList.contains("popup_opened")&&t(document.querySelector(".popup_opened"))}var c={baseUrl:"https://nomoreparties.co/v1/plus-cohort-27",headers:{authorization:"f064128c-9ee2-488b-af8c-42d65f638aa9","Content-Type":"application/json"}};function a(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var u,i=function(e){var t="".concat(c.baseUrl,"/users/").concat(e);return fetch(t,{headers:c.headers}).then((function(e){return a(e)}))},l=function(e){var t="".concat(c.baseUrl,"/cards/").concat(e);return fetch(t,{method:"DELETE",headers:c.headers}).then((function(e){return a(e)}))},s=function(e,t){var n="".concat(c.baseUrl,"/cards/likes/").concat(e);return fetch(n,{method:t,headers:c.headers}).then((function(e){return a(e)}))},d=function(e,t,n){t.innerText=e?"Сохранение...":n},f=document.querySelector(".cards__list"),p=document.querySelector(".popup_add-card"),m=document.querySelector(".popup_confirm-delete"),v=document.querySelector("#card").content,y=p.querySelector('input[name="place-name"]'),_=p.querySelector('input[name="place-link"]'),h=p.querySelector(".popup__button-save"),S=h.textContent;function b(e,r,o){f.prepend(function(e,r,o){var c=r.querySelector(".card").cloneNode(!0),a=c.querySelector("h2"),i=c.querySelector(".card__image"),d=c.querySelector(".card__button-like"),f=c.querySelector(".card__like-counter"),p=c.querySelector(".card__button-bin");return a.textContent=e.name,i.src=e.link,f.textContent=e.likesCount,(o===e.cardOwnerId||void 0===e.cardOwnerId)&&(p.style.display="block"),function(e,t){return!!t&&t.some((function(t){return t._id===e}))}(o,e.likes)&&d.classList.add("card__button-like_active"),d.addEventListener("click",(function(t){!function(e,t){var n;n=e.target.classList.contains("card__button-like_active")?"DELETE":"PUT",s(t,n).then((function(t){e.target.nextElementSibling.textContent=t.likes.length,e.target.classList.toggle("card__button-like_active")})).catch((function(e){console.log(e)}))}(t,e.cardId)})),p.addEventListener("click",(function(r){n(m),u=function(){l(e.cardId).then((function(){c.remove(),t(m)})).catch((function(e){console.log(e)}))}})),i.addEventListener("click",(function(){var e,t,r,o;e=i.src,t=a,r=document.querySelector(".popup_view-image"),(o=document.querySelector(".popup__container_fullscreen")).querySelector(".figure__image").src=e,o.querySelector("figcaption").textContent=t.textContent,n(r)})),c}(e,r,o))}function q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g,k,C,E,L=Array.from(document.querySelectorAll(".popup")),x=document.querySelector(".popup_edit-profile"),O=document.querySelector(".popup_add-card"),w=document.querySelector(".popup_edit-avatar"),A=document.querySelector('form[name="new-card-form"]'),j=document.querySelector(".profile__button-add"),I=document.querySelector('form[name="confirm-delete-form"]'),U=document.querySelector(".profile__button-edit"),T=document.querySelector('form[name="edit-profile-form"]'),P=T.querySelector(".popup__button-save"),D=P.textContent,B=document.querySelector(".profile__avatar-overlay"),M=document.querySelector('.form[name="edit-avatar-form"]'),N=M.querySelector(".popup__button-save"),J=N.textContent,H=w.querySelector('input[name="avatar-link"]'),V=x.querySelector('input[name="user-name"]'),z=x.querySelector('input[name="user-description"]'),$=document.querySelector("h1.profile__name"),F=document.querySelector("p.profile__description"),G=document.querySelector(".profile__avatar");function K(e){i(e).then((function(e){Q(e)})).catch((function(e){console.log(e)}))}function Q(e){$.textContent=e.name,F.textContent=e.about,G.src=e.avatar}k=(g={formSelector:".form",inputSelector:".form__input-text",submitButtonSelector:".popup__button-save",inactiveButtonClass:"popup__button-save_disabled",inputErrorClass:"form__input-text_error",errorClass:"form__input-error_active"}).formSelector,C=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(g,["formSelector"]),Array.from(document.querySelectorAll(k)).forEach((function(t){!function(t,n){var r=Array.from(t.querySelectorAll(n.inputSelector)),o=t.querySelector(n.submitButtonSelector);e(r,o,n.inactiveButtonClass),r.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(t,c,n),e(r,o,n.inactiveButtonClass)}))}))}(t,C)})),Promise.all([i("me"),(E="".concat(c.baseUrl,"/cards"),fetch(E,{headers:c.headers}).then((function(e){return a(e)})))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];Q(o),function(e,t){!function(e,t){for(var n=e.length-1;n>=0;n--)b({name:e[n].name,link:e[n].link,cardId:e[n]._id,likesCount:e[n].likes.length,likes:e[n].likes,cardOwnerId:e[n].owner._id},v,t)}(t,e)}(o._id,c)})).catch((function(e){console.log(e)})),U.addEventListener("click",(function(){V.value=$.textContent,z.value=F.textContent,n(x)})),T.addEventListener("submit",(function(e){e.preventDefault(),d(!0,P),function(e,t){var n="".concat(c.baseUrl,"/users/me");return fetch(n,{method:"PATCH",headers:c.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return a(e)}))}(V.value,z.value).then((function(){K("me")})).then((function(){d(!1,P,D),t(x)})).catch((function(e){console.log(e)}))})),B.addEventListener("click",(function(){n(w)})),M.addEventListener("submit",(function(n){var r,o;n.preventDefault(),d(!0,N),(r=H.value,o="".concat(c.baseUrl,"/users/me/avatar"),fetch(o,{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:r})}).then((function(e){return a(e)}))).then((function(){K("me")})).then((function(){d(!1,N,J),M.reset(),e([H],N,"popup__button-save_disabled"),t(w)})).catch((function(e){console.log(e)}))})),j.addEventListener("click",(function(){!function(e){n(e)}(O)})),A.addEventListener("submit",(function(n){n.preventDefault(),function(n,r){var o,u,i,l={name:y.value,link:_.value};d(!0,h),(o=l.name,u=l.link,i="".concat(c.baseUrl,"/cards"),fetch(i,{method:"POST",headers:c.headers,body:JSON.stringify({name:o,link:u})}).then((function(e){return a(e)}))).then((function(o){l.cardId=o._id,l.cardOwnerId=o.owner._id,l.likesCount=o.likes.length;var c=o.owner._id;b(l,v,c),d(!1,h,S),n.target.reset(),e([y,_],h,"popup__button-save_disabled"),t(r)})).catch((function(e){console.log(e)}))}(n,O)})),I.addEventListener("submit",(function(e){e.preventDefault(),u()})),L.forEach((function(e){!function(e){e.querySelector(".popup__button-close").addEventListener("click",(function(){t(e)}))}(e)}))})();