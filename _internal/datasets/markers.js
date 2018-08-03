import Entities from'./entities';import KdTree from'../misc/kdtree';import{addDep}from'../dependency-manager';import mapsAnimation from'../animation-rules/map-entities-animation';import{pluck,extend2,parseTooltext,pluckNumber,parseUnsafeString,toRaphaelColor}from'../lib/lib';import{convertColor}from'../lib/lib-graphics';import{raiseEventGroup}from'../misc/event-api';import{priorityList}from'../schedular';let UNDEF,userAgent=window.navigator.userAgent,isIE=/msie/i.test(userAgent)&&!window.opera,BLANK='',POSITION_TOP='top',POSITION_BOTTOM='bottom',POSITION_RIGHT='right',POSITION_LEFT='left',POSITION_MIDDLE='middle',POSITION_CENTER='center',INNERRADIUSFACTOR=.6,math=window.Math,mathMin=math.min,mathMax=math.max,MARKER_ITEM_KEY='items',mathPI=Math.PI,deg2rad=mathPI/180,TRACKER_FILL='rgba(192,192,192,'+(isIE?.002:1e-6)+')',colorize=function(a,b){let c=b?extend2(a.FCcolor,b,!1,!0):{FCcolor:a};return c.toString=toRaphaelColor,c},convertToObj=function(a,b){let c,d=a&&a.length||!1,e=b||'id',f={};if(!a)return a;for(;d--;)c=a[d],c[e]!==UNDEF&&(f[c[e].toLowerCase()]=c);return f};addDep({name:'mapsAnimation',type:'animationRule',extension:mapsAnimation});class Markers extends Entities{constructor(){super(),this.components={},this.getLabelAlignment={top:function(a,b,c){return{x:a.toString(),y:(b-c).toString(),align:POSITION_CENTER,valign:POSITION_TOP}},left:function(a,b,c){return{x:(a-c).toString(),y:b.toString(),align:POSITION_RIGHT,valign:POSITION_MIDDLE}},right:function(a,b,c){return{x:(a+c).toString(),y:b.toString(),align:POSITION_LEFT,valign:POSITION_MIDDLE}},bottom:function(a,b,c){return{x:a.toString(),y:(b+c).toString(),align:POSITION_CENTER,valign:POSITION_BOTTOM}},center:function(a,b){return{x:a.toString(),y:b.toString(),align:POSITION_CENTER,valign:POSITION_MIDDLE}}},this.getWrapWidth={right:function(){return arguments[1]},left:function(a,b){return a-b},center:function(a,b){return 2*mathMin(b,a-b)}},this.getWrapHeight={top:function(){return arguments[1]},middle:function(a,b){return 2*mathMin(b,a-b)},bottom:function(a,b){return a-b}}}getName(){return'markers'}getType(){return'dataset'}configureAttributes(a){if(a){this.JSONData=a;let b=this,c=b.getFromEnv('chart'),d=c.config.markerOpts;b.calculateDataLimits(),d.dataEnabled?this._parseMarkers():this.defineMarkersNShapes(),this.configureConnectors()}}calculateMarkerRadiusLimits(){if(this.JSONData){let a=this,b=a.JSONData,c=a.config,d=a.getFromEnv('chart'),e=d.config.width,f=d.config.height,g=b.markermaxradius,h=b.markerminradius,i=Markers.getMarkerRadiusLimits(e,f,g,h);c.minRadius=i.min,c.maxRadius=i.max}}calculateDataLimits(){let a,b,c,d,e,f=this,g=f.getFromEnv('chart'),h=f.config,j=g.jsonData,k=j.markers||{},l=k[MARKER_ITEM_KEY]||[],m=this.getFromEnv('number-formatter'),n=+Infinity,o=-Infinity;for(e=0,c=l.length;e<c;e++)a=l[e],d=a.value,b=m.getCleanValue(d),null!==b&&(n=mathMin(b,n),o=mathMax(b,o));h.min=n,h.max=o}_parseMarkers(){let a,b,c,d,e,f,g,h,j=this,k=j.getFromEnv('chart'),l=k.jsonData,m=l.markers,n=m[MARKER_ITEM_KEY],o=m.shapes,p=k.config.markerOpts,q=this.getFromEnv('number-formatter'),r=j.components.shapeObjs={},s=j.components.markerObjs={};if(n&&n.length){if(o&&o.length)for(b=o.length;b;b-=1)d=o[b-1],(h=d.id.toLowerCase())&&(r[h]=d);for(b=n.length;b--;)d=n[b],(h=d.id&&d.id.toLowerCase())&&(a=d.value,a!==UNDEF&&''!==a&&(a=parseFloat(a)),c=Markers._initializeMarkerItem(h,d,null,k),e=c.config.options.shapeid,e&&'string'==typeof e&&(e=e.toLowerCase()),f=c.config,g=f.options,f.cleanValue=q.getCleanValue(a),f.formattedValue=null===f.cleanValue?UNDEF:q.dataLabels(a),f.fillColor=pluck(g.fillcolor,g.color,p.fillColor),f.fillAlpha=pluck(g.fillalpha,g.alpha,p.fillAlpha),f.fillRatio=pluck(g.fillratio,p.fillRatio),f.fillAngle=pluck(g.fillangle,p.fillAngle),f.borderThickness=pluckNumber(g.borderthickness,p.borderThickness),f.borderColor=pluck(g.bordercolor,p.borderColor),f.borderAlpha=pluck(g.borderalpha,p.borderAlpha),f.labelPadding=g.labelpadding||p.labelPadding,c.dataset=j,d.__hideMarker&&(c._isHidden=!0),e&&(c.shapeObj=r[e]),s[h]=c)}}defineMarkersNShapes(){let a,b,c,d,e,f,g,h,j=this,k=j.getFromEnv('chart'),l=k.jsonData,m=l.markers,n=m.definition,o=this.getFromEnv('number-formatter'),p=k.config.markerOpts,q=convertToObj(n)||{},r=convertToObj(m.application)||{},s=m.shapes,t=j.components.shapeObjs=j.components.shapeObjs||(j.components.shapeObjs={}),u=j.components.markerObjs=j.components.markerObjs||(j.components.markerObjs={});if(n&&n.length){if(s&&s.length)for(d=s.length;d;d-=1)f=s[d-1],(h=f.id.toLowerCase())&&(t[h]=f);for(h in q)f=q[h],e=u[h]=Markers._initializeMarkerItem(h,f,r[h],k),e.dataset=j,g=e.config.options.shapeid,b=e.config,c=f.value,b.cleanValue=o.getCleanValue(c),a=b.options,b.formattedValue=null===b.cleanValue?UNDEF:o.dataLabels(c),b.fillColor=pluck(a.fillcolor,a.color,p.fillColor),b.fillAlpha=pluck(a.fillalpha,a.alpha,p.fillAlpha),b.fillRatio=pluck(a.fillratio,p.fillRatio),b.fillAngle=pluck(a.fillangle,p.fillAngle),b.borderThickness=pluckNumber(a.borderthickness,p.borderThickness),b.borderColor=pluck(a.bordercolor,p.borderColor),b.borderAlpha=pluck(a.borderalpha,p.borderAlpha),b.labelPadding=a.labelpadding||p.labelPadding,b.options.tooltext=pluck(a.tooltext,p.tooltext),b.link=a.link,g&&(e.shapeObj=t[g.toLowerCase()])}}static getMarkerRadiusLimits(a,b,c,d){let e=mathMin(a,b),f=.02;return d=parseFloat(d),c=parseFloat(c),isNaN(d)||isNaN(c)?isNaN(d)?isNaN(c)?{min:f*e,max:f*3.5*e}:{min:parseInt(c/10,10),max:c}:{min:d,max:10*d}:d<c?{min:d,max:c}:{min:c,max:d}}getDataLimits(){let a=this,b=a.config;return{min:b.min,max:b.max}}static _initializeMarkerItem(a,b,c){let d,e={},f=e.config;return f||(f=e.config={}),f.id=a,f.definition=b,f.application=c,f.hasValue=null,f.value=null,f.options=null,f.label=null,f.markerShape=null,f.markerLabel=null,f.drawOptions={shape:null,label:null},f.drawComplete=!1,d=e.config.options=extend2({},f.definition),f.dataEnabled?!isNaN(d.value)&&''!==d.value&&(e.value=parseFloat(d.value),e.hasValue=!0):f.applyAll?f.options=extend2(d,f.application):c&&(f.options=extend2(d,f.application)),e}configureConnectors(){let a,b,c,d,e,f,g,h,j,k,l,m,n,o,p,q=this,r=q.getFromEnv('chart'),s=r.jsonData,t=q.components,u=s.markers||{},v=u.connector||u.connectors||[],w=t.markerObjs,x=v.length,y=q.components.connectors,z=function(a){return function(b){let c=this,d=c.getElement();d&&c.unfilteredConfig.hoverEffect&&d.attr(c.unfilteredConfig._hoverAttrs),r.fireChartInstanceEvent('connectorrollover',a,b)}},A=function(a){return function(b){let c=this,d=c.getElement();d&&c.unfilteredConfig.hoverEffect&&d.attr(c.unfilteredConfig._defaultAttrs),r.fireChartInstanceEvent('connectorrollout',a,b)}},B=function(a){return function(b){r.fireChartInstanceEvent('connectorClick',a,b)}},C=r.config.connectorOpts,D={};for(y=q.components.connectors=[],p=0;p<x;p++)(o=v[p],o.from||o.to)&&(c=w[o.from.toLowerCase()],d=w[o.to.toLowerCase()],c&&d)&&(e=v[p].label,D=y[p],D||(D=y[p]={}),D.config||(a=D.config={}),D.graphics||(D.graphics={}),a=D.config=extend2({},o),a.fromMarker=c,a.toMarker=d,a.link=o.link,a.showTooltip=pluckNumber(o.showtooltip,C.showTooltip),f=a.tooltext=a.showTooltip?pluck(o.tooltext,C.tooltext):BLANK,g=a.thickness=pluck(o.thickness,C.thickness),h=a.color=pluck(o.color,C.color),j=a.alpha=pluck(o.alpha,C.alpha),a.hoverEffect=pluckNumber(o.showhovereffect,C.showHoverEffect),k=pluck(o.hovercolor,C.hoverColor,h),l=pluck(o.hoveralpha,C.hoverAlpha,j),m=pluck(o.hoverthickness,C.hoverThickness,g),a.dashed=pluck(o.dashed,C.dashed),a.dashLen=pluckNumber(o.dashlen,C.dashlen),a.dashGap=pluckNumber(o.dashgap,C.dashgap),f&&(a.tooltext=f=parseUnsafeString(parseTooltext(f,[3,40,41,42,43],{label:e,fromId:c.config.definition.id,toId:d.config.definition.id,fromLabel:c.config.definition.label,toLabel:d.config.definition.label},b))),a.eventArgs={fromMarkerId:c.config.id,toMarkerId:d.config.id,label:e},a._hoverAttrs={stroke:colorize({color:k,alpha:l}).toString(),"stroke-width":m},a._defaultAttrs={stroke:colorize({color:h,alpha:j}).toString(),"stroke-width":g},a.type='line',a.onclick=B(a.eventArgs),a.onmouseover=z(a.eventArgs),a.onmouseout=A(a.eventArgs),e&&(n=D.labelConfig,!n&&(n=D.labelConfig={}),n.type='text',n.text=e,n.align=POSITION_CENTER,n.valign=POSITION_MIDDLE,n.font=C.font,n.fillcolor=C.fontColor,n.bgcolor=C.labelBgColor,n.bordercolor=C.labelBorderColor,n.tooltext=a.tooltext))}draw(){let a,b,c,d,e,f,g,h=this,i=h.getFromEnv('chart'),j=h.config,k=i.getChildren('mapAnnotations')[0],l=h.components.markerObjs,m=i.config,n=m.markerOpts,o=m.scalingParams,p=i.config.annotationConfig,q=h.getFromEnv('toolTipController'),r=[],s=[],t={};for(d in this._drawConnectors(),h.imageLoadCount=0,h.imageCount=0,g=k.addGroup(Object.assign(p,{id:'markers',fillalpha:'100',items:r,scaleimages:1}),h),f=k.addGroup(Object.assign(p,{id:'markerLabels',items:s,scaleimages:1}),h),m.labelsOnTop&&i.getChildren('mapLabelAnnotations')&&i.getChildren('mapLabelAnnotations')[0].annotation.groups[0].store.element.toFront(),h.components.markerGroup=g,h.components.markerLabelGroup=f,j.autoScale=n.autoScale?o.sFactor:1,l)(a=null,b=l[d],c=b.config,c.conIsHidden||(a=this._drawMarkerItem.call(b)),!!a)&&(c._annotationIndex=r.length,t[d]=b,b.markerShape=a.markerShape&&k.addItem(g.getId(),Object.assign({align:'center',valign:'middle',animationLabel:'markerItem'},a.markerShape),!0,h),e=b.markerShape&&b.markerShape.getElement(),e&&q.enableToolTip(e,b.config.tooltext),r.push(b.markerShape),b.markerLabel=a.markerLabel&&k.addItem(f.getId(),Object.assign({animationLabel:'markerItem'},a.markerLabel),!0,h),s.push(b.markerLabel));h.addJob('buildKdtree',h._buildKdTree.bind(h),priorityList.kdTree)}_buildKdTree(){let a,b,c=this,d=c.components.kdArrayMap,e=c.components.markerGroup,f=[],g=e&&e.items,h=g&&g.length||0;for(b=0;b<h;b++)a=g[b].config.id,d[a]&&f.push(d[a]);c.components.kDTree||(c.components.kDTree=new KdTree(!0)),c.components.kDTree._setSearchLimit(1/0,1/0),c.components.kDTree.buildKdTree(f)}_drawMarkerItem(){let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=this,v=u.dataset,w=v.getFromEnv('chart'),x=w.config,y=v.config,z=x.scalingParams,A=u.config,B=A.options,C=A.definition,D=x.markerOpts,E=D.dataLabels.style,F=B.shapeid,G=B.scale||1,H=B.label||BLANK,I=w.config.scalingParams.scaleFactor*w.config.baseScaleFactor,J=(B.labelpos||POSITION_TOP).toLowerCase(),K=A.formattedValue===UNDEF?UNDEF:A.formattedValue,L=B.tooltext||D.tooltext,M=pluckNumber(C.radius,A.radius,D.radius)*G*y.autoScale||1e-4,N=A.fillColor,O=A.fillAlpha,P=A.fillRatio,Q=A.fillAngle,R=A.borderThickness,S=A.borderColor,T=A.borderAlpha,U=v.components.kdArrayMap||(v.components.kdArrayMap={}),V=u.config.id;if(A.autoScale=D.autoScale?I:1,!!F)return(L=L?parseUnsafeString(parseTooltext(L,[1,2,3],{formattedValue:K,label:H},B)):K?H+D.tooltipSepChar+K:H,K!==UNDEF&&null!==K?H=H+D.labelSepChar+K:isNaN(G)?G=1:0>G?G=0:5<G&&(G=5),extend2(B,{x:B.x&&B.x.toString(),y:B.y&&B.y.toString(),fillcolor:N,fillalpha:O,fillratio:P,fillangle:Q,borderthickness:R,bordercolor:S,borderalpha:T,hovereffect:pluck(D.showHoverEffect),radius:M&&M.toString(),link:B.link,showshadow:pluckNumber(B.showshadow,A.shadow),_markerLabel:H,_markerId:B.id,id:(B.id+BLANK).toLowerCase()}),delete B.tooltext,A.tooltext=!!D.showTooltip&&L,o=+B.x*z.sFactor+z.translateX,p=+B.y*z.sFactor+z.translateY,M=B.radius,'triangle'===F?(extend2(B,{type:'polygon',sides:3,startangle:D.startAngle}),t='polygon',s=3):'diamond'===F?(extend2(B,{type:'polygon',sides:4,startangle:D.startAngle}),t='polygon',s=4):'arc'===F?(r=M*INNERRADIUSFACTOR,extend2(B,{type:'arc',startangle:0,endangle:360,innerradius:r}),t='arc'):'circle'===F?(B.type='circle',t='circle'):(k=v.getShapeArgs.call(u),D.dataEnabled&&D.valueToRadius&&B.radius!==UNDEF?delete k.radius:(!k.radius&&(k.radius=D.radius),k.radius*=G*A.autoScale),extend2(B,k),B.id=B._markerId&&B._markerId.toLowerCase(),r=k.innerradius,k.radius&&(M=k.radius),t=k.type&&k.type.toLowerCase(),s=k.sides||5,M=+M,M&&r&&M<r&&(n=M,B.radius=M=r,B.innerradius=r=n)),B.type=B.type&&B.type.toLowerCase(),extend2(B,{hoverfillcolor:pluck(B.fillhovercolor,D.hoverFillColor,B.fillcolor),hoverfillalpha:pluck(B.fillhoveralpha,D.hoverFillAlpha,B.fillalpha),hoverfillratio:pluck(B.fillhoverratio,D.hoverFillRatio,B.fillratio),hoverfillangle:pluck(B.fillhoverangle,D.hoverFillAngle,B.fillangle),hoverborderthickness:pluckNumber(B.borderhoverthickness,D.hoverBorderThickness,B.borderthickness),hoverbordercolor:pluck(B.borderhovercolor,D.hoverBorderColor,B.bordercolor),hoverborderalpha:pluck(B.borderhoveralpha,D.hoverBorderAlpha,B.borderalpha)}),l={alpha:B.fillalpha,color:B.fillcolor,angle:360-B.fillangle,ratio:B.fillratio},m={alpha:B.hoverfillalpha,color:B.hoverfillcolor,angle:360-B.hoverfillangle,ratio:B.hoverfillratio},B._defaultattrs={fill:toRaphaelColor(l),"stroke-width":'0'===B.showborder?0:B.borderthickness,stroke:convertColor(B.bordercolor,B.borderalpha)},B._hoverattrs={fill:toRaphaelColor(m),"stroke-width":'0'===B.showborder?0:B.hoverborderthickness,stroke:convertColor(B.hoverbordercolor,B.hoverborderalpha)},'image'===B.type?(B.borderthickness=B.borderthickness||0,B.onload=function(a){let b=this,c=b.config,d=a.width,e=a.height,f={},g=(+c.x-d/(2*z.sFactor))*z.sFactor,h=(+c.y-e/(2*z.sFactor))*z.sFactor;f=U[V]||(U[V]={}),f.x=g+z.translateX,f.y=h+z.translateY,f.element=u,f.shapeInfo={type:'rect',width:d,height:e},d&&e&&b.getElement().attr({x:g,y:h,width:d,height:e}),v.imageLoadCount++,v.imageLoadCount===v.imageCount&&v._buildKdTree()},B.onerror=function(){v.imageLoadCount++,v.imageLoadCount===v.imageCount&&v._buildKdTree()},v.imageCount++):(q=U[V]||(U[V]={}),q.x=o,q.y=p,q.element=u,q.shapeInfo={type:t,sides:s,radius:+M+B.borderthickness/2,innerradius:r}),A.drawOptions.shape=B,!D.showLabels)?{markerShape:B}:(j=B.labelpadding||D.labelPadding,a=v._getLabelOptions(J,j,B),b=a.align,c=a.valign,d=A._labelBaseWidth,e=A._labelBaseHeight,f=A._labelXOffset,g=A._labelYOffset,h=D.labelWrapWidth?D.labelWrapWidth:v.getWrapWidth[b](d,+a.x+f),i=D.labelWrapHeight?D.labelWrapHeight:v.getWrapHeight[c](e,+a.y+g),h>j&&(h-=j),i>j&&(i-=j),A.drawOptions.label='center'==b&&'middle'==c?extend2({type:'text'},{text:H,tooltext:B.tooltext,x:a.x,y:a.y,align:b,valign:a.valign,wrap:1,wrapwidth:h,wrapheight:i,fontsize:E.fontSize/z.sFactor,font:E.fontFamily,fillcolor:E.fontColor}):extend2({type:'text'},{text:H,tooltext:B.tooltext,x:a.x,y:a.y,align:b,valign:a.valign,wrap:1,wrapwidth:h,wrapheight:i,fontsize:E.fontSize/z.sFactor,font:E.fontFamily,fillcolor:E.fontColor}),{markerShape:B,markerLabel:A.drawOptions.label})}getHoverFn(){let a=this,b=a.getFromEnv('chart');return function(){let a,c,d=this,e=d.data('marker'),f=e.markerShape,g=f.unfilteredConfig,h=g._markerEventArgs,i=f.getElement(),j=i.getBBox(),k=e.config;i&&g.hovereffect&&('circle'===f.config.type&&(c={color:g.hoverfillcolor,alpha:g.hoverfillalpha,angle:360-g.hoverfillangle,ratio:g.hoverfillratio,gradientUnits:'objectBoundingBox',radialGradient:'radial'===f.config.rawFillPattern},g._hoverattrs.fill=toRaphaelColor(c)),a=extend2({},g._hoverattrs),'image'===i.type&&(delete a.fill,delete a.stroke,delete a['stroke-width']),i.attr(a)),h||(h=g._markerEventArgs={x:j.x,y:j.y,scaledX:j.x/f.groupConfig.scaleX,scaledY:j.y/f.groupConfig.scaleY,chartX:j.x+j.width/2,chartY:j.y+j.height/2,id:g.id,label:g.label}),raiseEventGroup(k.options.id,'markerRollOver',h,b.getFromEnv('chartInstance'),k,UNDEF,UNDEF,UNDEF)}}getHoverOutFn(){let a=this,b=a.getFromEnv('chart');return function(){let a,c=this,d=c.data('marker'),e=d.markerShape,f=e.getElement(),g=d.config,h=e.unfilteredConfig;f&&e.unfilteredConfig.hovereffect&&('circle'===e.config.type&&(h._defaultattrs.fill=toRaphaelColor({alpha:e.config.rawAlpha,color:e.config.rawColor,angle:360-e.config.rawAngle,ratio:e.config.rawRatio,radialGradient:'radial'===e.config.rawFillPattern})),a=extend2({},e.unfilteredConfig._defaultattrs),'image'===f.type&&(delete a.fill,delete a.stroke,delete a['stroke-width']),f.attr(a)),raiseEventGroup(g.id,'markerRollOut',e.unfilteredConfig._markerEventArgs,b.getFromEnv('chartInstance'),UNDEF,UNDEF,UNDEF)}}getClickFn(){let a=this;return function(b){let c=this,d=c.data('marker'),e=d.config.options,f=a.getFromEnv('chart'),g=d.markerShape,h=g.config,i=c.getBBox(),j=h._markerEventArgs;j||(j=h._markerEventArgs={x:i.x,y:i.y,scaledX:i.x/g.groupConfig.scaleX,scaledY:i.y/g.groupConfig.scaleY,chartX:i.x+i.width/2,chartY:i.y+i.height/2,id:e.id,label:e.label}),f.fireChartInstanceEvent('markerClick',j,b)}}highlightPoint(a){let b,c,d,e,f,g,h,i,j,k,l=a.element,m=this,n=m.getFromEnv('chart'),o=n.graphics,p=m.getFromEnv('animationManager'),q=o.trackerElems||(o.trackerElems={}),r=a.shapeInfo,s=m.getFromEnv('toolTipController'),t=a.x,u=a.y,v=n.config.lastHoveredPoint,w=!1;return!1===a?(b=v&&v.shapeInfo.type,c=q[b],c&&c.hide(),void(n.config.lastHoveredPoint=null)):void(d={fill:TRACKER_FILL,stroke:TRACKER_FILL},b=r.type,'circle'===b&&(b='polygon'),c=q[b],'polygon'===b?(e=r.sides||1,f=r.startAngle,h=r.radius,!c&&(w=!0),c=o.trackerElems[b]=p.setAnimation({el:o.trackerElems[b]||'polypath',container:c,attr:Object.assign({polypath:[e,t,u,h,f]},d),component:m,label:'markers'})):'rect'===b?(g=r.width,j=r.height,!c&&(w=!0),c=o.trackerElems[b]=p.setAnimation({el:o.trackerElems[b]||'rect',container:c,attr:Object.assign({x:t,y:u,width:g,height:j},d),component:m,label:'markers'})):'arc'===b&&(i=l.markerShape.config.innerRadius,f=(360-l.markerShape.config.startAngle)*deg2rad,k=(360-l.markerShape.config.endAngle)*deg2rad,h=r.radius,!c&&(w=!0),c=o.trackerElems[b]=p.setAnimation({el:o.trackerElems[b]||'ringpath',container:c,attr:Object.assign({ringpath:[t,u,h,i,k,f]},d),component:m,label:'markers'})),n.config.lastHoveredPoint=a,w&&c.click(m.getClickFn()).hover(m.getHoverFn(),m.getHoverOutFn()),c.show().data('marker',l),s.enableToolTip(c,l.config.tooltext))}_drawConnectors(){let a,b,c,d,e,f,g,h,j=this,k=j.getFromEnv('chart'),l=k.config.annotationConfig,m=j.components,n=m.connectors||(j.components.connectors=[]),o=n.length,p=k.config.scalingParams,q=k.config.connectorOpts,r=q.showLabels,s=k.getChildren('mapAnnotations')[0],t=[],u=[],v=[];for(v.push({id:'connectorLabels',fillalpha:'100',items:u}),v.push({id:'connectors',fillalpha:'100',items:t}),s.addGroup(Object.assign(l,v[1]),j),s.addGroup(Object.assign(l,v[0]),j),b=0;b<o;b++)n[b]&&(g=n[b].config.fromMarker.config,h=n[b].config.toMarker.config,c=g.options.x,d=g.options.y,e=h.options.x,f=h.options.y,n[b].config.x=c,n[b].config.y=d,n[b].config.tox=e,n[b].config.toy=f,t.push(n[b].config),a=s.addItem('connectors',Object.assign({animationLabel:'markerItem'},n[b].config),!0,j),a.addEventListener('mouseover',n[b].config.onmouseover),a.addEventListener('mouseout',n[b].config.onmouseout),a.addEventListener('click',n[b].config.onclick),n[b].labelConfig&&r&&(n[b].labelConfig.x=((+c+ +e)/2).toString(),n[b].labelConfig.y=((+d+ +f)/2).toString(),n[b].labelConfig.fontsize=q.fontSize/(p.scaleFactor*k.config.baseScaleFactor),u.push(n[b].labelConfig),s.addItem('connectorLabels',Object.assign({animationLabel:'markerItem'},n[b].labelConfig),!0,j)))}getShapeArgs(){let a,b=this,c=b.config,d=extend2({},b.shapeObj);return c.autoScale=1,d?('polygon'===d.type?3>d.sides?d.type='circle':d.startangle=c.startAngle:'arc'===d.type&&(a=(d.radius||c.markerRadius)*c.autoScale,d.radius=a,d.innerradius=d.innerradius&&d.innerradius*c.autoScale||a*INNERRADIUSFACTOR),d):null}_getLabelOptions(a,b,c,d,e){let f,g,h,i=this,j=a&&a.toLowerCase();return i.getLabelAlignment[j]||(j='center'),g=+c.x,h=+c.y,f=d===UNDEF||e===UNDEF?c.radius||0:/^(top|bottom)$/ig.test(j)&&.5*e||/^(left|right)$/ig.test(j)&&.5*d||0,f=+f+ +b,i.getLabelAlignment[j](g,h,f)}addMarkerItem(a){let b,c,d,e,f,g,h=this,i=h.getFromEnv('chart'),j=a,k=h.components.markerObjs,l=h.components.shapeObjs,m=h.components.markerGroup,n=h.components.markerLabelGroup,o=i.getChildren('mapAnnotations')[0],p=h.getFromEnv('number-formatter'),q=i.config.markerOpts;if(g=j.id.toLowerCase()){if(k[g])return;delete j.value,h.imageLoadCount=0,b=Markers._initializeMarkerItem(g,j,null),b.dataset=h,f=b.config.options.shapeid,d=b.config,e=j.value,d.cleanValue=p.getCleanValue(e),a=d.options,d.formattedValue=null===d.cleanValue?UNDEF:p.dataLabels(e),d.fillColor=pluck(a.fillcolor,a.color,q.fillColor),d.fillAlpha=pluck(a.fillalpha,a.alpha,q.fillAlpha),d.fillRatio=pluck(a.fillratio,q.fillRatio),d.fillAngle=pluck(a.fillangle,q.fillAngle),d.borderThickness=pluckNumber(a.borderthickness,q.borderThickness),d.borderColor=pluck(a.bordercolor,q.borderColor),d.borderAlpha=pluck(a.borderalpha,q.borderAlpha),d.labelPadding=a.labelpadding||q.labelPadding,d.options.tooltext=pluck(a.tooltext,q.tooltext),d.link=a.link,f&&(b.shapeObj=l[f&&f.toLowerCase()]),k[g]=b,c=h._drawMarkerItem.call(b),m&&n&&(b.markerShape=c.markerShape&&o.addItem(m.getId(),Object.assign({align:'center',valign:'middle',animationLabel:'markerItem'},c.markerShape),!0,h),b.markerLabel=c.markerLabel&&o.addItem(n.getId(),Object.assign({animationLabel:'markerItem'},c.markerLabel),!0,h)),h._buildKdTree()}}updateMarkerItem(a,b){let c,d,e,f,g=this,h=g.getFromEnv('chart'),i=h.getChildren('mapAnnotations')[0],j=g.components.markerObjs,k=h.config.markerOpts,l={},m=j[a];if(m){for(d in c=m.config.options,extend2(c,b),g.imageLoadCount=0,e=m.config,b)l[d.toLowerCase()]=b[d]&&b[d].toString();e.fillColor=pluck(l.fillcolor,l.color,k.fillColor),e.fillAlpha=pluck(l.fillalpha,l.alpha,k.fillAlpha),e.fillRatio=pluck(l.fillratio,k.fillRatio),e.fillAngle=pluck(l.fillangle,k.fillAngle),e.borderThickness=pluckNumber(l.borderthickness,k.borderThickness),e.borderColor=pluck(l.bordercolor,k.borderColor),e.borderAlpha=pluck(l.borderalpha,k.borderAlpha),e.labelPadding=l.labelpadding||k.labelPadding,e.options.tooltext=pluck(l.tooltext,k.tooltext),e.link=l.link,f=g._drawMarkerItem.call(m).markerShape,g._buildKdTree(),i.update(a,f)}}_removeMarkerItem(a){let b,c,d=this,e=d.components,f=e.markerObjs,g=f[a],h=e.kdArrayMap;g&&(b=g.markerShape,c=g.markerLabel,b&&b.dispose(),c&&c.dispose(),delete h[a],d._buildKdTree()),delete f[a]}getElement(a){let b=this;if(b.components.kDTree)return b.components.kDTree.getNeighbour(a)}}export default Markers;