const pptxgen = require('pptxgenjs');
const path = require('path');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Joey David';
pptx.subject = 'Master thesis defense';
pptx.title = 'Information Constraints in Fine-tuning and Reasoning Language Models';
pptx.company = 'PSL — IASD / LAMSADE';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-US'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F8FAFC' },
  objects: [
    { line: { x: 0.45, y: 7.16, w: 12.42, h: 0, line: { color: 'D9E2E8', width: 1 } } },
    { text: { text: 'Joey David · IASD M2 · 2026', options: { x: 0.48, y: 7.18, w: 3.4, h: 0.18, fontFace: 'Aptos', fontSize: 8, color: '73808B', margin: 0 } } },
  ],
  slideNumber: { x: 12.45, y: 7.16, color: '73808B', fontFace: 'Aptos', fontSize: 8 },
  margin: 0
});

const C = {
  navy: '17324D', teal: '1F8A8A', orange: 'D97745', red: 'B55353', green: '4D8F62',
  ink: '17212B', mid: '5B6975', light: 'E7EDF2', pale: 'F1F5F8', white: 'FFFFFF',
  bluepale: 'EAF2F7', tealpale: 'E8F5F4', orangepale: 'FBEEE8', redpale: 'F8E9E9'
};
const A = n => path.join(__dirname, 'assets', n);

function addTitle(slide, title, kicker=null) {
  if (kicker) slide.addText(kicker.toUpperCase(), { x: .55, y: .35, w: 3.8, h: .22, fontSize: 9, bold: true, color: C.teal, charSpacing: 1.1, margin: 0 });
  slide.addText(title, { x: .55, y: kicker ? .62 : .43, w: 12.0, h: .58, fontSize: 26, bold: true, color: C.ink, margin: 0, breakLine: false });
}
function addSub(slide, text, x=.58, y=1.23, w=11.7) {
  slide.addText(text, { x, y, w, h: .36, fontSize: 13.5, color: C.mid, margin: 0, breakLine: false });
}
function pill(slide, text, x, y, w, fill=C.pale, color=C.ink) {
  slide.addShape(pptx.ShapeType.roundRect, { x,y,w,h:.36,rectRadius:.08,fill:{color:fill},line:{color:fill},radius:.08 });
  slide.addText(text, { x:x+.08,y:y+.07,w:w-.16,h:.20,fontSize:10.5,bold:true,color,align:'center',margin:0 });
}
function metric(slide, value, label, x, y, w=2.2, color=C.teal) {
  slide.addText(value, { x, y, w, h:.54, fontSize:28, bold:true, color, margin:0, align:'center' });
  slide.addText(label, { x, y:y+.56, w, h:.42, fontSize:11, color:C.mid, margin:0, align:'center', valign:'mid' });
}
function box(slide, x,y,w,h, fill=C.white, line=C.light, radius=.08) {
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:radius,fill:{color:fill},line:{color:line,width:1.1},shadow:{type:'outer',color:'AAB6C0',opacity:.12,blur:1.2,angle:45,distance:1}});
}
function arrow(slide, x1,y1,x2,y2, color=C.mid, width=1.8) {
  slide.addShape(pptx.ShapeType.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width,beginArrowType:'none',endArrowType:'triangle'}});
}
function bulletPhrase(slide, text, x, y, w, color=C.ink, size=17) {
  slide.addText('•', {x,y,w:.18,h:.28,fontSize:size,color:C.teal,bold:true,margin:0});
  slide.addText(text, {x:x+.23,y,w:w-.23,h:.34,fontSize:size,color,margin:0,breakLine:false});
}
function addImage(slide, filename, x,y,w,h) {
  slide.addImage({path:A(filename),x,y,w,h});
}
function sectionChip(slide, n, label, x, y, active=false) {
  const fill = active ? C.navy : C.pale;
  const color = active ? C.white : C.mid;
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w:1.55,h:.42,rectRadius:.08,fill:{color:fill},line:{color:fill}});
  slide.addText(`${n}  ${label}`,{x:x+.08,y:y+.095,w:1.39,h:.18,fontSize:10,bold:active,color,margin:0,align:'center'});
}

