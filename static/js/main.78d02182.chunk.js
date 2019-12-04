(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{11:function(t,e,a){t.exports=a(17)},16:function(t,e,a){},17:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),i=a(2),r=a.n(i),l=(a(16),a(3)),h=a(8),o=a(4),c=a(5),u=a(9),d=a(6),g=a(10),m=a(7),p=a.n(m);var f=function(t){var e=t.height,a=t.width,n=t.winningStreak,i=t.handleChange,r=t.createBoard;return s.a.createElement("div",{className:"menu-wrapper"},s.a.createElement("label",null,"Height:",s.a.createElement("input",{type:"text",name:"height",value:e,onChange:i})),s.a.createElement("label",null,"Width:",s.a.createElement("input",{type:"text",name:"width",value:a,onChange:i})),s.a.createElement("label",null,"Winning Streak:",s.a.createElement("input",{type:"text",name:"winningStreak",value:n,onChange:i})),s.a.createElement("button",{className:"btn",onClick:r},"PLAY"))},w=function(t){function e(){var t,a;Object(o.a)(this,e);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(a=Object(u.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(s)))).state={board:[],winningStreak:"3",height:"3",width:"3",stepCount:0,status:"",menu:!0,streakCells:[]},a.createBoard=function(){var t=parseInt(a.state.height),e=parseInt(a.state.width),n=parseInt(a.state.winningStreak);if(n>t&&n>e)alert("Streak cannot be longer than height/width");else if(isNaN(t)||isNaN(e)||isNaN(n))alert("Please fill in all the fields");else{for(var s=[],i=0;i<a.state.height;i++){s.push([]);for(var r=0;r<a.state.width;r++)s[i].push("")}a.setState({board:s,menu:!1,streakCells:[],stepCount:0,status:"PLAYING"})}},a.handleCellClick=function(t,e){var n=a.state.board[t][e];if("PLAYING"===a.state.status&&""===n){var s=a.state.board.map((function(t){return Object(h.a)(t)}));s[t][e]=a.state.stepCount%2===0?"X":"O",a.setState((function(t){return{board:s,stepCount:t.stepCount+1}}),(function(){return a.checkStatus(t,e)}))}},a.checkStatus=function(t,e){for(var n=a.state.board[t][e],s=[],i=0;i<a.state.height;i++)if(a.state.board[i][e]===n){if(s.push([i,e]),s.length>=a.state.winningStreak)return void a.win(s)}else s=[];s=[];for(var r=0;r<a.state.width;r++)if(a.state.board[t][r]===n){if(s.push([t,r]),s.length>=a.state.winningStreak)return void a.win(s)}else s=[];s=[];for(var l=t>=e?0:e-t,h=t>=e?t-e:0;h<a.state.height&&!(l>=a.state.width);h++){if(a.state.board[h][l]===n){if(s.push([h,l]),s.length>=a.state.winningStreak)return void a.win(s)}else s=[];l+=1}s=[];for(var o=t+e>=a.state.height?a.state.height-1:t+e,c=t+e>=a.state.height?t+e-(a.state.height-1):0,u=o;u>=0&&!(c>=a.state.width);u--){if(a.state.board[u][c]===n){if(s.push([u,c]),s.length>=a.state.winningStreak)return void a.win(s)}else s=[];c+=1}a.state.stepCount>=a.state.height*a.state.width&&a.setState({status:"TIE"})},a.win=function(t){a.setState({streakCells:t,status:"WIN"})},a.handleChange=function(t){a.setState(Object(l.a)({},t.target.name,t.target.value.replace(/\D/,"")))},a}return Object(g.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this;return this.state.menu?s.a.createElement(f,{height:this.state.height,width:this.state.width,winningStreak:this.state.winningStreak,handleChange:this.handleChange,createBoard:this.createBoard}):s.a.createElement("div",{className:"game-wrapper"},s.a.createElement("div",{className:"game",style:{gridTemplateColumns:"repeat(".concat(this.state.width,", 50px)"),gridTemplateRows:"repeat(".concat(this.state.height,", 50px)")}},this.state.board.map((function(e,a){return e.map((function(e,n){return s.a.createElement("div",{className:p()("cell",{streak:t.state.streakCells.some((function(t){return t[0]===a&&t[1]===n}))}),key:a+n,onClick:function(){return t.handleCellClick(a,n)}},e)}))}))),"WIN"===this.state.status&&s.a.createElement("p",null,this.state.stepCount%2===0?"O":"X"," Wins!"),"TIE"===this.state.status&&s.a.createElement("p",null,"TIE"),"PLAYING"!==this.state.status&&s.a.createElement("button",{className:"btn",onClick:function(){return t.setState({menu:!0})}},"New Game"))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[11,1,2]]]);
//# sourceMappingURL=main.78d02182.chunk.js.map