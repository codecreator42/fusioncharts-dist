import CartesianLabelManager from'./cartesian-label-manager';import{BLANKSTRING,extend2,parseUnsafeString,extent}from'../lib/lib.js';import range from'./utils/array/range';import LinearScale from'./scales/linear';import{setDataLimit,extractStyleInfo}from'./common-api';import domainUpdater from'./domain-updater';let UNDEF;class NumericAxis extends CartesianLabelManager{constructor(){super(),this.config.scale=new LinearScale}getName(){return'numeric'}generateTicks(){var a=Math.abs;let b,c,d,e=this.getScale(),f=this.config,g=f.numDivLines+1,[h,i]=e.getDomain(),j=f.axisRange,{min:k,max:l}=j,m=f.dataLimit;return h===k&&i===l?(domainUpdater(m.min,m.max,e,f),f.ticks):(b=e.ticks(g),c=a(b[1]-b[0]),h===k&&-1===b.indexOf(k)&&b.unshift(k),i===l&&-1===b.indexOf(l)&&b.push(l),(d=a(k%c))&&(k-=d),(d=a(l%c))&&(l-=d),f._allTicks=range(k,l,c).concat(l),j.tickInterval=c,b)}setTickValues(a){this.config.userTicks=a||[],this.config.tickValues={tickValue:[]}}_parseTickValues(a){var b,c,d,e,f=this,g=f.getFromEnv('chart'),h=f.config,i=a&&a.length,j=0;for(h.tickValues={},b=h.tickValues.tickValue=[],d=0;d<i;d+=1)if(c=extend2({},a[d]),e=+c.x,!c.vline){if(extractStyleInfo(c,g),e||0===e)c.x=e,h.irregularCatAxis=!0;else continue;b.push(c),b[j].label=parseUnsafeString(b[j].label),j+=1}h.oriCatLen=j}calculateTicksOnLabelMode(){var a,b,c,d,e,f,g,h=this,k=h.config,l=k.xAxisLabelMode,m=Object.assign([],k.userTicks),n=h.getFromEnv('number-formatter');if('mixed'===l||'auto'===l){if(b=[],a=n.xAxis,'mixed'===l)for(c=0,e=m.length;c<e;c+=1)b[m[c].x||m[c].y||c]=!0;else m=[];for(g=h.getAxisConfig(),f=k.ticks,d=0;d<f.length;++d)c=f[d],b[c]||m.push({label:BLANKSTRING+a.call(n,c),x:c,showverticalline:0===c?g.showZeroPlane:1,isNumeric:!0,linecolor:0===c?g.zeroPlaneColor:g.divLineColor,linealpha:0===c?g.zeroPlaneAlpha:g.divLineAlpha,linethickness:0===c?g.zeroPlaneThickness:g.divLineThickness,linedashed:g.divLineIsDashed,linedashLen:g.divLineDashLen,linedashgap:g.divLineDashGap})}h._parseTickValues(m)}getInterval(){return this.config.axisRange.tickInterval}_setAxisRange(a){var b,c,d,e=a.min,f=a.max,g=this.config,h=g.axisRange,i=g.dataLimit,j=g.dependentInfo;if(!(e>f))if((i.min!==e||i.max!==f)&&(c=!0),g.visibleMin!==UNDEF&&!g.setPadding&&!c)g.setPadding=!1;else{if([e,f]=extent([e,f,i.min,i.max]),i.min=e,i.max=f,this.fireEvent('dataLimitSet',Object.assign({},i)),j){if(j.limit)if(b=j.dataLimit,b)[e,f]=extent([e,f,b.min,b.max]),g.isDataLimitSet=!0;else return;if(j.count&&j.numDivLines===UNDEF)return}domainUpdater(e,f,this.getScale(),g),d=g.isZeroTickForced?3:2,this.fireEvent('divlinesSet',g.ticks.length-d),g.tickValues&&this.calculateTicksOnLabelMode(),this.setVisibleConfig(h.min,h.max)}}}NumericAxis.prototype.setDataLimit=setDataLimit;export default NumericAxis;