// 1 — title
{
  const s=pptx.addSlide(); s.background={color:C.navy};
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:C.navy},line:{color:C.navy}});
  s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:.18,h:7.5,fill:{color:C.teal},line:{color:C.teal}});
  s.addText('Information Constraints\nin Fine-tuning and Reasoning', {x:.82,y:1.30,w:10.7,h:1.7,fontSize:31,bold:true,color:C.white,margin:0,breakLine:false});
  s.addText('Receiver-relative information for learned behavior', {x:.86,y:3.18,w:8.9,h:.46,fontSize:18,color:'C9D5DF',margin:0});
  pill(s,'UPDATE RATE',.86,4.18,1.75,C.teal,C.white); pill(s,'REASONING STATE',2.78,4.18,2.05,'284A66',C.white); pill(s,'RECEIVER-RELATIVE',4.99,4.18,2.28,'284A66',C.white);
  s.addText('Joey David', {x:.86,y:5.62,w:2.4,h:.30,fontSize:16,bold:true,color:C.white,margin:0});
  s.addText('IASD M2 · PSL · LAMSADE / MILES · 2026', {x:.86,y:6.02,w:5.4,h:.30,fontSize:12,color:'B9C7D2',margin:0});
  s.addText('Paul Caillon · Alexandre Allauzen', {x:.86,y:6.40,w:4.7,h:.28,fontSize:11,color:'8FA3B4',margin:0});
}

// 2 — one question, two channels
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'One question, two channels','Framing'); addSub(s,'Useful information = conditional on receiver + use');
  sectionChip(s,'1','Fine-tuning',8.55,.52,true); sectionChip(s,'2','Reasoning',10.27,.52,false);
  box(s,.72,1.78,5.55,4.45,C.white); box(s,7.05,1.78,5.55,4.45,C.white);
  s.addText('TRAINING-TIME CHANNEL',{x:1.02,y:2.12,w:2.6,h:.25,fontSize:11,bold:true,color:C.teal,margin:0});
  s.addText('Frozen model',{x:1.08,y:3.05,w:1.35,h:.35,fontSize:17,bold:true,color:C.ink,align:'center',margin:0});
  box(s,1.02,2.78,1.5,.9,C.bluepale,'B9CDD9');
  s.addText('+',{x:2.72,y:3.02,w:.3,h:.35,fontSize:24,bold:true,color:C.mid,align:'center',margin:0});
  box(s,3.18,2.78,1.58,.9,C.tealpale,'A8D2D0'); s.addText('compressed\nadapter',{x:3.28,y:2.97,w:1.38,h:.4,fontSize:14,bold:true,color:C.teal,align:'center',margin:0});
  arrow(s,4.95,3.23,5.72,3.23,C.mid,2.2);
  s.addText('behavior',{x:5.13,y:3.65,w:1.0,h:.26,fontSize:14,bold:true,color:C.green,align:'center',margin:0});
  s.addText('rate  ×  receiver  ×  utility',{x:1.28,y:4.61,w:4.30,h:.42,fontSize:20,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('INFERENCE-TIME CHANNEL',{x:7.35,y:2.12,w:2.9,h:.25,fontSize:11,bold:true,color:C.orange,margin:0});
  box(s,7.56,2.78,1.8,.9,C.orangepale,'E8C0AA'); s.addText('reasoning\nhistory',{x:7.68,y:2.97,w:1.56,h:.4,fontSize:14,bold:true,color:C.orange,align:'center',margin:0});
  arrow(s,9.52,3.23,10.18,3.23,C.mid,2.2);
  box(s,10.34,2.78,1.45,.9,C.tealpale,'A8D2D0'); s.addText('state\ncode',{x:10.47,y:2.97,w:1.20,h:.4,fontSize:14,bold:true,color:C.teal,align:'center',margin:0});
  arrow(s,11.95,3.23,12.34,3.23,C.mid,2.2);
  s.addText('future use',{x:10.02,y:3.74,w:2.28,h:.26,fontSize:14,bold:true,color:C.green,align:'center',margin:0});
  s.addText('state  ×  update rule  ×  utility',{x:7.64,y:4.61,w:4.28,h:.42,fontSize:20,bold:true,color:C.navy,align:'center',margin:0});
  pill(s,'same idea: useful information is conditional',4.02,6.42,5.22,C.navy,C.white);
}

// 3 — trajectory
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Research trajectory','Internship chronology'); addSub(s,'Negative result → sharper question');
  const months=[['APR','Literature\nreview'],['MAY','Rank +\ncompressibility'],['JUN','Native state\nhypotheses'],['JUL','Objective +\ncausal tests'],['AUG','Exact rate +\nsynthesis']];
  const xs=[.78,3.16,5.54,7.92,10.30];
  for(let i=0;i<months.length;i++){
    const active=i===4;
    box(s,xs[i],2.35,2.12,1.55,active?C.tealpale:C.white,active?'A8D2D0':C.light);
    s.addText(months[i][0],{x:xs[i]+.14,y:2.58,w:.54,h:.25,fontSize:11,bold:true,color:active?C.teal:C.mid,margin:0});
    s.addText(months[i][1],{x:xs[i]+.14,y:3.00,w:1.78,h:.56,fontSize:16,bold:true,color:C.ink,margin:0,align:'center'});
    if(i<4) arrow(s,xs[i]+2.15,3.13,xs[i+1]-.08,3.13,'AAB6C0',2.2);
  }
  const lower=[
    ['rank ≠ rate','measure serialized bits'],['data size confounded','fix training exposure'],['state decodable','test causal reuse'],['one-step accuracy','test closed loop']
  ];
  for(let i=0;i<4;i++){
    s.addText(lower[i][0],{x:1.05+i*2.88,y:4.78,w:2.35,h:.28,fontSize:12.5,bold:true,color:C.red,align:'center',margin:0});
    s.addText('↓',{x:1.92+i*2.88,y:5.08,w:.6,h:.32,fontSize:18,bold:true,color:C.mid,align:'center',margin:0});
    s.addText(lower[i][1],{x:1.05+i*2.88,y:5.50,w:2.35,h:.36,fontSize:12.5,bold:true,color:C.green,align:'center',margin:0});
  }
  pill(s,'chronology = scientific argument',4.80,6.36,3.80,C.pale,C.navy);
}

