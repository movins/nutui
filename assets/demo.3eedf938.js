import{c as t}from"./mobile.53ddac55.js";import{x as e,y as o,r as a,o as r,c as d,f as p,s as l,j as i}from"./vendor.8cdc485e.js";import"./index.c87c49f3.js";const{createDemo:n}=t("drag");var s=n({setup:()=>({right:function(){return document.documentElement.clientWidth-300-9},bottom:function(){return document.documentElement.clientHeight-559}})});const u=l();e("data-v-1d2dfb33");const c={class:"demo full"},f=p("h2",null,"基础用法",-1),y=i("触摸移动"),m=p("h2",{style:{top:"30px",position:"relative"}},"限制拖拽方向",-1),x=i("只能X轴拖拽"),_=i("只能Y轴拖拽"),b=p("h2",{style:{top:"60px",position:"relative"}},"自动吸边",-1),h=i("拖动我"),v=p("h2",{style:{top:"90px",position:"relative"}},"限制拖动边界",-1),g=p("div",{class:"drag-boundary"},null,-1),j=i("限制拖拽边界");o();const E=u(((t,e,o,l,i,n)=>{const s=a("nut-button"),E=a("nut-drag");return r(),d("div",c,[f,p(E,{style:{top:"120px",left:"8px"}},{default:u((()=>[p(s,{type:"primary"},{default:u((()=>[y])),_:1})])),_:1}),m,p(E,{direction:"x",style:{top:"200px",left:"8px"}},{default:u((()=>[p(s,{type:"primary"},{default:u((()=>[x])),_:1})])),_:1}),p(E,{direction:"y",style:{top:"200px",right:"50px"}},{default:u((()=>[p(s,{type:"primary"},{default:u((()=>[_])),_:1})])),_:1}),b,p(E,{direction:"x",attract:!0,style:{top:"275px",left:"8px"}},{default:u((()=>[p(s,{type:"primary"},{default:u((()=>[h])),_:1})])),_:1}),v,g,p(E,{boundary:{top:361,left:9,bottom:t.bottom(),right:t.right()},style:{top:"400px",left:"50px"}},{default:u((()=>[p(s,{type:"primary"},{default:u((()=>[j])),_:1})])),_:1},8,["boundary"])])}));s.render=E,s.__scopeId="data-v-1d2dfb33";export default s;