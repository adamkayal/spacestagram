(this.webpackJsonpspacestagram=this.webpackJsonpspacestagram||[]).push([[0],{118:function(e,t,a){},146:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(12),o=a.n(s),i=(a(93),a(80)),r=a(16),l=(a(94),a(79)),p=a(58),u=a.n(p),d=(a(95),a(4));var j=function(e){var t=e.idx,a=e.copyright,c=void 0===a?"NASA":a,s=e.date,o=e.explanation,i=e.hdurl,p=e.thumbnail_url,j=e.url,b=e.title,m=e.user,O=e.setOpenLogIn,g=e.setOpenShare,h=e.setPostUrl,_=new Date(s).toDateString(),f=Object(n.useState)(!1),x=Object(r.a)(f,2),v=x[0],C=x[1],y=Object(n.useState)(""),N=Object(r.a)(y,2),S=N[0],k=N[1],I=Object(n.useState)([]),w=Object(r.a)(I,2),L=w[0],P=w[1],D=function(){m?(v?C(!1):v||C(!0),u()("#overlay_".concat(t)).fadeIn(400,(function(){u()("#overlay_".concat(t)).fadeOut(400)}))):O(!0)};return Object(d.jsxs)("div",{className:"post",children:[Object(d.jsx)("p",{className:"post__title",children:b}),Object(d.jsxs)("div",{className:"post__imageContainer",children:[Object(d.jsx)("img",{className:"post__image",src:p||i||j||"/no_image_available.jpg",alt:b,title:b,onDoubleClick:D}),Object(d.jsx)("img",{id:"overlay_".concat(t),className:"post__imageOverlay",src:"/heart_icon.png",alt:""})]}),Object(d.jsxs)("div",{className:"post__tools",children:[Object(d.jsx)("img",{className:"post__icon",src:v&&m?"/heart_icon_liked.png":"/heart_icon_unliked.png",alt:"Like",title:"Like",onClick:D}),Object(d.jsx)("img",{className:"post__icon",src:"/comment_icon.png",alt:"Comment",title:"Comment",onClick:function(){m?document.getElementById("input_".concat(t)).focus():O(!0)}}),Object(d.jsx)("img",{className:"post__icon",src:"/share_icon.png",alt:"Share",title:"Share",onClick:function(){g(!0),h(p||i||j)}})]}),Object(d.jsxs)("p",{className:"post__text",children:[Object(d.jsx)("strong",{children:c}),": ",o]}),Object(d.jsx)("p",{className:"post__date",children:_}),Object(d.jsx)("div",{children:L.map((function(e,t){return Object(d.jsxs)("p",{className:"post__comment",children:[Object(d.jsx)("strong",{children:e.email})," ",e.text]},"comment_".concat(t))}))}),Object(d.jsxs)("form",{className:"post__commentBox",children:[Object(d.jsx)("input",{id:"input_".concat(t),className:"post__input",type:"text",placeholder:"Add a comment...",value:S,onChange:function(e){return k(e.target.value)}}),Object(d.jsx)("button",{className:"post__button",disabled:!S,type:"submit",onClick:function(e){e.preventDefault(),m?(P([].concat(Object(l.a)(L),[{email:m.displayName,text:S}])),k("")):O(!0)},children:"Post"})]})]})},b=a(8);a(97),a(98),a(99);b.b.initializeApp({apiKey:"AIzaSyBZk_jO9tqniRpB6AbPb5lhYeisY6-Nb74",authDomain:"adamkayal-spacestagram.firebaseapp.com",projectId:"adamkayal-spacestagram",storageBucket:"adamkayal-spacestagram.appspot.com",messagingSenderId:"859658276215",appId:"1:859658276215:web:6276119e314a7d61582572",measurementId:"G-DTJGBGWV2K"});b.b.firestore();var m=b.b.auth(),O=(b.b.storage(),a(70)),g=a.n(O),h=a(185),_=a(182),f=a(181),x=a(183),v=a(178);a(118);function C(){return{top:"".concat(50,"%"),left:"".concat(50,"%"),transform:"translate(-".concat(50,"%, -").concat(50,"%)")}}var y=function(e){var t=e.open,a=e.setOpen,c=e.onClick,s=e.buttonText,o=e.postUrl,i=e.setOpenSignUp,l=Object(n.useState)(C),p=Object(r.a)(l,1)[0],u=Object(n.useState)(""),j=Object(r.a)(u,2),b=j[0],m=j[1],O=Object(n.useState)(""),g=Object(r.a)(O,2),h=g[0],f=g[1];return Object(d.jsx)(x.a,{open:t,onClose:function(){return a(!1)},"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",children:Object(d.jsxs)("div",{style:p,className:"modalContainer__paper",children:["Log In"===s&&Object(d.jsx)("div",{className:"modalContainer__message",children:"Log in to like and comment on posts"}),Object(d.jsxs)("div",{className:"app__signup",children:[Object(d.jsx)("center",{children:Object(d.jsx)("img",{className:"app__headerImage",src:"/logo.png",alt:"spacetagram logo"})}),"Copy to clipboard"===s?Object(d.jsx)(v.a,{type:"text",value:o,disabled:!0}):Object(d.jsxs)("div",{className:"app__signup",children:[Object(d.jsx)(v.a,{type:"email",placeholder:"email",value:b,onChange:function(e){return m(e.target.value)},autoFocus:!0}),Object(d.jsx)(v.a,{type:"password",placeholder:"password",value:h,onChange:function(e){return f(e.target.value)}})]}),Object(d.jsx)(_.a,{className:"modalContainer__button",type:"Copy to clipboard"!==s?"submit":null,onClick:function(e){return c(e,b,h)},children:s}),"Log In"===s&&Object(d.jsxs)("div",{className:"modalContainer__signUpOfferText",children:["Don't have an account?",Object(d.jsx)("button",{className:"modalContainer__buttonLink",onClick:function(){a(!1),i(!0)},children:"Sign up"})]})]})]})})},N=a(76),S=a.n(N),k=a(78),I=a.n(k),w=a(9);var L=function(){var e=Object(n.useState)([]),t=Object(r.a)(e,2),a=t[0],c=t[1],s=Object(n.useState)(!1),o=Object(r.a)(s,2),l=o[0],p=o[1],u=Object(n.useState)(!1),b=Object(r.a)(u,2),O=b[0],x=b[1],v=Object(n.useState)(!1),C=Object(r.a)(v,2),N=C[0],k=C[1],L=Object(n.useState)(""),P=Object(r.a)(L,2),D=P[0],T=P[1],A=Object(n.useState)(null),B=Object(r.a)(A,2),U=B[0],F=B[1],E=Object(n.useState)(!1),W=Object(r.a)(E,2),z=W[0],G=W[1],J=Object(n.useState)(""),K=Object(r.a)(J,2),Y=K[0],q=K[1],M=Object(n.useState)(""),R=Object(r.a)(M,2),V=R[0],Z=R[1];Object(n.useEffect)((function(){var e=m.onAuthStateChanged((function(e){F(e||null)}));return function(){e()}}),[U]),Object(n.useEffect)((function(){return Q()}),[]);var Q=function(e){e&&e.preventDefault();var t="count=20";Y&&(t="start_date=".concat(Y),V&&(t=t.concat("&end_date=".concat(V)))),G(!0),g.a.get("https://api.nasa.gov/planetary/apod?api_key=ESNnOstvfNx2gncbFYQtbjIZDCaLKqbg5PM0Xo83&thumbs=True&".concat(t)).then((function(e){G(!1),c(e.data),console.log(e.data)})).catch((function(e){return console.error("There was an error!",e)}))},X=function(){return(new Date).toISOString().slice(0,10)},H=Object(w.a)((function(e){return{tooltip:{backgroundColor:"#f5f5f9",color:"rgba(0, 0, 0, 0.87)",maxWidth:220,fontSize:e.typography.pxToRem(16),border:"1px solid #dadde9",textAlign:"justify"}}}))(h.a);return Object(d.jsxs)("div",{className:"app",children:[Object(d.jsx)(y,{open:l,setOpen:p,onClick:function(e,t,a){e.preventDefault(),m.createUserWithEmailAndPassword(t,a).then((function(){return p(!1)})).catch((function(e){return alert(e.message)}))},buttonText:"Sign Up"}),Object(d.jsx)(y,{open:O,setOpen:x,onClick:function(e,t,a){e.preventDefault(),console.log({event:e},{email:t},{password:a}),m.signInWithEmailAndPassword(t,a).then((function(e){e.user.updateProfile({displayName:t}),x(!1)})).catch((function(e){return alert(e.message)}))},buttonText:"Log In",setOpenSignUp:p}),Object(d.jsx)(y,{open:N,setOpen:k,onClick:function(){return navigator.clipboard.writeText(D)},buttonText:"Copy to clipboard",postUrl:D}),Object(d.jsxs)("div",{className:"app__header",children:[Object(d.jsx)("img",{className:"app__headerImage",src:"/logo.png",alt:"spacetagram logo"}),U?Object(d.jsx)("div",{children:Object(d.jsx)(_.a,{onClick:function(){return m.signOut()},children:"Logout"})}):Object(d.jsxs)("div",{className:"app__authButtons",children:[Object(d.jsx)(_.a,{onClick:function(){return x(!0)},children:"Log In"}),Object(d.jsx)(_.a,{onClick:function(){return p(!0)},children:"Sign Up"})]})]}),Object(d.jsxs)("form",{className:"app__search",noValidate:!0,children:[Object(d.jsxs)("div",{className:"app__dateTitle",children:[Object(d.jsx)(H,{title:"If no dates are selected, 20 random posts will be shown. If only a start date is selected, the end date will by default be today's date.",children:Object(d.jsx)(I.a,{className:"app__infoIcon","aria-label":"info"})}),Object(d.jsx)("p",{children:Object(d.jsx)("strong",{children:"Select dates for search (optional):"})})]}),Object(d.jsx)(f.a,{id:"start-date",label:"Start date",type:"date",InputLabelProps:{shrink:!0},InputProps:{inputProps:{max:X()}},value:Y,onChange:function(e){return q(e.target.value)}}),Object(d.jsx)(f.a,{id:"end-date",label:"End date",type:"date",InputLabelProps:{shrink:!0},InputProps:{inputProps:{min:Y,max:X()}},value:V,onChange:function(e){return Z(e.target.value)},disabled:!Y}),Object(d.jsx)(_.a,{type:"submit",onClick:function(e){return Q(e)},children:"Search"})]}),Object(d.jsxs)("div",{className:"app__posts",children:[Object(d.jsx)(S.a,{type:"Circles",color:"#00BFFF",height:200,width:200,visible:z,className:"app__loader"}),!z&&a.map((function(e,t){return Object(d.jsx)(j,Object(i.a)({idx:t,user:U,setOpenLogIn:x,setOpenShare:k,setPostUrl:T},e),t)}))]})]})},P=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,186)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),s(e),o(e)}))};o.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(L,{})}),document.getElementById("root")),P()},93:function(e,t,a){},94:function(e,t,a){},95:function(e,t,a){}},[[146,1,2]]]);
//# sourceMappingURL=main.3284177f.chunk.js.map