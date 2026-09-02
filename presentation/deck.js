const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Joey David';
pptx.subject = 'Master thesis defense';
pptx.title = 'Information Constraints in Fine-tuning and Reasoning Language Models';
pptx.company = 'PSL — IASD / LAMSADE';
pptx.lang = 'en-US';
pptx.theme = { headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'en-US' };
pptx.defineSlideMaster({
  title: 'LIGHT',
  background: { color: 'F7F8F6' },
  objects: [
    { line: { x: .48, y: 7.15, w: 12.35, h: 0, line: { color: 'D8DEDC', width: 1 } } },
    { text: { text: 'Joey David · IASD M2 · 2026', options: { x: .50, y: 7.19, w: 3.4, h: .16, fontSize: 7.8, color: '71807D', margin: 0 } } },
  ],
  slideNumber: { x: 12.48, y: 7.17, color: '71807D', fontFace: 'Aptos', fontSize: 8 },
  margin: 0,
});

const C = {
  navy: '142F45', navy2: '1D425C', ink: '17212B', teal: '1F8A8A', teal2: '6AB7B0',
  orange: 'D97745', orange2: 'F0B38E', red: 'B55353', green: '4D8F62',
  cream: 'F7F8F6', white: 'FFFFFF', pale: 'EEF2F0', pale2: 'E7EFEC', bluepale: 'E8F0F4',
  tealpale: 'E2F1EE', orangepale: 'F8EAE2', redpale: 'F6E7E7', mid: '65736F', line: 'D8DEDC', charcoal: '21313A'
};
const A = n => path.join(__dirname, 'assets', n);

function addTitle(s, title, kicker='', accent=C.teal) {
  if (kicker) s.addText(kicker.toUpperCase(), { x:.58, y:.34, w:3.6, h:.20, fontSize:8.8, bold:true, color:accent, charSpacing:1.0, margin:0 });
  s.addText(title, { x:.58, y:kicker?.61:.43, w:12.0, h:.58, fontSize:25.5, bold:true, color:C.ink, margin:0, breakLine:false });
}
function addSub(s, text, y=1.20) { s.addText(text, { x:.60, y, w:11.9, h:.33, fontSize:13.2, color:C.mid, margin:0 }); }
function box(s,x,y,w,h,fill=C.white,line=C.line,r=.10,shadow=true){
  s.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:r,fill:{color:fill},line:{color:line,width:1.05},shadow:shadow?{type:'outer',color:'A7B1AE',opacity:.10,blur:1.2,angle:45,distance:1}:undefined});
}
function pill(s,text,x,y,w,fill=C.pale,color=C.ink,size=10.4){
  s.addShape(pptx.ShapeType.roundRect,{x,y,w,h:.36,rectRadius:.08,fill:{color:fill},line:{color:fill}});
  s.addText(text,{x:x+.08,y:y+.07,w:w-.16,h:.19,fontSize:size,bold:true,color,align:'center',margin:0});
}
function arrow(s,x1,y1,x2,y2,color=C.mid,width=1.8){
  s.addShape(pptx.ShapeType.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width,endArrowType:'triangle'}});
}
function img(s,name,x,y,w,h){ s.addImage({path:A(name),x,y,w,h}); }
function eq(s,text,x,y,w,h,size=25,color=C.navy,align='center'){
  s.addText(text,{x,y,w,h,fontFace:'Cambria Math',fontSize:size,color,bold:false,align,margin:0,valign:'mid',fit:'shrink'});
}
function label(s,text,x,y,w,color=C.mid,size=10.5,align='left'){ s.addText(text,{x,y,w,h:.22,fontSize:size,bold:true,color,margin:0,align}); }
function metric(s,value,labelText,x,y,w,color=C.teal){
  s.addText(value,{x,y,w,h:.50,fontSize:27,bold:true,color,align:'center',margin:0});
  s.addText(labelText,{x,y:y+.53,w,h:.40,fontSize:10.7,color:C.mid,align:'center',margin:0,valign:'mid'});
}
function sectionDivider(n,title,subtitle,accent=C.teal,bg=C.navy){
  const s=pptx.addSlide(); s.background={color:bg};
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:bg},line:{color:bg}});
  s.addShape(pptx.ShapeType.ellipse,{x:9.35,y:-1.1,w:5.2,h:5.2,fill:{color:accent,transparency:82},line:{color:accent,transparency:100}});
  s.addShape(pptx.ShapeType.ellipse,{x:10.7,y:4.65,w:3.3,h:3.3,fill:{color:accent,transparency:90},line:{color:accent,transparency:100}});
  s.addText(String(n).padStart(2,'0'),{x:.78,y:1.02,w:1.4,h:.65,fontSize:36,bold:true,color:accent,margin:0});
  s.addText(title,{x:.80,y:2.02,w:9.8,h:.86,fontSize:34,bold:true,color:C.white,margin:0});
  s.addText(subtitle,{x:.84,y:3.12,w:8.8,h:.46,fontSize:18,color:'CAD6DB',margin:0});
  s.addShape(pptx.ShapeType.line,{x:.84,y:4.18,w:4.1,h:0,line:{color:accent,width:3.0}});
  return s;
}
function miniBullet(s,text,x,y,w,color=C.ink,size=15){
  s.addShape(pptx.ShapeType.ellipse,{x,y:y+.09,w:.10,h:.10,fill:{color:C.teal},line:{color:C.teal}});
  s.addText(text,{x:x+.20,y,w:w-.20,h:.28,fontSize:size,color,margin:0});
}