// 4 — rate definition
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Part I — What is the rate of a fine-tune?','Fine-tuning'); addSub(s,'Fixed learned update · variable serialized representation');
  sectionChip(s,'1','Fine-tuning',8.55,.52,true); sectionChip(s,'2','Reasoning',10.27,.52,false);
  box(s,.84,2.05,2.25,1.18,C.bluepale,'BDD1DD'); s.addText('frozen\nbase model',{x:1.08,y:2.36,w:1.78,h:.56,fontSize:19,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('+',{x:3.30,y:2.41,w:.35,h:.4,fontSize:28,bold:true,color:C.mid,align:'center',margin:0});
  box(s,3.84,2.05,2.35,1.18,C.tealpale,'A8D2D0'); s.addText('one trained\nLoRA adapter',{x:4.06,y:2.36,w:1.92,h:.56,fontSize:19,bold:true,color:C.teal,align:'center',margin:0});
  arrow(s,6.44,2.64,7.35,2.64,C.mid,2.4);
  const bits=[8,4,2,1,.5];
  for(let i=0;i<bits.length;i++){
    const x=7.54+i*.92; box(s,x,2.18,.72,.90,i===3?C.orangepale:C.white,i===3?'E8B89D':C.light);
    s.addText(String(bits[i]),{x:x+.08,y:2.35,w:.56,h:.24,fontSize:17,bold:true,color:i===3?C.orange:C.ink,align:'center',margin:0});
    s.addText('bits',{x:x+.08,y:2.66,w:.56,h:.18,fontSize:9,color:C.mid,align:'center',margin:0});
  }
  arrow(s,11.98,2.64,12.48,2.64,C.mid,2.4);
  s.addText('reload',{x:11.85,y:3.02,w:.8,h:.22,fontSize:11,bold:true,color:C.green,align:'center',margin:0});
  box(s,1.06,4.18,5.18,1.35,C.white); s.addText('RATE',{x:1.32,y:4.48,w:.8,h:.25,fontSize:11,bold:true,color:C.teal,margin:0});
  s.addText('complete file size / adapter values',{x:1.32,y:4.86,w:4.58,h:.32,fontSize:18,bold:true,color:C.ink,margin:0});
  box(s,7.10,4.18,5.18,1.35,C.white); s.addText('DISTORTION',{x:7.36,y:4.48,w:1.1,h:.25,fontSize:11,bold:true,color:C.orange,margin:0});
  s.addText('behavior lost after reload',{x:7.36,y:4.86,w:4.58,h:.32,fontSize:18,bold:true,color:C.ink,margin:0});
  pill(s,'R*(0.90) = smallest measured rate retaining ≥90%',3.45,6.16,6.42,C.navy,C.white);
}

// 5 — R* intuition
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'The operating point: R*(0.90)','Exact-rate protocol'); addSub(s,'One checkpoint · many compressed files · one behavior curve');
  s.addShape(pptx.ShapeType.line,{x:1.00,y:5.65,w:5.35,h:0,line:{color:C.mid,width:1.5}});
  s.addShape(pptx.ShapeType.line,{x:1.00,y:5.65,w:0,h:-3.52,line:{color:C.mid,width:1.5}});
  const pts=[[1.45,5.22],[2.15,4.80],[2.92,4.13],[3.74,3.02],[4.62,2.56],[5.60,2.35]];
  for(let i=0;i<pts.length-1;i++) s.addShape(pptx.ShapeType.line,{x:pts[i][0],y:pts[i][1],w:pts[i+1][0]-pts[i][0],h:pts[i+1][1]-pts[i][1],line:{color:C.teal,width:3}});
  for(const p of pts) s.addShape(pptx.ShapeType.ellipse,{x:p[0]-.07,y:p[1]-.07,w:.14,h:.14,fill:{color:C.teal},line:{color:C.teal}});
  s.addShape(pptx.ShapeType.line,{x:1.00,y:2.78,w:5.35,h:0,line:{color:C.orange,width:1.5,dash:'dash'}});
  s.addShape(pptx.ShapeType.line,{x:3.96,y:5.65,w:0,h:-2.87,line:{color:C.orange,width:1.5,dash:'dash'}});
  s.addText('90% retained gain',{x:1.12,y:2.48,w:1.52,h:.26,fontSize:11,bold:true,color:C.orange,margin:0});
  s.addText('R*',{x:3.70,y:5.78,w:.52,h:.28,fontSize:16,bold:true,color:C.orange,align:'center',margin:0});
  s.addText('serialized rate →',{x:3.98,y:6.02,w:1.74,h:.25,fontSize:11,color:C.mid,margin:0});
  s.addText('retained gain ↑',{x:.10,y:3.66,w:1.32,h:.28,fontSize:11,color:C.mid,align:'center',margin:0,rotate:270});
  box(s,7.15,2.05,5.05,3.80,C.white);
  bulletPhrase(s,'actual file size',7.62,2.55,3.95,C.ink,18);
  bulletPhrase(s,'same raw adapter',7.62,3.16,3.95,C.ink,18);
  bulletPhrase(s,'same frozen receiver',7.62,3.77,3.95,C.ink,18);
  bulletPhrase(s,'behavior = distortion',7.62,4.38,3.95,C.ink,18);
  pill(s,'rank is not a rate',8.46,5.15,2.35,C.redpale,C.red);
}

