import MSCombi3D from'./mscombi3d';import Column3DDataset from'../_internal/datasets/column3d';import LineDataset from'../_internal/datasets/line';import Column3DGroup from'../_internal/datasets/groups/column.multiseries';class MSColumnLine3D extends MSCombi3D{static getName(){return'MSColumnLine3D'}constructor(){super(),this.defaultPlotShadow=1}getName(){return'MSColumnLine3D'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.is3D=!0,a.friendlyName='Multi-series Column and Line Chart',a.use3dlineshift=1,a.showplotborder=0,a.enablemousetracking=!0}getDSdef(a){return'line'===a?LineDataset:Column3DDataset}getDSGroupdef(a){return'column3d'===a?Column3DGroup:void 0}getDSType(a){return a&&'line'===a.toLowerCase()?'line':'column3d'}}export default MSColumnLine3D;