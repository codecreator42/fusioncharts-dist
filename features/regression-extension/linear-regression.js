function linearYOnX(a){a.sort(function(c,a){return parseFloat(c.x)-parseFloat(a.x)});let b,d,e,f,g=[],h=[],j=0,k=0,l=0,o=0,p=a.length,i=[];for(let b=0;b<a.length;b++)(e=+a[b].x,f=+a[b].y,!(isNaN(e)||isNaN(f)))&&(g.push(e),h.push(f));p=g.length;for(let b=0;b<p;b++)j+=g[b],k+=h[b];j/=p,k/=p;for(let b=0;b<p;b++)l+=(g[b]-j)*(h[b]-k),o+=(g[b]-j)*(g[b]-j);return 0==o?[[],[]]:(b=l/o,d=k-b*j,i.push({x:g[0],y:b*g[0]+d}),i.push({x:g[p-1],y:b*g[p-1]+d}),[[],i])}function linearXOnY(a){a.sort(function(c,a){return parseFloat(c.y)-parseFloat(a.y)});let b,d,e,f,g=[],h=[],j=0,k=0,l=0,o=0,p=a.length,i=[];for(let b=0;b<a.length;b++)(e=+a[b].x,f=+a[b].y,!(isNaN(e)||isNaN(f)))&&(g.push(e),h.push(f));p=g.length;for(let b=0;b<p;b++)j+=g[b],k+=h[b];j/=p,k/=p;for(let b=0;b<p;b++)l+=(g[b]-j)*(h[b]-k),o+=(h[b]-k)*(h[b]-k);return 0==o?[[],[]]:(b=l/o,d=j-b*k,i=[],i.push({x:b*h[0]+d,y:h[0]}),i.push({x:b*h[p-1]+d,y:h[p-1]}),[[],i])}export default function getLinearRegressionPoints(a,b){return+b?linearYOnX(a):linearXOnY(a)}