// 1 — title
{
  const s=pptx.addSlide(); s.background={color:C.navy};
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:C.navy},line:{color:C.navy}});
  s.addShape(pptx.ShapeType.arc,{x:8.55,y:.40,w:4.40,h:4.40,adjustPoint:.25,rotate:18,fill:{color:C.teal,transparency:84},line:{color:C.teal,transparency:100}});
  s.addShape(pptx.ShapeType.ellipse,{x:10.65,y:4.80,w:2.25,h:2.25,fill:{color:C.orange,transparency:87},line:{color:C.orange,transparency:100}});
  s.addText('Information Constraints\nin Fine-tuning and Reasoning',{x:.84,y:1.25,w:9.9,h:1.45,fontSize:31.5,bold:true,color:C.white,margin:0});
  s.addText('How many bits preserve useful behavior — for a particular receiver?',{x:.88,y:3.03,w:9.2,h:.45,fontSize:18,color:'CDD9DE',margin:0});
  pill(s,'FINE-TUNING',.88,4.10,1.75,C.teal,C.white,10.8);
  pill(s,'REASONING STATE',2.84,4.10,2.18,'274B63',C.white,10.8);
  pill(s,'RECEIVER-RELATIVE',5.25,4.10,2.35,'274B63',C.white,10.8);
  s.addText('Joey David',{x:.88,y:5.72,w:2.3,h:.28,fontSize:15.5,bold:true,color:C.white,margin:0});
  s.addText('IASD M2 · PSL · LAMSADE / MILES',{x:.88,y:6.08,w:4.7,h:.26,fontSize:11.5,color:'AFC0C8',margin:0});
  s.addText('Paul Caillon · Alexandre Allauzen',{x:.88,y:6.43,w:4.3,h:.24,fontSize:10.5,color:'8DA4AF',margin:0});
}

// 2 — framing, one question two channels
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'One question — two information channels','framing');
  s.addText('same pattern',{x:5.58,y:1.54,w:2.15,h:.28,fontSize:15,bold:true,color:C.navy,align:'center',margin:0});
  s.addShape(pptx.ShapeType.line,{x:6.65,y:1.87,w:0,h:3.95,line:{color:C.line,width:1.2,dash:'dash'}});
  label(s,'TRAINING TIME',.92,1.72,2.0,C.teal,11.5); label(s,'INFERENCE TIME',7.22,1.72,2.0,C.orange,11.5);
  box(s,.82,2.14,5.18,3.48,C.white); box(s,7.33,2.14,5.18,3.48,C.white);
  box(s,1.16,2.72,1.44,.84,C.bluepale,'BED0D8',.08,false); s.addText('base\nmodel',{x:1.31,y:2.91,w:1.14,h:.40,fontSize:14.5,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('+',{x:2.78,y:2.94,w:.28,h:.30,fontSize:23,bold:true,color:C.mid,align:'center',margin:0});
  box(s,3.26,2.72,1.56,.84,C.tealpale,'ACD4CF',.08,false); s.addText('adapter\nbits',{x:3.43,y:2.91,w:1.22,h:.40,fontSize:14.5,bold:true,color:C.teal,align:'center',margin:0});
  arrow(s,4.98,3.14,5.55,3.14,C.mid,2.0); s.addText('behavior',{x:4.82,y:3.58,w:.94,h:.24,fontSize:12.5,bold:true,color:C.green,align:'center',margin:0});
  eq(s,'rate × receiver × utility',1.27,4.45,4.15,.48,19,C.navy);
  box(s,7.72,2.72,1.64,.84,C.orangepale,'E8C2AD',.08,false); s.addText('reasoning\nhistory',{x:7.88,y:2.91,w:1.32,h:.40,fontSize:14.5,bold:true,color:C.orange,align:'center',margin:0});
  arrow(s,9.55,3.14,10.12,3.14,C.mid,2.0); box(s,10.28,2.72,1.36,.84,C.tealpale,'ACD4CF',.08,false); s.addText('state\ncode',{x:10.42,y:2.91,w:1.08,h:.40,fontSize:14.5,bold:true,color:C.teal,align:'center',margin:0});
  arrow(s,11.80,3.14,12.18,3.14,C.mid,2.0); s.addText('future',{x:11.77,y:3.58,w:.60,h:.24,fontSize:12.5,bold:true,color:C.green,align:'center',margin:0});
  eq(s,'state × update rule × utility',7.75,4.45,4.22,.48,19,C.navy);
  pill(s,'USEFUL INFORMATION = RELATIVE',4.80,6.28,3.75,C.navy,C.white,11.1);
}

// 3 — trajectory as narrative
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'The internship moved by falsification','research trajectory'); addSub(s,'Each failed proxy forced a sharper operational question');
  const xs=[.85,3.26,5.67,8.08,10.49];
  const tops=[['APR','read'],['MAY','measure'],['JUN','segment'],['JUL','intervene'],['AUG','unify']];
  const fails=['rank ≠ bits','RMSE ≠ utility','boundary ≠ state','decode ≠ reuse','intrinsic ≠ useful'];
  for(let i=0;i<5;i++){
    s.addText(tops[i][0],{x:xs[i],y:2.02,w:1.95,h:.24,fontSize:10.5,bold:true,color:i===4?C.teal:C.mid,align:'center',margin:0});
    s.addShape(pptx.ShapeType.ellipse,{x:xs[i]+.72,y:2.52,w:.50,h:.50,fill:{color:i===4?C.teal:C.navy},line:{color:i===4?C.teal:C.navy}});
    s.addText(String(i+1),{x:xs[i]+.72,y:2.61,w:.50,h:.22,fontSize:12,bold:true,color:C.white,align:'center',margin:0});
    if(i<4) s.addShape(pptx.ShapeType.line,{x:xs[i]+1.22,y:2.77,w:1.19,h:0,line:{color:C.line,width:3}});
    s.addText(tops[i][1],{x:xs[i],y:3.23,w:1.95,h:.30,fontSize:17,bold:true,color:C.ink,align:'center',margin:0});
    box(s,xs[i]-.08,4.17,2.11,1.30,i===4?C.tealpale:C.white,i===4?'B1D7D2':C.line,.08,false);
    s.addText(fails[i],{x:xs[i]+.07,y:4.52,w:1.81,h:.35,fontSize:14,bold:true,color:i===4?C.teal:C.red,align:'center',margin:0});
  }
  s.addText('→',{x:5.78,y:5.86,w:1.72,h:.40,fontSize:24,bold:true,color:C.orange,align:'center',margin:0});
  s.addText('receiver-relative utility',{x:4.45,y:6.30,w:4.38,h:.36,fontSize:19,bold:true,color:C.navy,align:'center',margin:0});
}

