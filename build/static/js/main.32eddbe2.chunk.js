(this["webpackJsonpwerewolf-app"]=this["webpackJsonpwerewolf-app"]||[]).push([[0],{2:function(e,t){e.exports={COMMUNITY_CHAT:"COMMUNITY_CHAT",USER_CONNECTED:"USER_CONNECTED",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",USER_DISCONNECTED:"USER_DISCONNECTED",TYPING:"TYPING",VERIFY_USER:"VERIFY_USER",LOGOUT:"LOGOUT",TEMP_END:"TEMP_END",RESET:"RESET",CHANGE_TURN:"CHANGER_TURN",PLAYER_DONE:"PLAYER_DONE",GAME_START:"GAME_START",INITIALIZE:"INITIALIZE",WEREWORLF_START:"WEREWOLF_START",UPDATE_USER:"UPDATE_USER",SKIP_DISCUSSION:"SKIP_DISCUSSION",SKIP_OK:"SKIP_OK",ROBBER_SWAP:"ROBBER_SWAP",PLAYER_VOTE:"PLAYER_VOTE",GET_RANDOM:"GET_RANDOM"}},77:function(e,t,n){},79:function(e,t,n){"use strict";n.r(t);var s=n(1),r=n.n(s),a=n(38),c=n.n(a),o=n(3),i=n(4),l=n(6),u=n(5),d=n(39),h=n.n(d),O=n(2),p=n.p+"static/media/werewolf-vector.79af0c25.png",E=n(24),j=n(0),b=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).setUser=function(e){var t=e.user,n=e.isUser;e.gameStart?n?(s.setState({joined:!0}),s.props.setUser(t)):s.setError("A game is Ongoing"):n?s.setError("User name taken"):(s.setState({joined:!0}),s.props.setUser(t))},s.handleJoin=function(e){e.preventDefault();var t=s.props.socket,n=s.state.nickname;""==n?(window.alert("Please enter a nickname!"),document.getElementsByClassName("joinBtn").disabled=!0):t.emit(O.VERIFY_USER,n,s.setUser)},s.handleStart=function(e){e.preventDefault(),s.props.socket.emit(O.GAME_START)},s.handleChange=function(e){s.setState({nickname:e.target.value})},s.handleTempEnd=function(e){e.preventDefault(),s.props.socket.emit(O.TEMP_END)},s.setError=function(e){s.setState({error:e})},s.state={nickname:"",error:"",joined:!1},s}return Object(i.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.nickname,s=t.error,r=t.joined;return Object(j.jsx)("div",{className:"login",children:Object(j.jsxs)("form",{className:"login-form",children:[Object(j.jsx)("img",{src:p}),Object(j.jsx)("label",{htmlFor:"nickname",children:Object(j.jsx)("h2",{children:Object(j.jsx)("b",{children:"Got a nickname?"})})}),Object(j.jsx)("input",{ref:function(t){e.textInput=t},type:"text",id:"nickname",value:n,onChange:this.handleChange,placeholder:"Enter Username"}),Object(j.jsx)("div",{className:"error",children:s||null}),Object(j.jsx)(E.a,{type:"submit",className:"joinBtn",onClick:this.handleJoin,disabled:r,children:" Join Game "}),Object(j.jsx)("p",{}),Object(j.jsx)(E.a,{type:"submit",onClick:this.handleStart,disabled:!r,children:"Start Game"})]})})}}]),n}(s.Component),m=n(7),R=function(e){var t=e.name;return Object(j.jsx)("div",{className:"chat-header",children:Object(j.jsx)("div",{className:"user-info",children:Object(j.jsx)("div",{className:"user-name",children:t})})})},v=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).handleSubmit=function(e){e.preventDefault(),s.sendMessage(),s.setState({message:""})},s.sendMessage=function(){s.props.sendMessage(s.state.message)},s.sendTyping=function(){s.lastUpdateTime=Date.now().setHours(Date.now().getHours()+8),s.state.isTyping||(s.setState({isTyping:!0}),s.props.sendTyping(!0),s.startCheckingTyping())},s.startCheckingTyping=function(){console.log("Typing"),s.typingInterval=setInterval((function(){Date.now().setHours(Date.now().getHours()+8)-s.lastUpdateTime>300&&(s.setState({isTyping:!1}),s.stopCheckingTyping())}),300)},s.stopCheckingTyping=function(){console.log("Stop Typing"),s.typingInterval&&(clearInterval(s.typingInterval),s.props.sendTyping(!1))},s.state={message:"",isTyping:!1},s}return Object(i.a)(n,[{key:"componentWillUnmount",value:function(){this.stopCheckingTyping()}},{key:"render",value:function(){var e=this,t=this.state.message;return Object(j.jsx)("div",{className:"message-input",children:Object(j.jsxs)("form",{onSubmit:this.handleSubmit,className:"message-form",children:[Object(j.jsx)("input",{id:"message",ref:"messageinput",type:"text",className:"form-control",value:t,autoComplete:"off",placeholder:"Type something interesting",onKeyUp:function(t){13!==t.keyCode&&e.sendTyping()},onChange:function(t){var n=t.target;e.setState({message:n.value})}}),Object(j.jsx)("button",{disabled:t.length<1,type:"submit",className:"send",children:" Send "})]})})}}]),n}(s.Component),g=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).scrollDown=s.scrollDown.bind(Object(m.a)(s)),s}return Object(i.a)(n,[{key:"scrollDown",value:function(){var e=this.refs.container;e.scrollTop=e.scrollHeight}},{key:"componentDidMount",value:function(){this.scrollDown()}},{key:"componentDidUpdate",value:function(e,t){this.scrollDown()}},{key:"render",value:function(){var e=this.props,t=e.messages,n=e.user,s=e.typingUsers;return console.log("mess"+t),Object(j.jsx)("div",{ref:"container",className:"thread-container",children:Object(j.jsxs)("div",{className:"thread",children:[t.map((function(e){return Object(j.jsxs)("div",{className:"message-container ".concat(e.sender===n.name&&"right"),children:[Object(j.jsx)("div",{className:"time",children:e.time}),Object(j.jsxs)("div",{className:"data",children:[Object(j.jsx)("div",{className:"message",children:e.message}),Object(j.jsx)("div",{className:"name",children:e.sender})]})]},e.id)})),s.map((function(e){return Object(j.jsx)("div",{className:"typing-user",children:"".concat(e," is typing . . .")},e)}))]})})}}]),n}(s.Component),k=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).initChat=function(e){var t=s.props.socket;s.setState({chat:e}),t.on(O.MESSAGE_RECEIVED,s.addMessageToChat()),t.on(O.TYPING,s.updateTypingInChat())},s.addMessageToChat=function(){return function(e){var t=s.state.chat.messages.push(e);s.setState({newChat:t})}},s.updateTypingInChat=function(){return function(e){var t=e.user,n=e.isTyping;if(t!==s.props.user.name){var r=s.state.chat,a=r;n&&!r.typingUsers.includes(t)?a=r.typingUsers.push(t):!n&&r.typingUsers.includes(t)&&(a=r.typingUsers=r.typingUsers.filter((function(e){return e!==t}))),s.setState({newChat:a}),console.log(a)}}},s.sendMessage=function(e){s.props.socket.emit(O.MESSAGE_SENT,{message:e})},s.sendTyping=function(e){s.props.socket.emit(O.TYPING,{isTyping:e})},s.state={chat:{messages:[],user:"",typingUsers:[]}},s.initChat=s.initChat.bind(Object(m.a)(s)),s}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.props.socket.emit(O.COMMUNITY_CHAT,this.initChat)}},{key:"render",value:function(){var e=this,t=this.props.user,n=this.state.chat;return console.log(n),Object(j.jsx)("div",{className:"chat-room-container",children:Object(j.jsxs)("div",{className:"chat-room",children:[Object(j.jsx)(R,{name:"Werewolf Chat"}),Object(j.jsx)(g,{messages:n.messages,user:t,typingUsers:n.typingUsers}),Object(j.jsx)(v,{sendMessage:function(t){e.sendMessage(t)},sendTyping:function(t){e.sendTyping(t)}})]})})}}]),n}(s.Component),f=n.p+"static/media/back.163f6391.jpg",S=n.p+"static/media/werewolf.650f642e.png",y=n.p+"static/media/seer.eac01de8.png",L=n.p+"static/media/robber.4a5fb38a.png",T=n.p+"static/media/villager.60e02a77.png",_=function(e){var t=e.isCenterDeck,n=e.turn,s=e.cardAccount,r=e.user,a=e.handleLook,c=e.handleRob,o=e.handleVote,i=e.handleLook2,l=e.centerDeck,u=e.getWerewolves;return t?"ROLE_WEREWOLF"==n&&"ROLE_WEREWOLF"==r.role&&0==r.playerDone&&l.length>=1&&u()<2?Object(j.jsx)("button",{className:"look-button",onClick:function(){return a(r,1)},children:"Look at Center"}):"ROLE_SEER"==n&&"ROLE_SEER"==r.role&&0==r.playerDone&&l.length>=2?Object(j.jsx)("button",{className:"look-button",onClick:function(){return a(r,2)},children:"Look at Center"}):"ROLE_SEER"==n&&"ROLE_SEER"==r.role&&1==r.playerDone&&l.length>=2&&-1!=r.card1&&-1!=r.card2?Object(j.jsx)("button",{className:"look-button",onClick:function(){return i()},children:"Look at other Card"}):Object(j.jsx)("p",{}):"START_VOTE"==n&&s.id!=r.id?Object(j.jsx)("button",{className:"vote-button",onClick:function(){return o(r.id,s.name)},children:"Vote"}):"ROLE_SEER"==n&&"ROLE_SEER"==r.role&&0==r.playerDone&&s.id!=r.id?Object(j.jsx)("button",{className:"seer-button",onClick:function(){return a(s.id)},children:"Look"}):"ROLE_ROBBER"==n&&"ROLE_ROBBER"==r.role&&0==r.playerDone&&s.id!=r.id?Object(j.jsx)("button",{className:"swap-button",onClick:function(){return c(r,s)},children:"Swap"}):Object(j.jsx)("p",{})},N=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).state={seer_look:""},e.handleLook=e.handleLook.bind(Object(m.a)(e)),e.handleRob=e.handleRob.bind(Object(m.a)(e)),e.handleVote=e.handleVote.bind(Object(m.a)(e)),e.getVotes=e.getVotes.bind(Object(m.a)(e)),e}return Object(i.a)(n,[{key:"handleLook",value:function(e){var t=this.props.socket;this.setState({seer_look:e}),t.emit(O.PLAYER_DONE)}},{key:"handleRob",value:function(e,t){this.props.socket.emit(O.ROBBER_SWAP,e,t)}},{key:"handleVote",value:function(e,t){this.props.socket.emit(O.PLAYER_VOTE,e,t)}},{key:"getPhoto",value:function(e){switch(e){case"ROLE_WEREWOLF":return S;case"ROLE_SEER":return y;case"ROLE_ROBBER":return L;case"ROLE_VILLAGER":return T;default:return f}}},{key:"getVotes",value:function(){var e=this.props,t=e.connectedUsers,n=e.cardAccount,s=0;return Object.keys(t).map((function(e){t[e].voteID==n.name&&s++})),s}},{key:"render",value:function(){var e=this.props,t=(e.socket,e.turn),n=e.cardAccount,s=e.user,r=this.state.seer_look,a=f,c=0;"ROLE_WEREWOLF"==t&&"ROLE_WEREWOLF"==s.role&&"ROLE_WEREWOLF"==n.role&&(a=S),"ROLE_SEER"==t&&r==n.id&&"ROLE_SEER"==s.role&&(a=this.getPhoto(n.role)),"RESULTS"==t&&(a=this.getPhoto(n.role),c=this.getVotes());var o={backgroundImage:"url("+a+")",backgroundPosition:"center",backgroundSize:"cover"};return Object(j.jsxs)("div",{className:"player-card",style:o,children:[Object(j.jsxs)("div",{className:"player-card content",children:[n.name+"\n","RESULTS"==t?Object(j.jsxs)("div",{className:"player-card-content",children:["VOTES:",c]}):null]}),Object(j.jsx)(_,{isCenterDeck:!1,turn:t,cardAccount:n,user:s,handleLook:this.handleLook,handleRob:this.handleRob,handleVote:this.handleVote})]})}}]),n}(s.Component),D=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).state={seconds:0},e.timer=0,e.startTimer=e.startTimer.bind(Object(m.a)(e)),e.countDown=e.countDown.bind(Object(m.a)(e)),e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.setState({seconds:this.props.seconds})}},{key:"startTimer",value:function(){0==this.timer&&this.state.seconds>0&&(this.timer=setInterval(this.countDown,1e3))}},{key:"countDown",value:function(){var e=this.state.seconds-1;this.setState({seconds:e}),0==this.state.seconds&&clearInterval(this.timer)}},{key:"render",value:function(){return this.startTimer(),Object(j.jsx)("div",{children:this.state.seconds})}}]),n}(s.Component),C=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).state={centerDeck:[],change:!1},e.handleLook=e.handleLook.bind(Object(m.a)(e)),e.handleLook2=e.handleLook2.bind(Object(m.a)(e)),e.getWerewolves=e.getWerewolves.bind(Object(m.a)(e)),e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){var e=this.props.centerDeck;this.setState({centerDeck:e}),console.log(e)}},{key:"handleLook",value:function(e,t){var n=this.props.socket;n.emit(O.PLAYER_DONE),n.emit(O.GET_RANDOM,e,t)}},{key:"handleLook2",value:function(){var e=this.state.change;e=!e,this.setState({change:e})}},{key:"getPhoto",value:function(e){switch(e){case"ROLE_WEREWOLF":return S;case"ROLE_SEER":return y;case"ROLE_ROBBER":return L;case"ROLE_VILLAGER":return T;default:return f}}},{key:"getWerewolves",value:function(){var e=this.props.connectedUsers,t=0;return Object.keys(e).map((function(n){"ROLE_WEREWOLF"==e[n].role&&t++})),t}},{key:"render",value:function(){var e=this.props,t=(e.socket,e.turn),n=e.user,s=this.state,r=s.centerDeck,a=s.change,c=f,o="CENTER DECK";"ROLE_WEREWOLF"==t&&"ROLE_WEREWOLF"==n.role&&-1!=n.card1&&(c=this.getPhoto(r[n.card1]),o="CARD 1"),"ROLE_SEER"==t&&"ROLE_SEER"==n.role&&-1!=n.card1&&-1!=n.card2&&(a?(c=this.getPhoto(r[n.card2]),o="CARD 2"):(c=this.getPhoto(r[n.card1]),o="CARD 1"));var i={backgroundImage:"url("+c+")",backgroundPosition:"center",backgroundSize:"cover"};return Object(j.jsxs)("div",{className:"player-card",style:i,children:[Object(j.jsx)("div",{className:"player-card content",children:o}),Object(j.jsx)(_,{isCenterDeck:!0,turn:t,user:n,centerDeck:r,handleLook:this.handleLook,handleLook2:this.handleLook2,getWerewolves:this.getWerewolves})]})}}]),n}(s.Component),x=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this.props,t=e.socket,n=e.user,s=e.connectedUsers,r=e.centerDeck,a=e.turn,c=e.seconds,o=e.god,i=Object.keys(s).map((function(e){return Object(j.jsx)(N,{socket:t,turn:a,cardAccount:s[e],user:n,connectedUsers:s})}));return Object(j.jsxs)("div",{className:"playArea",children:[Object(j.jsx)("div",{className:"timer",children:Object(j.jsx)(D,{seconds:c},c)}),Object(j.jsx)("div",{className:"god",children:o}),Object(j.jsxs)("div",{className:"playArea-row",children:[i,Object(j.jsx)(C,{socket:t,turn:a,user:n,centerDeck:r,connectedUsers:s})]})]})}}]),n}(s.Component),U=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).state={skip:!1},s.skipDiscussion=s.skipDiscussion.bind(Object(m.a)(s)),s}return Object(i.a)(n,[{key:"getPhoto",value:function(e){switch(e){case"ROLE_WEREWOLF":return S;case"ROLE_SEER":return y;case"ROLE_ROBBER":return L;case"ROLE_VILLAGER":return T;default:return f}}},{key:"getRoleName",value:function(e){switch(e){case"ROLE_WEREWOLF":return"Werewolf";case"ROLE_SEER":return"Seer";case"ROLE_ROBBER":return"Robber";case"ROLE_VILLAGER":return"Villager";default:return"Error"}}},{key:"getDescription",value:function(e){switch(e){case"ROLE_WEREWOLF":return"When the Werewolves wake up, along with the other Werewolves, to see who they are. If a Werewolf wakes up and they see no other Werewolves, they are allowed to look at one card in the center.";case"ROLE_SEER":return"When the Seer wakes up, they can either look at a player's card or 2 cards in the center.";case"ROLE_ROBBER":return"When the Robber wakes up, they can trade their card with another player's card, then look at their new card.";case"ROLE_VILLAGER":return"The Villager remains asleep throughout the night and does not take any actions during this phase";default:return"Error"}}},{key:"skipDiscussion",value:function(){var e=this,t=this.props.socket;t.emit(O.SKIP_DISCUSSION),t.on(O.SKIP_OK,(function(){e.setState({skip:!0})}))}},{key:"render",value:function(){var e=this,t=this.props,n=(t.socket,t.user),s=t.turn,r=this.state.skip,a="",c="",o="";return a="ROLE_ROBBER"==n.role&&""!=n.swappedRole?this.getPhoto(n.swappedRole):this.getPhoto(n.role),c="ROLE_ROBBER"==n.role&&""!=n.swappedRole?this.getRoleName(n.swappedRole):this.getRoleName(n.role),o="ROLE_ROBBER"==n.role&&""!=n.swappedRole?this.getDescription(n.swappedRole):this.getDescription(n.role),Object(j.jsxs)("div",{className:"info-panel",children:[Object(j.jsxs)("div",{className:"info-box",children:["Info:",Object(j.jsx)("img",{className:"info-image",src:a,alt:c}),c]}),Object(j.jsxs)("div",{className:"container-row",children:[Object(j.jsxs)("div",{className:"desc-box",children:[Object(j.jsx)("div",{className:"desc-tag",children:"Description:"}),Object(j.jsx)("div",{className:"desc-main",children:o})]}),Object(j.jsxs)("div",{className:"vote-box",children:[Object(j.jsx)("div",{className:"vote-tag",children:"Vote:"}),"DISCUSSION"==s?Object(j.jsx)("button",{onClick:function(){return e.skipDiscussion()},disabled:r,children:"Skip Discussion"}):null,Object(j.jsx)("div",{className:"vote-main",children:n.voteID})]})]})]})}}]),n}(s.Component),w=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).state={turn:"",seconds:10,god:"Welcome To Ultimate Werewolf"},s.initTurn=s.initTurn.bind(Object(m.a)(s)),s.resetTimer=s.resetTimer.bind(Object(m.a)(s)),s}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.initTurn()}},{key:"resetTimer",value:function(e){this.setState({seconds:e})}},{key:"initTurn",value:function(){var e=this;this.props.socket.on(O.CHANGE_TURN,(function(t,n,s){e.resetTimer(n+1),e.setState({turn:t,seconds:n,god:s})}))}},{key:"render",value:function(){var e=this.state,t=e.turn,n=e.seconds,s=e.god,r=this.props,a=r.socket,c=r.user,o=r.connectedUsers,i=r.centerDeck;return Object(j.jsxs)("div",{className:"container",children:[Object(j.jsxs)("div",{className:"container-row",children:[Object(j.jsx)(x,{socket:a,user:c,connectedUsers:o,centerDeck:i,turn:t,seconds:n,god:s}),Object(j.jsx)(U,{socket:a,user:c,turn:t})]}),Object(j.jsx)(k,{socket:a,user:c})]})}}]),n}(s.Component),I=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(o.a)(this,n),(s=t.call(this,e)).initSocket=function(){var e=h()("/");e.on("connect",(function(){s.state.user?s.reconnect(e):console.log("Connected"),console.log("Connected")})),e.on(O.INITIALIZE,(function(e,t){s.setState({start:!0,connectedUsers:e,centerDeck:t}),s.updateUser()})),e.on(O.RESET,(function(){s.setState({user:null,start:null,connectedUsers:null,centerDeck:[]})})),e.on(O.UPDATE_USER,(function(e,t){s.setState({connectedUsers:e,start:t}),s.updateUser()})),s.setState({socket:e})},s.updateUser=function(){var e=s.state,t=e.user,n=e.connectedUsers;t&&Object.keys(n).forEach((function(e){n[e].name==t.name&&s.setState({user:n[e]})})),console.log(n)},s.reconnect=function(e){e.emit(O.VERIFY_USER,s.state.user.name,(function(e){var t=e.isUser,n=e.user;t?s.setState({user:null}):s.setUser(n)}))},s.setUser=function(e){s.state.socket.emit(O.USER_CONNECTED,e),s.setState({user:e})},s.setStart=function(e){s.setState({start:e})},s.state={socket:null,user:null,start:null,connectedUsers:null,centerDeck:[]},s}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.initSocket()}},{key:"render",value:function(){this.props.title;var e=this.state,t=e.socket,n=e.user,s=e.start,r=e.connectedUsers,a=e.centerDeck;return Object(j.jsx)("div",{className:"container",children:n&&s?Object(j.jsx)(w,{socket:t,user:n,connectedUsers:r,centerDeck:a}):Object(j.jsx)(b,{socket:t,setUser:this.setUser})})}}]),n}(s.Component),A=(n(77),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return Object(j.jsx)(I,{title:"Werewolf"})}}]),n}(s.Component)),W=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,80)).then((function(t){var n=t.getCLS,s=t.getFID,r=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),s(e),r(e),a(e),c(e)}))};n(78);c.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(A,{})}),document.getElementById("root")),W()}},[[79,1,2]]]);
//# sourceMappingURL=main.32eddbe2.chunk.js.map