// 6 — negative result weight error
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'First surprise: lower weight error ≠ better behavior','Negative result'); addSub(s,'Adaptive allocation · better reconstruction · worse utility');
  box(s,.88,1.92,5.42,4.28,C.white);
  s.addText('WEIGHT SPACE',{x:1.18,y:2.24,w:1.55,h:.22,fontSize:10.5,bold:true,color:C.mid,margin:0});
  const pts=[[1.62,4.87],[2.45,4.14],[3.38,3.55],[4.46,3.08],[5.35,2.88]];
  s.addShape(pptx.ShapeType.line,{x:1.40,y:5.42,w:4.25,h:0,line:{color:C.mid,width:1.2}}); s.addShape(pptx.ShapeType.line,{x:1.40,y:5.42,w:0,h:-2.65,line:{color:C.mid,width:1.2}});
  for(const [x,y] of pts) s.addShape(pptx.ShapeType.ellipse,{x:x-.08,y:y-.08,w:.16,h:.16,fill:{color:C.navy},line:{color:C.navy}});
  s.addShape(pptx.ShapeType.ellipse,{x:2.48,y:3.10,w:.23,h:.23,fill:{color:C.orange},line:{color:C.orange}});
  s.addText('lower RMSE',{x:2.07,y:2.72,w:1.10,h:.22,fontSize:10.5,bold:true,color:C.orange,margin:0});
  box(s,7.02,1.92,5.42,4.28,C.white);
  s.addText('BEHAVIOR',{x:7.32,y:2.24,w:1.18,h:.22,fontSize:10.5,bold:true,color:C.mid,margin:0});
  metric(s,'↓','weight error',7.54,3.02,1.82,C.green); metric(s,'↓↓','retained gain',9.78,3.02,1.82,C.red);
  arrow(s,9.15,3.53,9.55,3.53,C.mid,2.6);
  pill(s,'wrong distortion metric',8.57,5.32,2.38,C.redpale,C.red);
  s.addText('Functional importance ≠ Euclidean importance',{x:2.36,y:6.43,w:8.65,h:.34,fontSize:20,bold:true,color:C.navy,align:'center',margin:0});
}