// 4 — part I divider
sectionDivider(1,'Fine-tuning as communication','One fixed update · one frozen decoder · an explicit bit budget',C.teal,C.navy);

// 5 — LoRA theory
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'LoRA gives a clean sender–receiver split','theory'); addSub(s,'Shared decoder frozen · small learned object transmitted');
  box(s,.72,1.72,4.68,4.78,C.white);
  label(s,'LOW-RANK UPDATE',1.04,2.05,2.0,C.teal,11.2);
  eq(s,"W′ = W + ΔW",1.03,2.52,4.00,.56,27,C.navy);
  eq(s,'ΔW = (α / r) · B A',1.03,3.28,4.00,.56,26,C.teal);
  s.addText('A  ∈  ℝʳˣᵈⁱⁿ',{x:1.20,y:4.32,w:1.55,h:.30,fontFace:'Cambria Math',fontSize:15,color:C.ink,margin:0});
  s.addText('B  ∈  ℝᵈᵒᵘᵗˣʳ',{x:3.00,y:4.32,w:1.78,h:.30,fontFace:'Cambria Math',fontSize:15,color:C.ink,margin:0});
  pill(s,'r ≪ d',2.08,5.22,1.50,C.tealpale,C.teal,12);
  s.addText('geometry constraint',{x:1.80,y:5.76,w:2.10,h:.30,fontSize:14,bold:true,color:C.mid,align:'center',margin:0});

  label(s,'COMMUNICATION VIEW',6.06,2.05,2.2,C.orange,11.2);
  box(s,6.00,2.52,1.72,.96,C.bluepale,'B9CDD5',.08,false); s.addText('frozen W',{x:6.16,y:2.83,w:1.40,h:.28,fontSize:17,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('+',{x:7.95,y:2.77,w:.30,h:.34,fontSize:26,bold:true,color:C.mid,align:'center',margin:0});
  box(s,8.52,2.52,1.82,.96,C.tealpale,'A9D4CF',.08,false); s.addText('message',{x:8.70,y:2.83,w:1.46,h:.28,fontSize:17,bold:true,color:C.teal,align:'center',margin:0});
  arrow(s,10.55,3.00,11.45,3.00,C.mid,2.3);
  box(s,11.60,2.52,1.02,.96,C.orangepale,'E6BDA6',.08,false); s.addText('task',{x:11.72,y:2.83,w:.78,h:.28,fontSize:16,bold:true,color:C.orange,align:'center',margin:0});
  miniBullet(s,'base model = side information',6.15,4.25,5.95,C.ink,16);
  miniBullet(s,'adapter = transmitted description',6.15,4.85,5.95,C.ink,16);
  miniBullet(s,'behavior = reconstruction target',6.15,5.45,5.95,C.ink,16);
}

// 6 — rate vs rank
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Rank is geometry — not information','first methodological correction');
  s.addText('r = 16',{x:1.02,y:1.86,w:2.0,h:.60,fontSize:35,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('same subspace dimension',{x:.90,y:2.54,w:2.24,h:.30,fontSize:13.5,bold:true,color:C.mid,align:'center',margin:0});
  arrow(s,3.38,2.18,4.14,2.18,C.mid,2.4);
  const bs=[['8-bit',C.bluepale,C.navy],['4-bit',C.tealpale,C.teal],['2-bit',C.orangepale,C.orange],['1-bit',C.redpale,C.red]];
  bs.forEach((b,i)=>{box(s,4.35+i*1.64,1.69,1.33,1.00,b[1],b[1],.07,false);s.addText(b[0],{x:4.49+i*1.64,y:2.00,w:1.05,h:.26,fontSize:16,bold:true,color:b[2],align:'center',margin:0});});
  s.addText('same r · different descriptions',{x:5.13,y:2.95,w:4.10,h:.34,fontSize:18,bold:true,color:C.ink,align:'center',margin:0});

  box(s,.90,3.98,11.55,1.72,C.white);
  label(s,'PARAMETER COUNT',1.18,4.28,2.00,C.mid,10.5); eq(s,'|θLoRA| = r(din + dout)',1.18,4.68,4.20,.54,19,C.navy,'left');
  s.addShape(pptx.ShapeType.line,{x:6.02,y:4.25,w:0,h:1.12,line:{color:C.line,width:1}});
  label(s,'SERIALIZED RATE',6.34,4.28,1.95,C.teal,10.5); eq(s,'R = 8 · file bytes / #adapter values',6.34,4.68,5.45,.54,19,C.teal,'left');
  pill(s,'measure the message actually sent',4.50,6.14,4.30,C.navy,C.white,11.3);
}

// 7 — rate distortion + operational point
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Rate only means something with a distortion','rate–distortion'); addSub(s,'Here: distortion = lost behavior after reloading the compressed adapter');
  box(s,.74,1.72,5.35,4.67,C.navy,C.navy,.10,false);
  label(s,'GENERAL IDEA',1.10,2.08,2.0,'8ECAC4',11.2);
  eq(s,'R*(τ) = min  R(c)',1.05,2.60,4.70,.58,26,C.white);
  eq(s,'subject to   Retain(c) ≥ τ',1.05,3.40,4.70,.58,23,'DCE8EB');
  s.addText('c = codec / representation',{x:1.18,y:4.40,w:4.2,h:.30,fontSize:14,color:'BFD0D7',margin:0});
  s.addText('τ = required utility',{x:1.18,y:4.88,w:4.2,h:.30,fontSize:14,color:'BFD0D7',margin:0});
  pill(s,'τ = 0.90',2.18,5.54,2.05,C.teal,C.white,12);

  s.addShape(pptx.ShapeType.line,{x:7.04,y:5.72,w:4.63,h:0,line:{color:C.mid,width:1.4}});
  s.addShape(pptx.ShapeType.line,{x:7.04,y:5.72,w:0,h:-3.33,line:{color:C.mid,width:1.4}});
  const pts=[[7.48,5.25],[8.08,4.82],[8.82,4.25],[9.64,3.30],[10.46,2.80],[11.36,2.58]];
  for(let i=0;i<pts.length-1;i++) s.addShape(pptx.ShapeType.line,{x:pts[i][0],y:pts[i][1],w:pts[i+1][0]-pts[i][0],h:pts[i+1][1]-pts[i][1],line:{color:C.teal,width:3.1}});
  pts.forEach(p=>s.addShape(pptx.ShapeType.ellipse,{x:p[0]-.07,y:p[1]-.07,w:.14,h:.14,fill:{color:C.teal},line:{color:C.teal}}));
  s.addShape(pptx.ShapeType.line,{x:7.04,y:3.05,w:4.63,h:0,line:{color:C.orange,width:1.6,dash:'dash'}});
  s.addShape(pptx.ShapeType.line,{x:9.83,y:5.72,w:0,h:-2.67,line:{color:C.orange,width:1.6,dash:'dash'}});
  s.addText('90%',{x:6.50,y:2.91,w:.46,h:.22,fontSize:11,bold:true,color:C.orange,align:'right',margin:0});
  s.addText('R*',{x:9.57,y:5.86,w:.54,h:.24,fontSize:15,bold:true,color:C.orange,align:'center',margin:0});
  s.addText('serialized rate →',{x:9.65,y:6.24,w:1.85,h:.23,fontSize:10.5,color:C.mid,margin:0});
  s.addText('retained gain',{x:6.16,y:3.70,w:1.00,h:.24,fontSize:10.5,color:C.mid,rotate:270,align:'center',margin:0});
}

// 8 — hypothesis map
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'What should determine the required rate?','hypothesis map'); addSub(s,'Five candidates · one by one');
  const cx=6.66, cy=3.83;
  s.addShape(pptx.ShapeType.ellipse,{x:5.42,y:2.86,w:2.48,h:1.78,fill:{color:C.navy},line:{color:C.navy}});
  s.addText('R*(0.90)',{x:5.74,y:3.50,w:1.85,h:.42,fontSize:24,bold:true,color:C.white,align:'center',margin:0});
  const items=[
    [1.06,1.90,2.62,.92,'LoRA rank','geometry'],[1.06,4.90,2.62,.92,'weight RMSE','reconstruction'],
    [9.65,1.90,2.62,.92,'dataset size','source'],[9.65,4.90,2.62,.92,'learned gain','magnitude'],
    [5.16,5.62,3.00,.92,'receiver-relative correction','conditional']
  ];
  items.forEach((it,i)=>{const good=i===4;box(s,it[0],it[1],it[2],it[3],good?C.tealpale:C.white,good?'ADD6D1':C.line,.08,false);s.addText(it[4],{x:it[0]+.12,y:it[1]+.17,w:it[2]-.24,h:.28,fontSize:16,bold:true,color:good?C.teal:C.ink,align:'center',margin:0});s.addText(it[5],{x:it[0]+.12,y:it[1]+.52,w:it[2]-.24,h:.20,fontSize:10.5,color:C.mid,align:'center',margin:0});});
  arrow(s,3.72,2.37,5.33,3.36,C.line,1.8); arrow(s,3.72,5.32,5.32,4.27,C.line,1.8); arrow(s,9.62,2.37,7.98,3.36,C.line,1.8); arrow(s,9.62,5.32,7.98,4.27,C.line,1.8); arrow(s,6.66,5.56,6.66,4.68,C.teal,2.3);
}

