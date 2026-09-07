const pptxgen = require('pptxgenjs');
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Joey David';
pptx.subject = 'Master thesis defense';
pptx.title = 'Information constraints in fine-tuning and reasoning language models';
pptx.company = 'MILES · LAMSADE · Université Paris Dauphine–PSL';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'en-US'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'FFFFFF' },
  objects: [
    { line: { x: 0.67, y: 6.78, w: 12.0, h: 0, line: { color: 'CBD6D6', width: 1 } } },
  ],
  slideNumber: { x: 12.0, y: 6.89, w: 0.55, h: 0.22, fontFace: 'Aptos', fontSize: 9, color: '577079', align: 'right' }
});

const C={bg:'FFFFFF',ink:'142E38',muted:'577079',teal:'007F7B',amber:'C97433',pale:'E4F1EE',sand:'F6E9DC',line:'CBD6D6',white:'FFFFFF',dark:'102C36',darkLine:'31505A',lightTeal:'82BCBC'};
const SH=pptx.ShapeType;
const CT=pptx.ChartType;
function addText(slide, text, x,y,w,h, opts={}) {
  slide.addText(text,{x,y,w,h,fontFace:opts.fontFace||'Aptos',fontSize:opts.fontSize||20,color:opts.color||C.ink,bold:!!opts.bold,align:opts.align||'left',valign:opts.valign||'mid',margin:opts.margin===undefined?0:opts.margin,breakLine: false,fit:'shrink',...opts});
}
function addRich(slide, runs, x,y,w,h, opts={}) {
  slide.addText(runs,{x,y,w,h,fontFace:'Aptos',fontSize:opts.fontSize||20,color:opts.color||C.ink,margin:0,valign:opts.valign||'mid',fit:'shrink',...opts});
}
function rect(slide,x,y,w,h,fill,line='none',radius=0){
  slide.addShape(radius?SH.roundRect:SH.rect,{x,y,w,h,rectRadius:radius,fill:{color:fill,transparency:fill==='FFFFFF00'?100:0},line:line==='none'?{color:fill,transparency:100}:{color:line,width:1}});
}
function line(slide,x,y,w,color=C.line,width=1){ slide.addShape(SH.line,{x,y,w,h:0,line:{color,width}}); }
function kicker(slide, txt, color=C.teal){addText(slide,txt.toUpperCase(),0.69,0.24,10.5,0.25,{fontSize:9.5,color,bold:true,charSpacing:1.1});}
function title(slide,txt,color=C.ink){addText(slide,txt,0.67,0.67,12.0,0.82,{fontSize:28,color,bold:true});}
function foot(slide,txt){addText(slide,txt,0.69,6.33,11.45,0.25,{fontSize:10,color:C.muted});}
function label(slide,txt,x,y,w=3.6,color=C.teal){addText(slide,txt,x,y,w,0.34,{fontSize:13,color,bold:true});}
function block(slide,txt,x,y,w,h,fill=C.pale,fs=20){rect(slide,x,y,w,h,fill);addText(slide,txt,x+0.14,y+0.08,w-0.28,h-0.16,{fontSize:fs,bold:true,align:'center'});}
function arrow(slide,x,y,w,color=C.muted){slide.addShape(SH.line,{x,y,w,h:0,line:{color,width:1.5,beginArrowType:'none',endArrowType:'triangle'}});}
function callout(slide,txt,y=5.66,color=C.teal){line(slide,0.67,y,0.62,color,2);addText(slide,txt,1.50,y-0.18,10.75,0.58,{fontSize:20,color,bold:true});}
function formula(slide,txt,x,y,w,h,fill=C.pale,fs=22){rect(slide,x,y,w,h,fill);addText(slide,txt,x+0.16,y+0.06,w-0.32,h-0.12,{fontFace:'Cambria Math',fontSize:fs,align:'center'});}
function notes(seconds, bullets, source, backup=false){
  const head=backup?'Slide de secours — seulement si la question se pose.':`Cible : ${seconds} s.`;
  return `${head}\n\n${bullets.map(x=>'• '+x).join('\n')}\n\nSource : ${source}`;
}
function baseSlide(section,ttl,seconds,bullets,source,{dark=false,backup=false}={}){
  const s=pptx.addSlide(dark?undefined:'MASTER');
  if(dark){s.background={color:C.dark}; line(s,0.67,6.78,12.0,C.darkLine,1); addText(s,String(pptx._slides.length).padStart(2,'0'),12.0,6.89,0.55,0.22,{fontSize:9,color:'9CB4BB',align:'right'});}
  kicker(s,section,dark?C.lightTeal:C.teal);
  if(ttl) title(s,ttl,dark?C.white:C.ink);
  s.addNotes(notes(seconds,bullets,source,backup));
  return s;
}
function sectionDivider(part, titleTxt, subtitle, bullets, source, color=C.teal){
  const s=baseSlide(part,'',12,bullets,source,{dark:true});
  addText(s,part,0.67,1.36,3.0,0.55,{fontSize:20,color:color,bold:true});
  addText(s,titleTxt,0.67,2.04,11.9,1.05,{fontSize:46,color:C.white,bold:true});
  line(s,0.67,3.35,1.1,color,3);
  addText(s,subtitle,0.67,3.70,11.45,1.35,{fontSize:25,color:'CDD9DE'});
  return s;
}
function addBarChart(slide,cats,series,x,y,w,h,max,fmt='0.0',legend=true){
  const data=series.map((s,i)=>({name:s.name,labels:cats,values:s.values}));
  slide.addChart(CT.bar,data,{x,y,w,h,catAxisLabelFontFace:'Aptos',catAxisLabelFontSize:12,valAxisLabelFontFace:'Aptos',valAxisLabelFontSize:11,valAxisMinVal:0,valAxisMaxVal:max,valAxisMajorGridLine:{color:'E4E9EA',width:1},showLegend:legend,legendPos:'b',legendFontFace:'Aptos',legendFontSize:11,showValue:true,showCatName:false,showSerName:false,dataLabelPosition:'outEnd',dataLabelColor:C.ink,dataLabelFormatCode:fmt,showTitle:false,showCatName:false,showValue:true,chartColors:series.map(s=>s.color||C.teal),showBorder:false,showValue:true,gapWidthPct:70});
}
function addTable(slide, rows, x,y,w,h, widths){
  const arr=rows.map((r,i)=>r.map(v=>({text:String(v),options:{bold:i===0,color:i===0?C.white:C.ink,fill:i===0?C.ink:(i%2?C.white:C.pale),fontFace:'Aptos',fontSize:i===0?12:13,margin:0.08,valign:'mid'}})));
  slide.addTable(arr,{x,y,w,h,border:{type:'solid',color:'DCE4E4',pt:0.5},colW:widths,rowH:h/rows.length,margin:0.06,autoFit:false});
}

