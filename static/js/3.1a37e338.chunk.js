(this["webpackJsonpsocial-network"]=this["webpackJsonpsocial-network"]||[]).push([[3],{284:function(e,t,a){e.exports={Profile:"Profile_Profile__ClbKO",ProfileInfo:"Profile_ProfileInfo__by2da",ProfileImage:"Profile_ProfileImage__18RSG",ProfileContacts:"Profile_ProfileContacts__3oDKN"}},285:function(e,t,a){e.exports={ProfileStatus:"ProfileStatus_ProfileStatus__3AGgT"}},286:function(e,t,a){"use strict";a.r(t);var l=a(24),n=a(25),r=a(27),i=a(26),s=a(28),o=a(0),u=a.n(o),c=a(284),f=a.n(c),m=a(12),p=a(9),h=a(7),E=a(47),b=a(124),d=a(285),g=a.n(d),P=function(e){var t=Object(o.useState)(!1),a=Object(b.a)(t,2),l=a[0],n=a[1],r=Object(o.useState)(e.status),i=Object(b.a)(r,2),s=i[0],c=i[1];Object(o.useEffect)((function(){c(e.status)}),[e.status]);return u.a.createElement("div",{className:g.a.ProfileStatus},!l&&u.a.createElement("div",null,u.a.createElement("span",{onDoubleClick:function(){n(!0)}},e.status||"\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u0442\u0430\u0442\u0443\u0441")),l&&u.a.createElement("div",null,u.a.createElement("input",{onBlur:function(){n(!1),e.updateStatus(s)},onChange:function(e){c(e.currentTarget.value)},type:"text",autoFocus:!0,value:s})))},k=a(121),v=function(e){function t(){return Object(l.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params.userId;this.props.getProfileThunk(e),this.props.getStatusThunk(e)}},{key:"render",value:function(){if(!this.props.isLoading)return u.a.createElement(E.a,null);var e=this.props.profileInfo,t=e.contacts,a=e.photos,l=e.fullName;return u.a.createElement("div",{className:f.a.Profile},u.a.createElement("div",{className:f.a.ProfileInfo},u.a.createElement("div",{className:f.a.ProfileImage},u.a.createElement("img",{src:a.large?a.large:"https://specenergo.ru/sites/default/files/styles/mt_testimonial_image/public/2016-11/testimonial-4.jpg?itok=a7UblV6p",alt:"avatar"})),u.a.createElement("div",{className:f.a.ProfileDescr},u.a.createElement("h1",null,l),u.a.createElement(P,{status:this.props.status,updateStatus:this.props.updateStatusThunk}))),u.a.createElement("div",{className:f.a.ProfileContacts},u.a.createElement("ul",null,u.a.createElement("li",null,u.a.createElement("a",{href:t.vk},"VK")),u.a.createElement("li",null,u.a.createElement("a",{href:t.facebook},"FB")),u.a.createElement("li",null,u.a.createElement("a",{href:t.github},"Github")),u.a.createElement("li",null,u.a.createElement("a",{href:t.website},"website")),u.a.createElement("li",null,u.a.createElement("a",{href:t.instagram},"instagram")),u.a.createElement("li",null,u.a.createElement("a",{href:t.youtube},"youtube")),u.a.createElement("li",null,u.a.createElement("a",{href:t.twitter},"twitter")),u.a.createElement("li",null,u.a.createElement("a",{href:t.mainLink},"mainLink")))))}}]),t}(o.Component);t.default=Object(h.d)(Object(p.b)((function(e){return{profileInfo:e.profileReducer.profileInfo,isLoading:e.profileReducer.isLoading,status:e.profileReducer.status}}),{getProfileThunk:k.b,getStatusThunk:k.c,updateStatusThunk:k.d}),m.g)(v)}}]);
//# sourceMappingURL=3.1a37e338.chunk.js.map