// 9 — weight error negative
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Lower weight error can preserve less behavior','negative result'); addSub(s,'Adaptive allocation beat uniform coding in RMSE — and lost on utility');
  label(s,'WEIGHT SPACE',.92,1.80,1.60,C.mid,10.8);
  s.addShape(pptx.ShapeType.line,{x:1.05,y:5.82,w:4.45,h:0,line:{color:C.mid,width:1.2}}); s.addShape(pptx.ShapeType.line,{x:1.05,y:5.82,w:0,h:-3.45,line:{color:C.mid,width:1.2}});
  const pts=[[1.46,5.28],[2.18,4.63],[2.97,4.04],[3.82,3.35],[4.72,3.04]];
  for(let i=0;i<pts.length-1;i++) s.addShape(pptx.ShapeType.line,{x:pts[i][0],y:pts[i][1],w:pts[i+1][0]-pts[i][0],h:pts[i+1][1]-pts[i][1],line:{color:C.navy,width:2.6}});
  pts.forEach(p=>s.addShape(pptx.ShapeType.ellipse,{x:p[0]-.07,y:p[1]-.07,w:.14,h:.14,fill:{color:C.navy},line:{color:C.navy}}));
  s.addShape(pptx.ShapeType.ellipse,{x:2.43,y:3.43,w:.25,h:.25,fill:{color:C.orange},line:{color:C.orange}}); s.addText('lower RMSE',{x:2.06,y:3.08,w:1.15,h:.22,fontSize:10.5,bold:true,color:C.orange,margin:0});
  arrow(s,5.86,3.96,6.80,3.96,C.mid,2.6);
  label(s,'BEHAVIOR SPACE',7.16,1.80,1.72,C.mid,10.8);
  box(s,7.18,2.24,5.07,3.58,C.white);
  metric(s,'↓','weight error',7.65,2.88,1.70,C.green); metric(s,'↓↓','retained gain',10.00,2.88,1.70,C.red); arrow(s,9.42,3.38,9.76,3.38,C.mid,2.3);
  pill(s,'wrong distortion',8.62,4.68,2.33,C.redpale,C.red,11.2);
  s.addText('functional importance  ≠  Euclidean importance',{x:3.06,y:6.38,w:7.22,h:.35,fontSize:19.5,bold:true,color:C.navy,align:'center',margin:0});
}