// 1 — title
{
 const s=baseSlide('MASTER’S THESIS · IASD · PSL · 2026','',25,[
  'Deux objets, une même question : quelle information doit survivre pour que le comportement survive ?',
  'Fine-tuning : l’information écrite dans une mise à jour de paramètres.',
  'Reasoning : l’information portée par un état intermédiaire et réellement réutilisable.',
  'Fil rouge : toujours parler d’information relativement à un récepteur et à un usage.'
 ],'Page de titre du rapport et §1.1.',{dark:true});
 addText(s,'Information constraints',0.67,1.43,11.6,0.8,{fontSize:42,color:C.white,bold:true});
 addText(s,'in fine-tuning and\nreasoning language models',0.67,2.31,11.55,1.55,{fontSize:38,color:C.white,bold:true});
 line(s,0.67,4.42,1.05,C.teal,3);
 addText(s,'Joey David',0.67,4.83,5.8,0.45,{fontSize:21,color:C.white,bold:true});
 addText(s,'MILES, LAMSADE · Université Paris Dauphine–PSL',0.67,5.36,11.0,0.30,{fontSize:14,color:'B5CBD0'});
 addText(s,'Supervision: Paul Caillon and Alexandre Allauzen',0.67,5.77,11.0,0.28,{fontSize:13,color:'B5CBD0'});
}
// 2 shared question
{
 const s=baseSlide('RESEARCH QUESTION','How much information must survive?',38,[
  'Ici, « information » n’est pas une propriété intrinsèque d’un fichier ou d’une trace.',
  'Elle est relative : relative information = ce qui reste nécessaire une fois le récepteur et l’usage fixés.',
  'Fine-tuning : le récepteur possède déjà le base model ; seul l’update doit être transmis.',
  'Reasoning : le récepteur doit pouvoir continuer le calcul à partir d’un reasoning state.',
  'Les unités et protocoles sont différents ; le cadre conceptuel, lui, est commun.'
 ],'Rapport §1.2 et §5.2–5.3.');
 label(s,'Fine-tuning',0.67,2.05,3.0,C.teal);addText(s,'A compressed update',0.67,2.56,5.25,0.52,{fontSize:24,bold:true});
 addText(s,'Base model already shared\n→ transmit only what learning added',0.67,3.22,5.25,1.0,{fontSize:19});
 line(s,6.28,2.02,0,C.line); s.addShape(SH.line,{x:6.25,y:2.04,w:0,h:2.55,line:{color:C.line,width:1}});
 label(s,'Reasoning',7.03,2.05,3.0,C.amber);addText(s,'A reasoning state',7.03,2.56,5.15,0.52,{fontSize:24,bold:true});
 addText(s,'What must remain available\n→ so the next computation still works?',7.03,3.22,5.15,1.0,{fontSize:19});
 callout(s,'Relative information = receiver + task + update rule.',5.62,C.teal);
}
// 3 Part I
sectionDivider('PART I','Fine-tuning','Internship starting point: information-theoretic limits of fine-tuning — how compactly can a learned update be represented while preserving the behavior it learned?',[
 'Point de départ du stage : étudier le fine-tuning sous un angle information-théorique.',
 'Question pratique : après avoir appris un dataset, combien de bits de la mise à jour faut-il réellement conserver ?',