// 7 — data scaling
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'More distinct content → more required rate','Data controls'); addSub(s,'Fixed optimizer steps · fixed example presentations');
  addImage(s,'distinct_rate.png',.73,1.72,7.22,4.62);
  box(s,8.35,1.97,4.20,3.58,C.white);
  metric(s,'R² = 0.78','log₂ distinct-example fit',8.74,2.48,3.42,C.teal);
  s.addText('but…',{x:9.62,y:3.74,w:1.66,h:.30,fontSize:16,bold:true,color:C.orange,align:'center',margin:0});
  bulletPhrase(s,'not perfectly monotone',8.75,4.23,3.15,C.ink,14.5);
  bulletPhrase(s,'diversity ≠ example count',8.75,4.76,3.15,C.ink,14.5);
  pill(s,'proxy, not law',9.20,5.94,2.37,C.orangepale,C.orange);
}

// 8 — receiver dependence
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'The same dataset has no intrinsic adapter cost','Receiver dependence'); addSub(s,'Frozen receiver switched · corpus ordering rearranged');
  addImage(s,'receiver_dependence.png',.70,1.66,7.84,4.84);
  box(s,8.65,1.96,3.85,3.94,C.white);
  s.addText('same corpus',{x:9.08,y:2.45,w:2.95,h:.32,fontSize:19,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('↓',{x:10.18,y:2.94,w:.78,h:.35,fontSize:21,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('different receiver',{x:9.08,y:3.37,w:2.95,h:.32,fontSize:19,bold:true,color:C.teal,align:'center',margin:0});
  s.addText('↓',{x:10.18,y:3.86,w:.78,h:.35,fontSize:21,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('different R*',{x:9.08,y:4.30,w:2.95,h:.32,fontSize:19,bold:true,color:C.orange,align:'center',margin:0});
  pill(s,'receiver-relative',9.32,5.18,2.45,C.navy,C.white);
}

// 9 — predictor
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Strongest current predictor: requested correction geometry','Model-relative hypothesis'); addSub(s,'Dataset × frozen model → requested corrections');
  addImage(s,'correction_predictor.png',.66,1.75,7.55,4.58);
  box(s,8.55,1.94,3.90,4.08,C.white);
  s.addText('token gradient',{x:8.97,y:2.34,w:3.0,h:.28,fontSize:17,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('representation  ×  prediction error',{x:8.95,y:2.93,w:3.08,h:.44,fontSize:16,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('↓',{x:10.10,y:3.46,w:.72,h:.32,fontSize:20,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('correction spectrum',{x:8.95,y:3.88,w:3.08,h:.30,fontSize:17,bold:true,color:C.teal,align:'center',margin:0});
  s.addText('↓',{x:10.10,y:4.31,w:.72,h:.32,fontSize:20,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('log-volume / effective rank',{x:8.92,y:4.72,w:3.14,h:.30,fontSize:14.5,bold:true,color:C.ink,align:'center',margin:0});
  pill(s,'promising · not yet scaling law',8.88,5.48,3.22,C.orangepale,C.orange);
}

// 10 — part I summary
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Part I — What survived the controls?','Takeaway');
  const cards=[
    ['NO','rank','rate'],['NO','weight RMSE','behavior'],['NO','dataset identity','adapter cost'],['YES','receiver-relative\ncorrections','strongest signal']
  ];
  const xs=[.74,3.86,6.98,10.10];
  for(let i=0;i<4;i++){
    box(s,xs[i],2.05,2.50,2.98,i===3?C.tealpale:C.white,i===3?'A8D2D0':C.light);
    s.addText(cards[i][0],{x:xs[i]+.26,y:2.39,w:1.98,h:.38,fontSize:24,bold:true,color:i===3?C.green:C.red,align:'center',margin:0});
    s.addText(cards[i][1],{x:xs[i]+.22,y:3.13,w:2.06,h:.46,fontSize:16,bold:true,color:C.ink,align:'center',margin:0});
    s.addText('↓',{x:xs[i]+.88,y:3.72,w:.72,h:.30,fontSize:17,bold:true,color:C.mid,align:'center',margin:0});
    s.addText(cards[i][2],{x:xs[i]+.22,y:4.18,w:2.06,h:.45,fontSize:15,bold:true,color:i===3?C.teal:C.mid,align:'center',margin:0});
  }
  s.addText('Next → analogous state during reasoning',{x:2.80,y:5.82,w:7.74,h:.45,fontSize:22,bold:true,color:C.navy,align:'center',margin:0});
  arrow(s,6.66,6.32,6.66,6.82,C.teal,2.8);
}

// 11 — solution object hypothesis
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Part II — Does reasoning decompose into natural states?','Reasoning'); addSub(s,'Hypothesis: long CoT → short reusable updates');
  const nodes=[
    [1.05,4.68,2.2,.74,'problem\nfact A',C.pale],[3.66,4.68,2.2,.74,'problem\nfact B',C.pale],[6.27,4.68,2.2,.74,'problem\nrelation',C.pale],
    [2.28,3.06,2.42,.82,'intermediate\nclaim',C.tealpale],[6.03,3.06,2.42,.82,'intermediate\nclaim',C.tealpale],
    [4.20,1.82,2.62,.82,'answer state', 'D8F0EE']
  ];
  nodes.forEach(n=>{box(s,n[0],n[1],n[2],n[3],n[5],n[5]===C.pale?C.light:'A8D2D0'); s.addText(n[4],{x:n[0]+.12,y:n[1]+.17,w:n[2]-.24,h:n[3]-.24,fontSize:15,bold:true,color:C.ink,align:'center',margin:0});});
  arrow(s,2.18,4.66,3.11,3.90,C.mid,1.7); arrow(s,4.78,4.66,3.91,3.90,C.mid,1.7); arrow(s,7.38,4.66,7.12,3.90,C.mid,1.7);
  arrow(s,3.52,3.03,5.18,2.68,C.mid,1.7); arrow(s,7.18,3.03,6.02,2.68,C.mid,1.7);
  s.addText('If “solution objects” are\nreal…',{x:9.13,y:2.05,w:3.22,h:.58,fontSize:17,bold:true,color:C.navy,margin:0});
  bulletPhrase(s,'boundaries align',9.16,2.66,2.86,C.ink,14.5);
  bulletPhrase(s,'operations cluster',9.16,3.20,2.86,C.ink,14.5);
  bulletPhrase(s,'states transfer',9.16,3.74,2.86,C.ink,14.5);
  bulletPhrase(s,'correctness localizes',9.16,4.28,2.86,C.ink,14.5);
  pill(s,'test all four',9.47,5.18,2.23,C.navy,C.white);
}

// 12 — objective-relative partition
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Strong structure — but no universal partition','Objective-relative boundaries'); addSub(s,'High decodability · low cross-objective agreement');
  addImage(s,'objective_auc.png',.62,1.72,7.20,4.55);
  box(s,8.19,1.94,4.28,4.10,C.white);
  s.addText('cross-objective overlap',{x:8.67,y:2.28,w:3.32,h:.25,fontSize:12,bold:true,color:C.mid,align:'center',margin:0});
  metric(s,'0.10–0.29','F1 within ±4 tokens',8.73,2.72,3.18,C.orange);
  s.addText('best worst-objective utility',{x:8.67,y:4.08,w:3.32,h:.25,fontSize:12,bold:true,color:C.mid,align:'center',margin:0});
  metric(s,'0.02 / 0.08','SmolLM / Qwen',8.73,4.42,3.18,C.red);
  pill(s,'decodable ≠ canonical',8.92,5.55,2.78,C.navy,C.white);
}

// 13 — snapshot info not memory
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Snapshot information is not memory','Exact finite control'); addSub(s,'Matched snapshot information · different update rule · diverging utility');
  addImage(s,'snapshot_regret.png',.63,1.67,7.10,4.58);
  box(s,8.07,1.92,4.48,4.22,C.white);
  s.addText('initially matched',{x:8.56,y:2.29,w:3.49,h:.28,fontSize:16,bold:true,color:C.green,align:'center',margin:0});
  pill(s,'support',8.49,2.85,1.03,C.tealpale,C.teal); pill(s,'MI = 2.512 b',9.65,2.85,1.34,C.tealpale,C.teal); pill(s,'leakage = 1.781 b',11.10,2.85,1.18,C.tealpale,C.teal);
  s.addText('horizon 32',{x:8.56,y:3.66,w:3.49,h:.26,fontSize:13,bold:true,color:C.mid,align:'center',margin:0});
  metric(s,'2.20','full history regret',8.39,4.10,1.75,C.teal); metric(s,'30.91','suffix regret',10.50,4.10,1.75,C.orange);
  s.addText('7.19× pooled regret',{x:8.74,y:5.50,w:3.05,h:.28,fontSize:16,bold:true,color:C.red,align:'center',margin:0});
}

// 14 — native state handoff
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'A state can be decoded — and still fail to compose','Native handoff'); addSub(s,'Synthetic 8-state task · Qwen2.5-32B');
  addImage(s,'native_handoff.png',.70,1.72,7.52,4.56);
  box(s,8.55,1.98,3.90,4.00,C.white);
  s.addText('one-pass bottleneck',{x:8.95,y:2.39,w:3.08,h:.28,fontSize:17,bold:true,color:C.red,align:'center',margin:0});
  s.addText('infer endpoint',{x:9.22,y:3.03,w:2.52,h:.30,fontSize:16,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('76.98%',{x:9.22,y:3.40,w:2.52,h:.36,fontSize:23,bold:true,color:C.teal,align:'center',margin:0});
  s.addText('infer + route + lookup',{x:9.06,y:4.13,w:2.86,h:.30,fontSize:16,bold:true,color:C.ink,align:'center',margin:0});
  s.addText('13.44%',{x:9.22,y:4.50,w:2.52,h:.36,fontSize:23,bold:true,color:C.red,align:'center',margin:0});
  pill(s,'explicit handoff restores 76.98%',8.88,5.38,3.20,C.tealpale,C.teal);
}

// 15 — code properties
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'What makes an explicit state interface reusable?','Capacity · naming · closure'); addSub(s,'Same task · equal compute · controlled code designs');
  addImage(s,'state_codes.png',.62,1.72,7.46,4.58);
  box(s,8.42,1.96,4.10,4.17,C.white);
  const rows=[['capacity','3 bits < 16 states',C.red],['stable\nmeaning','canonical = padded',C.green],['path aliases','30–40% exact state',C.orange],['closure','exact through\nH=256',C.teal]];
  rows.forEach((r,i)=>{
    s.addText(r[0],{x:8.78,y:2.36+i*.76,w:1.37,h:.34,fontSize:13,bold:true,color:C.mid,margin:0});
    s.addText(r[1],{x:10.00,y:2.31+i*.76,w:2.04,h:.38,fontSize:14.5,bold:true,color:r[2],margin:0,align:'right'});
    if(i<3) s.addShape(pptx.ShapeType.line,{x:8.78,y:2.88+i*.76,w:3.18,h:0,line:{color:C.light,width:1}});
  });
  pill(s,'capacity necessary · not sufficient',8.83,5.46,3.27,C.navy,C.white);
}

// 16 — local/global
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Local correctness does not buy long-horizon reliability','Closed-loop reasoning'); addSub(s,'Mixed register programs · self-fed state updates');
  addImage(s,'local_global.png',.67,1.73,7.15,4.50);
  box(s,8.20,1.94,4.30,4.09,C.white);
  metric(s,'89%','single transition',8.66,2.34,3.34,C.teal);
  s.addText('↓ repeated ~31×',{x:9.10,y:3.73,w:2.46,h:.28,fontSize:14,bold:true,color:C.mid,align:'center',margin:0});
  metric(s,'7.92%','complete horizon-32',8.66,4.10,3.34,C.red);
  pill(s,'measure self-conditioned use',8.94,5.47,2.78,C.orangepale,C.orange);
}

// 17 — bridge
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Bridge experiment: reasoning and answers have receiver-specific rates','Synthesis'); addSub(s,'MetaMathQA · rank-16 LoRA · same codec');
  addImage(s,'bridge_rates.png',.65,1.72,6.20,4.54);
  addImage(s,'reasoning_gain.png',6.96,1.72,5.73,4.54);
  s.addText('compression threshold',{x:2.21,y:6.17,w:2.95,h:.28,fontSize:13,bold:true,color:C.mid,align:'center',margin:0});
  s.addText('reasoning-token gain',{x:8.43,y:6.17,w:2.95,h:.28,fontSize:13,bold:true,color:C.mid,align:'center',margin:0});
  pill(s,'“reasoning is more expensive” holds on Mistral — not Qwen',3.42,6.57,6.46,C.navy,C.white);
}

// 18 — synthesis / close
{
  const s=pptx.addSlide('MASTER'); addTitle(s,'Three takeaways','Conclusion');
  const cards=[
    ['1','Measure utility, not proxy','serialized rate · behavioral retention',C.teal],
    ['2','Information is receiver-\nrelative','same data · different model · different cost',C.navy],
    ['3','Reusable state needs\ndynamics','capacity · stable meaning · closed-loop accuracy',C.orange]
  ];
  cards.forEach((c,i)=>{
    const y=1.65+i*1.55; box(s,1.10,y,11.05,1.16,i===0?C.tealpale:C.white,i===0?'A8D2D0':C.light);
    s.addShape(pptx.ShapeType.ellipse,{x:1.40,y:y+.24,w:.64,h:.64,fill:{color:c[3]},line:{color:c[3]}});
    s.addText(c[0],{x:1.40,y:y+.38,w:.64,h:.20,fontSize:14,bold:true,color:C.white,align:'center',margin:0});
    s.addText(c[1],{x:2.35,y:y+.20,w:4.12,h:.55,fontSize:20,bold:true,color:C.ink,margin:0});
    s.addText(c[2],{x:6.42,y:y+.31,w:5.20,h:.29,fontSize:14.5,bold:true,color:C.mid,align:'right',margin:0});
  });
  s.addText('Useful information = what a specified receiver must keep for a specified use',{x:1.45,y:6.12,w:10.40,h:.46,fontSize:20,bold:true,color:C.navy,align:'center',margin:0});
  s.addText('Questions?',{x:5.06,y:6.62,w:3.20,h:.30,fontSize:16,bold:true,color:C.teal,align:'center',margin:0});
}

pptx.writeFile({ fileName: path.join(__dirname, 'thesis_defense.pptx') });