// 10 — data scaling
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'More distinct content usually needs more bits','data intervention'); addSub(s,'Optimizer steps fixed · example presentations fixed');
  img(s,'distinct_rate.png',.63,1.62,7.65,4.76);
  box(s,8.54,1.92,3.88,3.74,C.white);
  metric(s,'0.78','R² · log₂ distinct examples',8.88,2.37,3.20,C.teal);
  s.addShape(pptx.ShapeType.line,{x:9.16,y:3.63,w:2.64,h:0,line:{color:C.line,width:1}});
  miniBullet(s,'signal survives compute matching',8.92,3.95,3.05,C.ink,14.5);
  miniBullet(s,'not perfectly monotone',8.92,4.50,3.05,C.ink,14.5);
  miniBullet(s,'diversity ≠ count',8.92,5.05,3.05,C.ink,14.5);
  pill(s,'useful proxy · not a law',8.86,5.88,3.12,C.orangepale,C.orange,10.7);
}

// 11 — confound bridge
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Could the data trend just be larger learned gain?','confound check'); addSub(s,'Two interventions change gain without changing the underlying content');
  s.addText('More diverse data',{x:1.04,y:2.07,w:2.70,h:.40,fontSize:23,bold:true,color:C.navy,align:'center',margin:0});
  arrow(s,3.82,2.28,5.08,2.28,C.mid,2.2);
  box(s,5.25,1.75,2.88,1.10,C.orangepale,'E5BCA5',.08,false); s.addText('larger learned gain?',{x:5.48,y:2.08,w:2.42,h:.34,fontSize:18,bold:true,color:C.orange,align:'center',margin:0});
  arrow(s,8.30,2.28,9.45,2.28,C.mid,2.2); s.addText('more bits',{x:9.62,y:2.08,w:2.05,h:.40,fontSize:23,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('TWO CONTROLS',{x:5.32,y:3.34,w:2.68,h:.34,fontSize:11,bold:true,color:C.mid,charSpacing:.8,align:'center',margin:0});
  box(s,2.00,4.07,4.28,1.62,C.white); label(s,'STYLE REWRITE CONTROL',2.35,4.38,2.12,C.teal,10.5);
  s.addText('gain  0.555 → 1.062',{x:2.36,y:4.82,w:3.50,h:.30,fontSize:18,bold:true,color:C.ink,margin:0});
  s.addText('R*    0.684 → 0.763',{x:2.36,y:5.21,w:3.50,h:.30,fontSize:18,bold:true,color:C.teal,margin:0});
  box(s,7.04,4.07,4.28,1.62,C.white); label(s,'OPTIMIZER BUDGET CONTROL',7.39,4.38,2.60,C.orange,10.5);
  s.addText('16× training budget',{x:7.40,y:4.82,w:3.48,h:.30,fontSize:18,bold:true,color:C.ink,margin:0});
  s.addText('no matching rate rise',{x:7.40,y:5.21,w:3.48,h:.30,fontSize:18,bold:true,color:C.red,margin:0});
  pill(s,'gain alone ≠ required rate',3.74,6.30,3.52,C.navy,C.white,11.1);
  pill(s,'next → intrinsic corpus cost?',7.46,6.30,2.90,C.pale,C.navy,10.6);
}

// 12 — receiver dependence
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'The same corpus has no intrinsic adapter cost','receiver test'); addSub(s,'Only the frozen receiver changes');
  img(s,'receiver_dependence.png',.56,1.62,7.77,4.78);
  box(s,8.58,1.83,3.90,4.14,C.white);
  label(s,'CONDITIONAL DESCRIPTION',8.95,2.18,2.95,C.teal,10.7,'center');
  s.addText('same dataset',{x:9.08,y:2.82,w:2.68,h:.30,fontSize:18,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('↓',{x:10.02,y:3.26,w:.80,h:.32,fontSize:21,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('different base model',{x:9.08,y:3.69,w:2.68,h:.30,fontSize:18,bold:true,color:C.teal,align:'center',margin:0});
  s.addText('↓',{x:10.02,y:4.13,w:.80,h:.32,fontSize:21,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('reordered R*',{x:9.08,y:4.56,w:2.68,h:.30,fontSize:18,bold:true,color:C.orange,align:'center',margin:0});
  pill(s,'receiver-relative',9.23,5.25,2.38,C.navy,C.white,11.2);
}

// 13 — correction geometry theory
{
  const s=pptx.addSlide(); s.background={color:C.charcoal};
  s.addText('What does this receiver need to correct?',{x:.72,y:.68,w:11.55,h:.58,fontSize:27,bold:true,color:C.white,margin:0});
  s.addText('model-relative hypothesis',{x:.74,y:1.36,w:3.4,h:.24,fontSize:10.5,bold:true,color:C.teal2,charSpacing:1.0,margin:0});
  eq(s,'gᵢₜ = hᵢₜ ⊗ (pᵢₜ − eᵧ)',.92,2.16,5.25,.72,28,C.white);
  s.addText('representation',{x:1.56,y:3.05,w:1.72,h:.28,fontSize:13,bold:true,color:C.teal2,align:'center',margin:0});
  s.addText('prediction error',{x:4.08,y:3.05,w:1.72,h:.28,fontSize:13,bold:true,color:C.orange2,align:'center',margin:0});
  arrow(s,3.22,3.30,3.22,3.90,'748C96',1.6); arrow(s,4.92,3.30,4.92,3.90,'748C96',1.6);
  box(s,.96,4.06,5.15,1.12,'2A3D46','435862',.08,false); s.addText('requested correction directions',{x:1.28,y:4.42,w:4.52,h:.34,fontSize:18,bold:true,color:'DDE7EA',align:'center',margin:0});

  s.addShape(pptx.ShapeType.line,{x:6.67,y:1.83,w:0,h:4.44,line:{color:'526872',width:1.2}});
  label(s,'SPECTRAL SUMMARY',7.18,2.04,2.5,C.orange2,10.8);
  eq(s,'F = (1/n) GᵀG',7.16,2.57,4.60,.60,24,'E4ECEF','left');
  eq(s,'Icorr(D;M) = log det(I + F)',7.16,3.47,5.10,.65,25,C.teal2,'left');
  eq(s,'=  Σⱼ log(1 + λⱼ(F))',7.16,4.23,5.10,.60,22,'E4ECEF','left');
  pill(s,'large + many independent directions',7.30,5.32,4.12,'35525B','DDE7EA',11);
  s.addText('depends on dataset D  ×  model M',{x:7.42,y:5.95,w:3.85,h:.32,fontSize:16,bold:true,color:C.orange2,margin:0});
}

// 14 — predictor result
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Correction geometry is the strongest current signal','model-relative screen'); addSub(s,'22 model–dataset conditions · 7 task families');
  img(s,'correction_predictor.png',.56,1.64,7.82,4.72);
  box(s,8.62,1.90,3.86,4.20,C.white);
  metric(s,'ρ = 0.764','within-model ordering',8.92,2.36,3.25,C.teal);
  s.addShape(pptx.ShapeType.line,{x:9.10,y:3.55,w:2.90,h:0,line:{color:C.line,width:1}});
  s.addText('adjusted p = 0.00034',{x:9.05,y:3.91,w:2.98,h:.30,fontSize:15,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('held-out RMSE = 0.187',{x:9.05,y:4.38,w:2.98,h:.30,fontSize:15,bold:true,color:C.ink,align:'center',margin:0});
  pill(s,'hypothesis · not scaling law',8.95,5.26,3.20,C.orangepale,C.orange,10.7);
}

// 15 — part I synthesis
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Part I — the surviving claim','synthesis');
  const y0=1.72;
  const steps=[
    ['rank','parameter geometry',C.red],['weight RMSE','Euclidean distortion',C.red],['dataset size','source proxy',C.orange],['learned gain','behavior magnitude',C.red],['receiver-relative corrections','conditional demand',C.teal]
  ];
  steps.forEach((st,i)=>{
    const x=.92+i*2.45; const h= i===4 ? 2.38 : 1.74; const y=i===4 ? y0 : y0+.32;
    box(s,x,y,2.12,h,i===4?C.tealpale:C.white,i===4?'AAD4CF':C.line,.08,false);
    s.addText(st[0],{x:x+.13,y:y+.31,w:1.86,h:.33,fontSize:i===4?15.5:16,bold:true,color:st[2],align:'center',margin:0});
    s.addText(st[1],{x:x+.14,y:y+.84,w:1.84,h:.52,fontSize:12.5,color:C.mid,align:'center',margin:0,valign:'mid'});
    if(i<4){s.addText('×',{x:x+.82,y:y+1.37,w:.48,h:.34,fontSize:21,bold:true,color:st[2],align:'center',margin:0});arrow(s,x+2.16,y+.88,x+2.36,y+.88,C.line,1.6);} else {s.addText('✓',{x:x+.82,y:y+1.58,w:.48,h:.34,fontSize:21,bold:true,color:C.green,align:'center',margin:0});}
  });
  s.addText('Operational lesson',{x:1.05,y:5.12,w:2.40,h:.28,fontSize:11,bold:true,color:C.teal,margin:0});
  s.addText('Count bits in a reloadable update · score distortion at the receiver output',{x:1.05,y:5.58,w:10.95,h:.48,fontSize:21,bold:true,color:C.navy,margin:0});
  pill(s,'now ask the analogous question inside reasoning',4.17,6.36,5.00,C.navy,C.white,11.0);
}

// 16 — part II divider
sectionDivider(2,'Reasoning as a state channel','Can a long chain of thought be replaced by compact reusable states?',C.orange,'3A2A27');

// 17 — solution object hypothesis
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Hypothesis: reasoning contains “solution objects”','candidate latent decomposition'); addSub(s,'Short states · stable semantics · reusable downstream');
  const facts=[[.88,5.14,1.82,.78,'fact A'],[3.02,5.14,1.82,.78,'fact B'],[5.16,5.14,1.82,.78,'relation']];
  facts.forEach(f=>{box(s,f[0],f[1],f[2],f[3],C.pale,C.line,.08,false);s.addText(f[4],{x:f[0]+.12,y:f[1]+.24,w:f[2]-.24,h:.26,fontSize:15,bold:true,color:C.ink,align:'center',margin:0});});
  box(s,2.02,3.43,2.32,.90,C.tealpale,'ADD6D0',.08,false); s.addText('intermediate claim',{x:2.22,y:3.72,w:1.92,h:.28,fontSize:15,bold:true,color:C.teal,align:'center',margin:0});
  box(s,5.22,3.43,2.32,.90,C.tealpale,'ADD6D0',.08,false); s.addText('intermediate claim',{x:5.42,y:3.72,w:1.92,h:.28,fontSize:15,bold:true,color:C.teal,align:'center',margin:0});
  box(s,3.66,1.90,2.58,.94,'D7EFEB','A9D4CF',.08,false); s.addText('answer state',{x:3.94,y:2.21,w:2.02,h:.28,fontSize:17,bold:true,color:C.navy,align:'center',margin:0});
  arrow(s,1.80,5.12,2.75,4.37,C.mid,1.6); arrow(s,3.94,5.12,3.58,4.37,C.mid,1.6); arrow(s,6.08,5.12,6.30,4.37,C.mid,1.6); arrow(s,3.18,3.40,4.55,2.87,C.mid,1.6); arrow(s,6.30,3.40,5.36,2.87,C.mid,1.6);
  box(s,8.52,1.88,3.75,4.04,C.white);
  label(s,'WHAT “NATURAL” SHOULD MEAN',8.88,2.24,3.00,C.orange,10.5,'center');
  miniBullet(s,'boundaries align',8.98,2.92,2.90,C.ink,15);
  miniBullet(s,'operations cluster',8.98,3.48,2.90,C.ink,15);
  miniBullet(s,'correctness localizes',8.98,4.04,2.90,C.ink,15);
  miniBullet(s,'states transfer',8.98,4.60,2.90,C.ink,15);
  pill(s,'one partition?',9.35,5.28,2.17,C.orangepale,C.orange,11);
}

// 18 — objective relative boundary
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Boundaries are easy to decode — but objective-specific','objective-relative structure');
  img(s,'objective_auc.png',.58,1.60,7.60,4.58);
  box(s,8.42,1.78,4.05,4.33,C.white);
  label(s,'CROSS-OBJECTIVE AGREEMENT',8.80,2.18,3.28,C.orange,10.8,'center');
  metric(s,'0.10–0.29','F1 within ±4 tokens',8.88,2.64,3.10,C.orange);
  s.addShape(pptx.ShapeType.line,{x:8.90,y:3.80,w:3.05,h:0,line:{color:C.line,width:1}});
  s.addText('Answer boundary  ≠  compression boundary',{x:8.88,y:4.20,w:3.10,h:.60,fontSize:15.5,bold:true,color:C.ink,align:'center',margin:0,valign:'mid'});
  pill(s,'decodable ≠ canonical',9.04,5.31,2.78,C.navy,C.white,10.8);
}

// 19 — decode -> reuse bridge
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'A stronger ladder: decode → compose → recurse','causal criterion'); addSub(s,'Each step is strictly harder');
  const xs=[1.02,4.53,8.04]; const names=[['1','DECODE','state readable'],['2','COMPOSE','state usable once'],['3','CLOSED LOOP','state self-sustaining']];
  names.forEach((n,i)=>{
    const active=i===2;
    s.addShape(pptx.ShapeType.ellipse,{x:xs[i]+.62,y:1.90,w:.74,h:.74,fill:{color:i===0?C.teal:(i===1?C.orange:C.navy)},line:{color:i===0?C.teal:(i===1?C.orange:C.navy)}});
    s.addText(n[0],{x:xs[i]+.62,y:2.10,w:.74,h:.26,fontSize:16,bold:true,color:C.white,align:'center',margin:0});
    box(s,xs[i],2.90,2.98,2.42,active?C.bluepale:C.white,active?'B8CBD6':C.line,.10,false);
    s.addText(n[1],{x:xs[i]+.24,y:3.28,w:2.50,h:.32,fontSize:18,bold:true,color:i===0?C.teal:(i===1?C.orange:C.navy),align:'center',margin:0});
    s.addText(n[2],{x:xs[i]+.30,y:3.93,w:2.38,h:.34,fontSize:15,color:C.ink,align:'center',margin:0});
    s.addText(i===0?'probe / classifier':(i===1?'handoff test':'iterated update'),{x:xs[i]+.30,y:4.48,w:2.38,h:.30,fontSize:12.5,bold:true,color:C.mid,align:'center',margin:0});
    if(i<2) arrow(s,xs[i]+3.08,4.11,xs[i+1]-.10,4.11,C.line,2.3);
  });
  s.addText('information in a snapshot',{x:1.30,y:5.85,w:2.48,h:.28,fontSize:13,bold:true,color:C.teal,align:'center',margin:0});
  arrow(s,3.90,6.02,9.46,6.02,C.mid,1.7);
  s.addText('memory under an update rule',{x:9.23,y:5.85,w:2.58,h:.28,fontSize:13,bold:true,color:C.navy,align:'center',margin:0});
}

// 20 — snapshot info not memory
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Matched snapshot information can diverge in closed loop','finite control'); addSub(s,'Same support · same mutual information · same leakage');
  img(s,'snapshot_regret.png',.62,1.66,7.28,4.58);
  box(s,8.22,1.87,4.16,4.16,C.white);
  label(s,'MATCHED AT t = 0',8.66,2.20,3.28,C.teal,10.8,'center');
  pill(s,'support',8.58,2.71,1.02,C.tealpale,C.teal,10); pill(s,'MI = 2.512 b',9.72,2.71,1.34,C.tealpale,C.teal,10); pill(s,'leak = 1.781 b',11.18,2.71,1.02,C.tealpale,C.teal,9.2);
  s.addText('after 32 updates',{x:8.66,y:3.59,w:3.28,h:.28,fontSize:14,bold:true,color:C.mid,align:'center',margin:0});
  metric(s,'2.20','full history regret',8.47,4.02,1.62,C.teal); metric(s,'30.91','suffix regret',10.51,4.02,1.62,C.orange);
  pill(s,'snapshot info ≠ memory',9.02,5.43,2.78,C.navy,C.white,10.8);
}

