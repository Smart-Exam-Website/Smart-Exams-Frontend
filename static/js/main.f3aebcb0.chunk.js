(this.webpackJsonpundefined=this.webpackJsonpundefined||[]).push([[0],{36:function(e,t,s){},37:function(e,t,s){},38:function(e,t,s){},40:function(e,t,s){},51:function(e,t,s){},52:function(e,t,s){},53:function(e,t,s){},54:function(e,t,s){},55:function(e,t,s){},57:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s(17),c=s.n(a),r=(s(36),s(9)),l=s(4),i=(s(37),s(38),s.p+"static/media/logo.18795106.png"),o=s(59),d=s(60),m=s(61),j=s(0),u={fontSize:36,color:"#313131",margin:"0px 12px",cursor:"pointer"},h=window.innerWidth<992,b=function(){return Object(j.jsxs)("footer",{className:"Footer container ",children:[Object(j.jsxs)("div",{className:"row justify-content-lg-center pl-3 p-lg-0",children:[Object(j.jsxs)("div",{className:"col-lg-4 col-12 text-lg-center",children:[Object(j.jsx)("img",{height:66,src:i,alt:"smart exam logo"}),Object(j.jsx)("h5",{className:"text-grey my-3",children:"Test your student smartly."}),!h&&Object(j.jsxs)("div",{className:"d-flex flex-row justify-content-center",children:[Object(j.jsx)(o.a,{style:u}),Object(j.jsx)(d.a,{style:u}),Object(j.jsx)(m.a,{style:u})]})]}),Object(j.jsxs)("div",{className:"col-lg-4 col-12 text-lg-center",children:[Object(j.jsx)("h4",{children:"Menu"}),Object(j.jsxs)("ul",{className:"d-flex d-lg-block flex-row",children:[Object(j.jsx)("li",{className:"mx-2",children:"Home"}),Object(j.jsx)("li",{className:"mx-2",children:"Tours"}),Object(j.jsx)("li",{className:"mx-2",children:"Category"}),Object(j.jsx)("li",{className:"mx-2",children:"About Us"})]})]}),Object(j.jsxs)("div",{className:"col-lg-4 col-12 text-lg-center",children:[Object(j.jsx)("h4",{children:"Support"}),Object(j.jsxs)("ul",{className:"d-flex d-lg-block flex-row",children:[Object(j.jsx)("li",{className:"mx-2",children:"FAQ"}),Object(j.jsx)("li",{className:"mx-2",children:"Terms & Conditions"}),Object(j.jsx)("li",{className:"mx-2",children:"Privacy Policy"})]})]})]}),Object(j.jsxs)("div",{className:"text-center",children:[h&&Object(j.jsxs)("div",{className:"d-flex flex-row justify-content-center",children:[Object(j.jsx)(o.a,{style:u}),Object(j.jsx)(d.a,{style:u}),Object(j.jsx)(m.a,{style:u})]}),Object(j.jsxs)("small",{className:"text-grey",children:[(new Date).getFullYear()," (c) \u2014 SmartExam. All Rights Reserved"]})]})]})},x=(s(40),s(62)),p=s(63),f=s(18),O=function(){var e=Object(f.b)((function(e){return e.auth.userToken}));return Object(j.jsx)("div",{className:"Navbar",children:Object(j.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:[Object(j.jsx)(r.b,{className:"navbar-brand",to:"/",children:Object(j.jsx)("img",{height:66,src:i,alt:"smart exam logo"})}),Object(j.jsx)("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(j.jsx)("span",{className:"navbar-toggler-icon"})}),Object(j.jsxs)("div",{className:"collapse navbar-collapse",id:"navbarNav",children:[Object(j.jsxs)("ul",{className:"navbar-nav mx-auto mainNav",children:[Object(j.jsx)(r.c,{className:"nav-link p-0",activeclassname:"active",to:"/",exact:!0,children:Object(j.jsx)("li",{className:"nav-item px-5 mx-2",children:Object(j.jsx)("span",{children:"Home "})})}),Object(j.jsx)("li",{className:"nav-item px-5 mx-2",children:Object(j.jsx)(r.c,{className:"nav-link",activeclassname:"active",to:"/",exact:!0,children:"Features"})}),Object(j.jsx)("li",{className:"nav-item px-5 mx-2",children:Object(j.jsx)(r.c,{className:"nav-link",activeclassname:"active",to:"/",exact:!0,children:"Pricing"})})]}),Object(j.jsx)("ul",{className:"navbar-nav d-flex justify-content-lg-center justify-content-between flex-row",children:e?Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("li",{className:"nav-item mx-2",children:Object(j.jsx)(x.a,{className:"primaryColoredIcon"})}),Object(j.jsx)("li",{className:"nav-item mx-2",children:Object(j.jsx)(p.a,{className:"primaryColoredIcon"})})]}):Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("li",{className:"nav-item mx-2 d-flex align-items-center",children:Object(j.jsx)(r.b,{className:"loginText",to:"/login",children:"Login"})}),Object(j.jsx)("li",{className:"nav-item mx-2",children:Object(j.jsx)(r.b,{className:"btn btn-primary",to:"/register",children:"Register"})})]})})]})]})})},g=s(7),v=s(8),N=s(12),y=s(11),w="http://3.143.249.185/api",P={login:{url:"".concat(w,"/auth/login/"),method:"POST"},verifyEmail:{url:"".concat(w,"/auth/verifyEmail"),method:"POST"},changePassword:{url:"".concat(w,"/auth/changePassword"),method:"PUT"},logout:{url:"".concat(w,"/auth/logout"),method:"POST"},ResetPassword:{url:"".concat(w,"/auth/forgotPassword"),method:"PUT"}},H=s(24),S=s.n(H),C=s(2),F=s(28),E=function(){function e(){Object(g.a)(this,e),this.jwt=""}return Object(v.a)(e,null,[{key:"fetch",value:function(e){function t(t,s,n){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var t=Object(F.a)(S.a.mark((function t(s,n,a){var c,r;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.jwt=localStorage.getItem("token"),t.next=3,fetch(s,Object(C.a)(Object(C.a)({mode:"cors"},n),{},{headers:e.getHeaders(n.headers,a)}));case 3:return c=t.sent,r=c.ok?204===c.status?Promise.resolve({}):c.json():e.handleErrorsBasedOnStatus(c),t.abrupt("return",r);case 6:case"end":return t.stop()}}),t,this)})));return function(e,s,n){return t.apply(this,arguments)}}())},{key:"getHeaders",value:function(e,t){var s={Accept:"application/json","Content-Type":"application/json"};return t&&(s.Authorization="Token ".concat(this.jwt)),s=Object(C.a)(Object(C.a)({},s),e)}},{key:"handleErrorsBasedOnStatus",value:function(e){return e.status,e.json().then((function(e){return Promise.reject(e)})).catch((function(e){return Promise.reject(e)}))}}]),e}(),k=function(){function e(){Object(g.a)(this,e)}return Object(v.a)(e,null,[{key:"login",value:function(e){return E.fetch(P.login.url,{body:JSON.stringify(e),method:P.login.method})}},{key:"emailVerifySms",value:function(e){return E.fetch(P.verifyEmail.url,{body:JSON.stringify(e),method:P.verifyEmail.method})}},{key:"changePassword",value:function(e){return E.fetch(P.changePassword.url,{body:JSON.stringify(e),method:P.changePassword.method},!0)}},{key:"logout",value:function(){return E.fetch(P.logout.url,{method:P.logout.method},!0)}},{key:"resetForgottenPassword",value:function(e){return E.fetch(P.ResetPassword.url,{body:JSON.stringify(e),method:P.ResetPassword.method})}}]),e}(),T=function(e){Object(N.a)(s,e);var t=Object(y.a)(s);function s(){var e;Object(g.a)(this,s);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={email:null,password:null},e.forgotPasswordHandler=function(){},e.SignUpHandler=function(){e.props.history.push("/signup")},e.emailFormHandler=function(t){e.setState({email:t.target.value})},e.PasswordFormHandler=function(t){e.setState({password:t.target.value})},e.LoginHandler=function(t){t.preventDefault();var s=e.state.email,n=e.state.password;console.log(s),console.log(n),k.login({email:s,password:n}).then((function(t){console.log(t),e.props.history.push("/profile/student")})).catch((function(t){console.log(t),e.props.history.push("/profile/student")}))},e}return Object(v.a)(s,[{key:"render",value:function(){return console.log("lol"),Object(j.jsxs)("div",{className:"card m-5 ",children:[Object(j.jsx)("div",{className:"card-header",children:"Login to Smart Exam"}),Object(j.jsx)("div",{className:"card-body",children:Object(j.jsxs)("form",{className:" m-3",children:[Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{children:"Email address"}),Object(j.jsx)("input",{type:"email",className:"form-control",id:"exampleInputEmail1","aria-describedby":"emailHelp",onChange:this.emailFormHandler,placeholder:"Enter email"}),Object(j.jsx)("small",{id:"emailHelp",className:"form-text text-muted",children:"We'll never share your email with anyone else."})]}),Object(j.jsxs)("div",{className:"form-group",children:[Object(j.jsx)("label",{children:"Password"}),Object(j.jsx)("input",{type:"password",className:"form-control",id:"exampleInputPassword1",onChange:this.PasswordFormHandler,placeholder:"Password"})]}),Object(j.jsx)("hr",{}),Object(j.jsxs)("div",{className:"mx-auto",style:{width:200},children:[Object(j.jsx)("button",{type:"submit",className:"btn btn-primary mx-auto",onClick:this.LoginHandler,style:{width:200},children:"Login"}),Object(j.jsxs)("div",{className:"text-center",children:[Object(j.jsx)("button",{type:"button",className:"btn btn-link",children:"Forgot password?"}),Object(j.jsx)("button",{type:"button",className:"btn btn-link ",children:"Sign up"})]})]})]})})]})}}]),s}(n.Component),A=T,I=function(e){Object(N.a)(s,e);var t=Object(y.a)(s);function s(){var e;Object(g.a)(this,s);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).RegisterAsStudentHandler=function(){e.props.history.push("/register-student")},e.RegisterAsInstructorHandler=function(){e.props.history.push("/register-instructor")},e}return Object(v.a)(s,[{key:"render",value:function(){return Object(j.jsx)("div",{className:"d-flex justify-content-center",children:Object(j.jsxs)("div",{className:"card border-success mb-3",style:{MaxWidth:18},children:[Object(j.jsx)("div",{className:"card-header",children:"Sign up"}),Object(j.jsxs)("div",{className:"card-body text-success",children:[Object(j.jsx)("h5",{className:"card-title text-center",children:"Register As...?"}),Object(j.jsxs)("div",{className:"form-inline",children:[Object(j.jsx)("button",{type:"button",onClick:this.RegisterAsStudentHandler,className:"btn btn-primary m-3",children:"Student"}),Object(j.jsx)("button",{type:"button",onClick:this.RegisterAsInstructorHandler,className:"btn btn-danger m-3",children:"Instructor"})]})]})]})})}}]),s}(n.Component),R=Object(l.f)(I),D=function(e){Object(N.a)(s,e);var t=Object(y.a)(s);function s(){var e;Object(g.a)(this,s);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={name:null,email:null,phone:null,department:null,degree:null,school:null,password:null,confirmPassword:null},e.nameFormHandler=function(t){e.setState({name:t.target.value})},e.emailFormHandler=function(t){e.setState({email:t.target.value})},e.phoneFormHandler=function(t){e.setState({phone:t.target.value})},e.departmentFormHandler=function(t){e.setState({department:t.target.value})},e.degreeFormHandler=function(t){e.setState({degree:t.target.value})},e.schoolFormHandler=function(t){e.setState({school:t.target.value})},e.passwordFormHandler=function(t){e.setState({password:t.target.value})},e.confirmPasswordFormHandler=function(t){e.setState({confirmPassword:t.target.value})},e.registerHandler=function(t){t.preventDefault(),console.log(e.state),e.props.history.push("/verifyEmail")},e}return Object(v.a)(s,[{key:"render",value:function(){return Object(j.jsxs)("div",{className:"card m-5",children:[Object(j.jsx)("div",{className:"card-header",children:"Sign up in Smart Exam"}),Object(j.jsxs)("form",{className:"m-3",children:[Object(j.jsxs)("div",{className:"row m-1",children:[Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{children:"Name"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.nameFormHandler,id:"inputEmail4",placeholder:"Full Name"})]}),Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputEmail4",children:"Email"}),Object(j.jsx)("input",{type:"email",className:"form-control",onChange:this.emailFormHandler,id:"inputEmail4",placeholder:"Email"})]})]}),Object(j.jsx)("div",{className:"row m-1",children:Object(j.jsxs)("div",{className:"form-group  col",children:[Object(j.jsx)("label",{for:"inputAddress",children:"Phone Number"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.phoneFormHandler,placeholder:"Enter Your Phone"})]})}),Object(j.jsx)("div",{className:"row m-1",children:Object(j.jsxs)("div",{className:"form-group  col",children:[Object(j.jsx)("label",{children:"Department"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.departmentFormHandler,placeholder:"Enter Your Department"})]})}),Object(j.jsxs)("div",{className:"row m-1",children:[Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{children:"School / University"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.schoolFormHandler,placeholder:"School / University"})]}),Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputEmail4",children:"Degree"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.degreeFormHandler,placeholder:"Degree"})]})]}),Object(j.jsxs)("div",{className:"row m-1",children:[Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputPassword4",children:"Password"}),Object(j.jsx)("input",{type:"password",className:"form-control",onChange:this.passwordFormHandler,id:"inputPassword4",placeholder:"Password"})]}),Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputConfirmPassword4",children:"Confirm Password"}),Object(j.jsx)("input",{type:"password",className:"form-control",onChange:this.confirmPasswordFormHandler,id:"inputConfirmPassword4",placeholder:"Confirm Password"})]})]}),Object(j.jsx)("hr",{}),Object(j.jsx)("div",{className:"mx-auto",style:{width:200},children:Object(j.jsx)("button",{type:"submit",className:"btn btn-primary mx-auto",onClick:this.registerHandler,style:{width:200},children:"Register"})})]})]})}}]),s}(n.Component),U=D,L=function(e){Object(N.a)(s,e);var t=Object(y.a)(s);function s(){var e;Object(g.a)(this,s);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={name:null,email:null,phone:null,department:null,studentcode:null,school:null,password:null,confirmPassword:null},e.nameFormHandler=function(t){e.setState({name:t.target.value})},e.emailFormHandler=function(t){e.setState({email:t.target.value})},e.phoneFormHandler=function(t){e.setState({phone:t.target.value})},e.departmentFormHandler=function(t){e.setState({department:t.target.value})},e.studentCodeFormHandler=function(t){e.setState({studentcode:t.target.value})},e.schoolFormHandler=function(t){e.setState({school:t.target.value})},e.passwordFormHandler=function(t){e.setState({password:t.target.value})},e.confirmPasswordFormHandler=function(t){e.setState({confirmPassword:t.target.value})},e.registerHandler=function(t){t.preventDefault(),console.log(e.state),e.props.history.push("/verifyEmail")},e}return Object(v.a)(s,[{key:"render",value:function(){return Object(j.jsxs)("div",{className:"card m-5",children:[Object(j.jsx)("div",{className:"card-header",children:"Sign up in Smart Exam"}),Object(j.jsxs)("form",{className:"m-3",children:[Object(j.jsxs)("div",{className:"row m-1",children:[Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{children:"Name"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.nameFormHandler,id:"inputEmail4",placeholder:"Full Name"})]}),Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputEmail4",children:"Email"}),Object(j.jsx)("input",{type:"email",className:"form-control",onChange:this.emailFormHandler,id:"inputEmail4",placeholder:"Email"})]})]}),Object(j.jsx)("div",{className:"row m-1",children:Object(j.jsxs)("div",{className:"form-group  col",children:[Object(j.jsx)("label",{for:"inputAddress",children:"Phone Number"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.phoneFormHandler,placeholder:"Enter Your Phone"})]})}),Object(j.jsx)("div",{className:"row m-1",children:Object(j.jsxs)("div",{className:"form-group  col",children:[Object(j.jsx)("label",{children:"Department"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.departmentFormHandler,placeholder:"Enter Your Department"})]})}),Object(j.jsxs)("div",{className:"row m-1",children:[Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{children:"School / University"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.schoolFormHandler,placeholder:"School / University"})]}),Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputEmail4",children:"Student Code"}),Object(j.jsx)("input",{type:"text",className:"form-control",onChange:this.studentCodeFormHandler,placeholder:"Student Code"})]})]}),Object(j.jsxs)("div",{className:"row m-1",children:[Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputPassword4",children:"Password"}),Object(j.jsx)("input",{type:"password",className:"form-control",onChange:this.passwordFormHandler,id:"inputPassword4",placeholder:"Password"})]}),Object(j.jsxs)("div",{className:"form-group col",children:[Object(j.jsx)("label",{for:"inputConfirmPassword4",children:"Confirm Password"}),Object(j.jsx)("input",{type:"password",className:"form-control",onChange:this.confirmPasswordFormHandler,id:"inputConfirmPassword4",placeholder:"Confirm Password"})]})]}),Object(j.jsx)("hr",{}),Object(j.jsx)("div",{className:"mx-auto",style:{width:200},children:Object(j.jsx)("button",{type:"submit",className:"btn btn-primary mx-auto",onClick:this.registerHandler,style:{width:200},children:"Register"})})]})]})}}]),s}(n.Component),J=L,Y=(s(51),function(){return Object(j.jsx)("div",{className:"main",style:{minHeight:"80vh"}})}),W=(s(52),s.p+"static/media/Profile Photo.f712bc96.png"),z=function(){return Object(j.jsx)("div",{className:"Profile_I mt-5",style:{minHeight:"100vh"},children:Object(j.jsx)("div",{className:"container d-flex justify-content-center",children:Object(j.jsxs)("div",{className:"d-flex flex-column align-items-center ProfileCard w-100 p-3",children:[Object(j.jsx)("img",{src:W,alt:"User"}),Object(j.jsxs)("div",{className:"d-flex flex-column flex-md-row align-items-center",children:[Object(j.jsx)("h2",{children:"Hossam Sherif Hassan"}),Object(j.jsx)("div",{className:"mx-2",children:Object(j.jsx)("span",{className:"badge badge-secondary",children:"Instructor"})})]}),Object(j.jsxs)("div",{style:{marginTop:95,width:"100%"},className:"px-lg-5",children:[Object(j.jsxs)("div",{className:"d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100",children:[Object(j.jsx)("span",{className:"pr-2",children:"Email: "}),Object(j.jsx)("h4",{className:"infoText m-0 px-2",children:"hossam.sherif.hassan@gmail.com"})]}),Object(j.jsxs)("div",{className:"d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100",children:[Object(j.jsx)("span",{className:"pr-2",children:"Degree: "}),Object(j.jsx)("h4",{className:"infoText m-0 px-2",children:"Proff. Dr."})]})]})]})})})},B=(s(53),function(){return Object(j.jsx)("div",{className:"Profile_S mt-5",style:{minHeight:"100vh"},children:Object(j.jsx)("div",{className:"container d-flex justify-content-center",children:Object(j.jsxs)("div",{className:"d-flex flex-column align-items-center ProfileCard w-100 p-3",children:[Object(j.jsx)("img",{src:W,alt:"User"}),Object(j.jsxs)("div",{className:"d-flex flex-column flex-md-row",children:[Object(j.jsx)("h2",{children:"Hossam Sherif Hassan"}),Object(j.jsx)("div",{className:"mx-2",children:Object(j.jsx)("span",{className:"badge badge-secondary",children:"Student"})})]}),Object(j.jsxs)("div",{style:{marginTop:95,width:"100%"},className:"px-lg-5",children:[Object(j.jsxs)("div",{className:"d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100",children:[Object(j.jsx)("span",{className:"pr-2",children:"Email: "}),Object(j.jsx)("h4",{className:"infoText m-0 px-2",children:"hossam.sherif.hassan@gmail.com"})]}),Object(j.jsxs)("div",{className:"d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100",children:[Object(j.jsx)("span",{className:"pr-2",children:"Code: "}),Object(j.jsx)("h4",{className:"infoText m-0 px-2",children:"1700440"})]}),Object(j.jsxs)("div",{className:"d-flex flex-lg-row justify-content-lg-start align-items-center flex-column align-items-center w-100",children:[Object(j.jsx)("span",{className:"pr-2",children:"Academic Year: "}),Object(j.jsx)("h4",{className:"infoText m-0 px-2",children:"4th Computer"})]})]})]})})})}),_=(s(54),function(e){var t=e.children,s=e.title;return Object(j.jsxs)("div",{className:"greenCard",children:[Object(j.jsx)("h2",{className:"text-light mx-auto py-3",children:s}),t]})}),V=s(29),G=(s(55),s(13));function M(){return window.innerWidth}var Q=function(){var e=function(e){console.log(e)},t=function(){var e=Object(n.useState)(M()),t=Object(G.a)(e,2),s=t[0],a=t[1];return Object(n.useEffect)((function(){function e(){a(M())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),s}(),s=t<768;return Object(j.jsx)("div",{className:"row justify-content-center text-center my-5",children:Object(j.jsx)("div",{className:"col-md-8 col-12",children:Object(j.jsx)(_,{title:"Verify Email",children:Object(j.jsxs)("div",{className:"d-flex flex-column justify-content-center align-items-center py-2",children:[Object(j.jsx)(V.a,{onComplete:function(t){e(t)},className:"my-5",autoFocus:!0,fieldHeight:85,fieldWidth:s?t/7:66,fields:6}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{className:"btn btn-primary",children:"Verify"})}),Object(j.jsxs)("small",{children:["Haven\u2019t receive the code yet? ",Object(j.jsx)("b",{className:"resent-text-purple text-decoration-underline",children:"Resent again"})]})]})})})})};var q=function(){return Object(j.jsxs)(r.a,{children:[Object(j.jsx)(O,{}),Object(j.jsxs)(l.c,{children:[Object(j.jsx)(l.a,{exact:!0,path:"/",component:Y}),Object(j.jsx)(l.a,{exact:!0,path:"/login",component:A}),Object(j.jsx)(l.a,{exact:!0,path:"/register",component:R}),Object(j.jsx)(l.a,{exact:!0,path:"/verifyEmail",component:Q}),Object(j.jsx)(l.a,{exact:!0,path:"/register-student",component:J}),Object(j.jsx)(l.a,{exact:!0,path:"/register-instructor",component:U}),Object(j.jsx)(l.a,{exact:!0,path:"/profile/student",component:B}),Object(j.jsx)(l.a,{exact:!0,path:"/profile/instructor",component:z})]}),Object(j.jsx)(b,{})]})},K=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,64)).then((function(t){var s=t.getCLS,n=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;s(e),n(e),a(e),c(e),r(e)}))},X=(s(56),s(19)),Z=s(30),$={userToken:null},ee=Object(X.b)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGN_IN":return Object(C.a)(Object(C.a)({},e),{},{userToken:t.payload});case"SIGN_OUT":return Object(C.a)(Object(C.a)({},e),{},{userToken:null,data:{}});default:return e}}}),te=Object(X.a)(Z.a),se=Object(X.c)(ee,te);c.a.render(Object(j.jsx)(f.a,{store:se,children:Object(j.jsx)(q,{})}),document.getElementById("root")),K()}},[[57,1,2]]]);
//# sourceMappingURL=main.f3aebcb0.chunk.js.map