// 21 — native handoff
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'The bottleneck is not decoding — it is routing and reuse','native handoff'); addSub(s,'Synthetic 8-state task · Qwen2.5-32B');
  img(s,'native_handoff.png',.55,1.62,7.78,4.72);
  box(s,8.63,1.90,3.80,4.12,C.white);
  s.addText('infer endpoint',{x:9.07,y:2.40,w:2.93,h:.30,fontSize:16,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('76.98%',{x:9.07,y:2.83,w:2.93,h:.46,fontSize:25,bold:true,color:C.teal,align:'center',margin:0});
  s.addText('infer + route + lookup',{x:9.07,y:3.58,w:2.93,h:.30,fontSize:16,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('13.44%',{x:9.07,y:4.01,w:2.93,h:.46,fontSize:25,bold:true,color:C.red,align:'center',margin:0});
  pill(s,'explicit handoff → 76.98%',8.93,5.18,3.18,C.tealpale,C.teal,10.8);
}

// 22 — code properties
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Capacity is necessary — stable meaning makes it reusable','state code design'); addSub(s,'Same task · controlled code variants');
  img(s,'state_codes.png',.66,1.62,7.62,4.73);
  box(s,8.55,1.88,3.86,4.12,C.white);
  label(s,'THREE REQUIREMENTS',8.94,2.20,3.08,C.teal,10.8,'center');
  const rows=[['capacity','3 bits < 16 states',C.red],['stable meaning','canonical ≈ padded',C.green],['path aliases','30–40% exact state',C.orange]];
  rows.forEach((r,i)=>{
    const yy=2.82+i*.84;
    s.addText(r[0],{x:8.88,y:yy,w:1.38,h:.28,fontSize:13,bold:true,color:C.mid,margin:0});
    s.addText(r[1],{x:10.02,y:yy,w:1.98,h:.31,fontSize:14.2,bold:true,color:r[2],align:'right',margin:0});
    if(i<2) s.addShape(pptx.ShapeType.line,{x:8.92,y:yy+.50,w:3.02,h:0,line:{color:C.line,width:1}});
  });
  pill(s,'capacity ≠ semantics',9.02,5.38,2.92,C.orangepale,C.orange,10.8);
}

// 23 — local to global reliability
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'Local accuracy is not global reliability','closed-loop composition'); addSub(s,'Errors multiply when the state is repeatedly fed back');
  img(s,'local_global.png',.70,1.66,7.25,4.56);
  box(s,8.22,1.91,4.14,4.08,C.navy,C.navy,.10,false);
  label(s,'NAIVE INDEPENDENCE CHECK',8.72,2.27,3.14,C.teal2,10.7,'center');
  eq(s,'P(32 correct) ≈ 0.89³²',8.53,2.94,3.52,.62,23,C.white);
  eq(s,'≈ 2.4%',8.53,3.75,3.52,.62,29,C.orange2);
  s.addShape(pptx.ShapeType.line,{x:8.84,y:4.57,w:2.90,h:0,line:{color:'49616B',width:1}});
  s.addText('observed self-fed: 7.92%',{x:8.64,y:4.92,w:3.28,h:.30,fontSize:15,bold:true,color:'D7E2E6',align:'center',margin:0});
  pill(s,'closure is a separate property',8.80,5.47,3.02,'35525B','DDE7EA',10.5);
}

// 24 — unification bridge
{
  const s=pptx.addSlide('LIGHT'); addTitle(s,'The two halves meet at the receiver','unification'); addSub(s,'Same representation · different use · different required rate');
  img(s,'bridge_rates.png',.60,1.72,5.70,3.85);
  img(s,'reasoning_gain.png',7.04,1.72,5.65,3.85);
  s.addShape(pptx.ShapeType.line,{x:6.67,y:1.82,w:0,h:3.72,line:{color:C.line,width:1.1}});
  s.addText('compression target',{x:1.58,y:5.83,w:3.70,h:.30,fontSize:14,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('reasoning tokens vs answer',{x:7.80,y:5.83,w:4.05,h:.30,fontSize:14,bold:true,color:C.mid,align:'center',margin:0});
  pill(s,'same bits do different work for different receivers / utilities',3.60,6.34,6.16,C.navy,C.white,10.8);
}

// 25 — conclusion
{
  const s=pptx.addSlide(); s.background={color:C.navy};
  s.addText('What survived',{x:.82,y:.76,w:3.5,h:.34,fontSize:12,bold:true,color:C.teal2,charSpacing:1.1,margin:0});
  s.addText('Useful information is not intrinsic',{x:.82,y:1.32,w:10.4,h:.70,fontSize:31,bold:true,color:C.white,margin:0});
  eq(s,'useful bits  =  representation  |  receiver, utility, update rule',.88,2.35,11.55,.62,23,'DDE8EC');
  const cards=[
    ['FINE-TUNING','serialized update','receiver-relative corrections',C.teal],
    ['REASONING','compact state','objective + update rule',C.orange],
    ['METHOD','falsify proxies','measure operationally',C.green]
  ];
  cards.forEach((c,i)=>{
    const x=.90+i*4.12; box(s,x,3.55,3.62,2.00,'1E4259','2A556E',.10,false);
    s.addText(c[0],{x:x+.24,y:3.87,w:3.14,h:.24,fontSize:10.5,bold:true,color:c[3],charSpacing:.8,align:'center',margin:0});
    s.addText(c[1],{x:x+.24,y:4.36,w:3.14,h:.30,fontSize:17,bold:true,color:C.white,align:'center',margin:0});
    s.addText(c[2],{x:x+.24,y:4.90,w:3.14,h:.32,fontSize:14,color:'BDD0D8',align:'center',margin:0});
  });
  s.addText('Questions?',{x:.86,y:6.28,w:2.5,h:.40,fontSize:21,bold:true,color:C.white,margin:0});
  s.addText('joeydavid.fyi',{x:9.95,y:6.33,w:2.45,h:.28,fontSize:12,color:'9DB2BC',align:'right',margin:0});
}

pptx.writeFile({ fileName: path.join(__dirname, 'thesis_defense.pptx') });
