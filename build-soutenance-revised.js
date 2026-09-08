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
 'On conditionne sur le base model : il est déjà connu du récepteur.',
 'Le stage s’est progressivement déplacé des proxies simples vers une mesure sérialisée, rechargeable et comportementale.'
],'Rapport §1.1–1.2 ; notes de trajectoire du stage.',C.teal);
// 4 FT foundations
{
 const s=baseSlide('PART I · FOUNDATIONS','Base model → dataset learning → adapter',68,[
  'Base model : le modèle pré-entraîné avant notre dataset ; dans nos expériences il reste gelé.',
  'Learning a dataset : l’optimisation demande au modèle de corriger certaines prédictions sur les exemples du corpus.',
  'LoRA ne réécrit pas tout le modèle : il apprend une petite mise à jour ΔW = BA.',
  'Le base model agit donc comme side information partagée ; l’adapter est le message supplémentaire.',
  'Le rang réduit le nombre de valeurs entraînables, mais ne dit pas encore combien de bits il faut pour les coder.'
 ],'Rapport §2.3–2.4 et §3.2.');
 block(s,'BASE MODEL\n(frozen receiver)',0.67,2.00,3.35,1.18,C.pale,20);arrow(s,4.18,2.59,0.7,C.teal);block(s,'DATASET\nlearning signal',5.03,2.00,3.15,1.18,C.sand,20);arrow(s,8.35,2.59,0.7,C.teal);block(s,'LoRA ADAPTER\nlearned update',9.20,2.00,3.45,1.18,C.pale,20);
 formula(s,'W′ = W + ΔW,     ΔW = B A',1.02,3.74,5.10,0.85,C.pale,24);
 formula(s,'trainable values ≈ r(dᵢₙ + dₒᵤₜ)',7.06,3.74,5.10,0.85,C.sand,21);
 callout(s,'The dataset does not carry a fixed cost: it asks this base model for a correction.',5.61,C.teal);
}
// 5 numerical rate
{
 const s=baseSlide('PART I · FOUNDATIONS','The adapter’s numerical code determines its rate',55,[
  'Après entraînement, on garde exactement le même checkpoint LoRA et on ne change que sa représentation numérique.',
  'À b bits par valeur, le payload brut vaut environ bP bits, plus les échelles et métadonnées.',
  'On sérialise réellement, on compresse, puis on recharge : le taux vient de la taille du fichier obtenu.',
  'Le bon objet n’est donc pas « le rang » mais la quantité de message nécessaire au récepteur.',
  'La reconstruction des poids peut bouger sans que le comportement bouge de la même façon.'
 ],'Rapport §2.3–2.5, §3.3 et annexe Codec ladder.');
 formula(s,'ΔŴ = B̂ Â',0.67,1.98,3.55,0.87,C.pale,27);arrow(s,4.42,2.42,0.66,C.muted);block(s,'pack + scales\n+ metadata + zlib',5.24,1.91,3.16,1.03,C.sand,18);arrow(s,8.57,2.42,0.66,C.muted);block(s,'reload into\nfrozen base model',9.39,1.91,3.25,1.03,C.pale,18);
 label(s,'Before entropy coding',0.67,3.50);addText(s,'≈ b × P bits\nP = original adapter value count',0.67,3.92,5.25,0.86,{fontSize:19});
 label(s,'Measured rate',7.03,3.50,4.0,C.amber);formula(s,'R = 8 × file bytes / P',7.03,3.93,5.00,0.83,C.sand,24);
 callout(s,'Same learned update; only the code changes.',5.62,C.teal);
}
// 6 relative info / rate distortion
{
 const s=baseSlide('PART I · FOUNDATIONS','Relative information as rate–distortion',62,[
  'Rate–distortion pose la bonne question : représentation la plus courte sous une contrainte d’erreur.',
  'Mais l’erreur doit être comportementale : ici, ce que le modèle fait après rechargement.',
  'Le base model, le layout LoRA et le décodeur sont déjà connus : ils ne comptent pas dans le message.',
  'C’est exactement le sens de relative information dans ce travail : coût conditionnel au récepteur et à l’usage.',
  'R* reste un minimum sur notre famille de codecs testés, pas une borne de Shannon universelle.'
 ],'Rapport §2.5 et §3.3 ; Cover & Thomas (2006).');
 label(s,'Side information',0.67,2.02,4.2,C.teal);block(s,'base model\nadapter layout\ndecoder',0.67,2.49,4.42,1.80,C.pale,20);
 label(s,'Message',5.55,2.02,3.0,C.amber);block(s,'serialized\nadapter update',5.55,2.49,2.75,1.80,C.sand,21);
 label(s,'Distortion',8.80,2.02,3.0,C.teal);block(s,'lost held-out\nbehavior',8.80,2.49,3.84,1.80,C.pale,21);
 formula(s,'R*(0.90) = min measured rate  subject to ≥ 90% retained gain',1.17,4.88,11.0,0.68,'F4F7F7',19);
}
// 7 protocol
{
 const s=baseSlide('PART I · FINE-TUNING','An exact rate for a fixed learned update',82,[
  'On entraîne un adapter rank-16 une seule fois, puis on fige ce checkpoint.',
  'Pour chaque point : encoder → écrire un vrai fichier → recharger → évaluer sur du held-out.',
  'Donc chaque point est une autre représentation du même update, pas un nouvel entraînement.',
  'Retention = part du gain sur le modèle gelé qui survit à la compression.',
  'R*(0.90) = plus petit taux mesuré qui conserve au moins 90 % du gain.',
  'Important : ce seuil dépend du modèle, du codec, de l’architecture LoRA et de la métrique.'
 ],'Rapport §3.3 et annexe Codec ladder.');
 block(s,'Fixed adapter',0.67,2.08,2.45,0.72);arrow(s,3.25,2.44,0.48);block(s,'Encode file',3.89,2.08,2.45,0.72);arrow(s,6.47,2.44,0.48);block(s,'Reload',7.11,2.08,2.12,0.72);arrow(s,9.36,2.44,0.48);block(s,'Evaluate',10.00,2.08,2.62,0.72);
 formula(s,'Retention = (Ucompressed − Ubase) / (Uraw − Ubase)',2.05,3.37,9.25,0.78,C.pale,22);
 formula(s,'R*(0.90) = min { R : Retention(R) ≥ 0.90 }',1.60,4.62,10.20,0.78,C.sand,22);
 foot(s,'C: tested codecs · M: frozen model · U: scored behavior · held-out evaluation');
}
// 8 failed allocation
{
 const s=baseSlide('PART I · A FAILED ALLOCATION RULE','Weight error misses behavioral damage',55,[
  'Premier réflexe : distribuer les bits pour minimiser l’erreur de reconstruction des poids.',
  'Contre-exemple net : l’allocation adaptative obtient une RMSE similaire mais détruit presque tout le gain.',
  'Le simple sign code uniforme conserve ~85.7 % du gain, contre ~2.6 %.',
  'Conclusion précise : la RMSE globale des poids n’est pas une distortion suffisante pour notre usage.',
  'Donc le comportement doit être mesuré au niveau de la sortie du modèle.'
 ],'Rapport §3.4 ; media/fineqcomp/plots/mdl_vs_uniform.png.');
 addBarChart(s,['Uniform sign code','Adaptive allocation'],[{name:'Retained task gain',values:[0.857,0.026],color:C.teal}],0.67,2.04,7.35,3.25,1.0,'0.0%',false);
 addText(s,'≈ 1 bit / value',8.75,2.15,3.4,0.55,{fontSize:24,color:C.teal,bold:true});
 addText(s,'Similar weight RMSE\n83 points apart in\nretained task gain',8.75,3.17,3.45,1.50,{fontSize:22,bold:true});
 callout(s,'Behavior must be measured at the model’s output.',5.68,C.teal);
}
// 9 receiver dep
{
 const s=baseSlide('PART I · RECEIVER DEPENDENCE','The corpus ordering changes with the model',72,[
  'Hypothèse alternative : chaque dataset aurait un coût d’adapter intrinsèque.',
  'Test : mêmes cinq corpus, même protocole, mais deux base models gelés.',
  'L’ordre change : instruction est bon marché sur Mistral mais plus cher sur Qwen ; summarization bouge fortement aussi.',
  'Donc le corpus seul ne détermine pas R* dans ce protocole.',
  'C’est la preuve empirique la plus directe du caractère relatif au récepteur.'
 ],'Rapport §3.7, tableau model–corpus rate.');
 addBarChart(s,['Instruction','Summary','Math','Code','Dialogue'],[{name:'Mistral-7B',values:[.643,.652,.737,.891,.913],color:C.teal},{name:'Qwen2.5-7B',values:[.774,.388,.411,.668,1.176],color:C.amber}],0.67,1.93,11.65,3.83,1.35,'0.000',true);
 foot(s,'R*(0.90), bits per original adapter value · 3 seeds per corpus/model');
}
// 10 predictor
{
 const s=baseSlide('PART I · CURRENT HYPOTHESIS','Correction spectra are a promising predictor',78,[
  'Si le coût est relatif au modèle, il faut regarder ce que le dataset demande à ce modèle de corriger.',
  'Au niveau de la tête de sortie, le gradient token se factorise en représentation cachée × erreur de prédiction.',
  'On résume les directions de correction par un second moment et son spectre.',
  'Le log-volume ordonne bien les conditions à l’intérieur d’un modèle : Spearman ρ = 0.764.',
  'RMSE family-held-out = 0.187 contre 0.264 pour un fit model-only.',
  'Mais c’est encore un signal de campagne ; la vraie validation doit être prospective.'
 ],'Rapport §3.7, correction-spectrum screen.');
 formula(s,'gᵢₜ ≈ hᵢₜ ⊗ (pᵢₜ − eᵧ)',0.67,2.14,7.45,0.82,C.pale,22);
 formula(s,'Icorr = Σⱼ log(1 + λⱼ)',0.67,3.45,7.45,0.82,C.sand,22);
 addText(s,'Large corrections across\nmany independent directions',0.67,4.68,7.45,0.88,{fontSize:19,color:C.muted});
 addText(s,'0.764',8.82,2.08,3.35,0.88,{fontSize:45,bold:true});addText(s,'within-model Spearman ρ',8.82,2.93,3.40,0.48,{fontSize:16});
 addText(s,'22 conditions\n7 task families\n2 frozen 7B models',8.82,3.95,3.35,1.25,{fontSize:19,bold:true});
}
// 11 Part II
sectionDivider('PART II','Reasoning states','At inference time the information object is no longer a parameter update: it is an intermediate state that should let the model continue the computation.',[
 'Deuxième piste née en parallèle : est-ce que le raisonnement expose des états intermédiaires compacts et naturels ?',
 'Reasoning state : une représentation intermédiaire supposée suffisante pour la prochaine étape utile.',
 'Il faut distinguer trois choses : structure décodable, état causalement réutilisable, et état stable sous mises à jour répétées.',
 'Comme en Partie I, « utile » dépend de l’objectif qui va lire l’état.'
],'Rapport §4.1–4.2 et §4.6–4.8.',C.amber);
// 12 reasoning foundations
{
 const s=baseSlide('PART II · FOUNDATIONS','From tokens to a reasoning state',68,[
  'Un LLM autoregressif transforme le préfixe en états cachés puis en distribution du prochain token.',
  'Chaque token généré rallonge le préfixe et déclenche un nouveau forward pass.',
  'Une étape sémantique peut donc couvrir plusieurs tokens — token boundary ≠ reasoning-state boundary.',
  'Reasoning state : ce qui doit être disponible pour que la prochaine computation utile reste possible.',
  'Le point de départ expérimental : chercher si de tels états produisent une décomposition stable du CoT.'
 ],'Rapport §2.1–2.2 et §4.1–4.2.');
 block(s,'Prefix tokens',0.67,2.05,2.55,0.83,C.pale,19);arrow(s,3.36,2.46,0.55);block(s,'Transformer',4.08,2.05,2.80,0.83,C.sand,20);arrow(s,7.02,2.46,0.55);block(s,'Hidden activations',7.74,2.05,2.70,0.83,C.pale,18);arrow(s,10.59,2.46,0.55);block(s,'Next token',11.30,2.05,1.32,0.83,C.sand,18);
 formula(s,'p(x₁:T) = ∏ₜ p(xₜ | x<ₜ)',1.13,3.50,5.15,0.78,'F4F7F7',23);
 label(s,'Candidate reasoning state',7.12,3.48,4.6,C.amber);addText(s,'Not just “something decodable” —\nit must support the next useful computation.',7.12,3.91,5.08,1.00,{fontSize:19,bold:true});
 callout(s,'A semantic step can span many token steps.',5.68,C.amber);
}
// 13 build CoT
{
 const s=baseSlide('PART II · FOUNDATIONS','How the model builds a chain of thought',64,[
  'On note x le problème, z la trace intermédiaire et y la réponse finale.',
  'La trace est générée token par token ; elle ne vient pas avec des frontières sémantiques données.',
  'Exemple simple : « May = 24 » peut nécessiter plusieurs tokens avant d’être disponible comme fait utilisable.',
  'On peut écrire la factorisation probabiliste, mais en génération standard on suit une seule trajectoire.',
  'C’est ce décalage entre token steps et semantic states que les expériences de segmentation testent.'
 ],'Rapport §2.1–2.2 et §4.1.');
 formula(s,'p(z, y | x) = [∏ₜ p(zₜ | x, z<ₜ)] · p(y | x, z)',0.67,1.95,11.65,0.88,C.pale,22);
 label(s,'Token trajectory',0.67,3.33,4.2,C.teal);addText(s,'“… half as many … 24 … total … 72”',0.67,3.76,5.35,0.62,{fontSize:21,bold:true});
 label(s,'Semantic state hypothesis',6.85,3.33,5.0,C.amber);addText(s,'April = 48\nMay = 24\nTotal = 72',6.85,3.72,4.65,1.16,{fontSize:23,bold:true});
 callout(s,'Do natural internal boundaries line up across different utilities?',5.63,C.amber);
}
// 14 boundaries
{
 const s=baseSlide('PART II · REASONING TRAJECTORIES','Different objectives select different boundaries',78,[
  'On teste quatre utilités sur les mêmes gaps entre tokens : answer progress, symbolic update, correctness et PCA geometry.',
  'Même budget de frontières pour tout le monde : comparaison équitable.',
  'Les détecteurs supervisés retrouvent très bien leur propre cible.',
  'Mais les oracles eux-mêmes se recouvrent peu : F1 seulement ~0.10–0.21 dans ±4 tokens.',
  'La meilleure règle testée qui essaie de servir tous les objectifs n’atteint que 0.020 en worst-objective utility.',
  'Conclusion : pas de décomposition canonique évidente pour les utilités testées.'
 ],'Rapport §4.3.');
 addBarChart(s,['Answer','Symbolic update','Correctness','PCA geometry'],[{name:'Own-objective detector AUC',values:[.999,.984,.849,.868],color:C.amber}],0.67,2.0,7.60,3.35,1.10,'0.000',false);
 addText(s,'0.098–0.210',8.70,2.05,3.50,0.62,{fontSize:27,color:C.amber,bold:true});addText(s,'oracle-boundary F1\nwithin ±4 tokens',8.70,2.68,3.55,0.85,{fontSize:17});
 addText(s,'0.020',8.70,4.05,3.50,0.62,{fontSize:30,bold:true});addText(s,'best worst-objective utility\namong tested rules',8.70,4.65,3.55,0.88,{fontSize:17});
}
// 15 handoff
{
 const s=baseSlide('PART II · A CAUSAL STATE TEST','An explicit handoff restores composition',78,[
  'Assay contrôlé : huit états, petit programme, puis lookup état→réponse.',
  'Qwen2.5-32B sait appliquer une update locale quand l’état lui est fourni.',
  'À horizon 2, il infère l’endpoint ~77 %, mais le prompt one-pass endpoint+lookup tombe à 13.44 %.',
  'Intervention : faire prédire l’état, effacer l’historique, donner cet état à un nouvel appel.',
  'La précision revient à 76.98 %, et un endpoint correct fourni donne 100 %.',
  'Donc le problème ressemble ici à du routing/composition, pas seulement à de l’information absente.'
 ],'Rapport §4.6, native state and explicit handoff.');
 addText(s,'Eight-state program → state-to-answer lookup',0.67,1.72,11.6,0.32,{fontSize:13,color:C.muted});
 addBarChart(s,['One-pass lookup','Predicted-state handoff','Correct-state handoff'],[{name:'Final-answer accuracy',values:[.1344,.7698,1.0],color:C.amber}],0.67,2.05,11.65,3.55,1.12,'0.00%',false);
 callout(s,'Fresh call: predicted state only; original history deleted.',5.68,C.amber);
}
// 16 proof states
{
 const s=baseSlide('PART II · CONTROLLED PROOF STATES','Capacity and stable names matter separately',82,[
  'Quatre faits donnent 16 états possibles : sous full support, il faut au moins 4 bits pour les identifier exactement.',
  '3 bits imposent une collision : impossible de récupérer tous les états.',
  '4-bit canonical = un nom stable par état ; 5-bit padded garde cette stabilité.',
  '5-bit path-aliased a autant de capacité mais donne plusieurs noms au même état selon l’histoire.',
  'Canonical/padded restent exacts jusqu’à H=256 ; path-aliased tombe à 30–40 % dès depth 3.',
  'Même nombre de bits ≠ même interface causale.'
 ],'Rapport §4.7, rate, shared meaning, and closure.');
 addTable(s,[['Code','Bits','Naming','Exact state'],['Lossy','3','Collisions required','Cannot recover all 16'],['Canonical','4','One name per state','100% through H=256'],['Padded','5','Same stable naming','100% through H=256'],['Path-aliased','5','Name depends on path','30–40% at depth 3']],0.67,2.08,11.65,3.20,[2.25,0.95,3.55,4.90]);
 callout(s,'At five bits, semantics—not capacity—changes recovery.',5.72,C.amber);
}
// 17 local errors
{
 const s=baseSlide('PART II · LIMIT OF THE INTERFACE','Local errors accumulate under repeated use',60,[
  'Sur une tâche register plus variée, l’interface est correcte localement ~89 % du temps.',
  'La mesure locale repart de l’état effectivement fourni : on ne double-compte pas une erreur antérieure.',
  'Mais après 32 étapes auto-alimentées, la réponse finale n’est correcte que 7.92 % du temps.',
  'Chance = 6.25 %, one-pass = 5.83 % : le long horizon est quasiment perdu.',
  '0.89^31 ≈ 2.7 % est seulement une intuition si les erreurs étaient indépendantes, pas un modèle ajusté.',
  'Le vrai critère est l’exécution fermée complète.'
 ],'Rapport §4.7 et local/global reliability experiment.');
 addText(s,'≈ 89%',0.67,2.14,5.15,0.90,{fontSize:48,color:C.amber,bold:true});addText(s,'correct local transitions',0.67,3.03,5.15,0.48,{fontSize:20});
 addText(s,'7.92%',7.05,2.14,5.15,0.90,{fontSize:48,color:C.ink,bold:true});addText(s,'correct final answers at H=32',7.05,3.03,5.15,0.48,{fontSize:20});
 formula(s,'ŝₜ₊₁ = f(ŝₜ, xₜ₊₁)  →  feed predicted state back in',1.24,4.15,10.80,0.78,C.pale,20);
 addText(s,'Chance: 6.25%   ·   One-pass reasoning: 5.83%',0.67,5.25,11.65,0.38,{fontSize:15,color:C.muted});
}
// 18 bridge
{
 const s=baseSlide('SYNTHESIS · ONE COMPLETED COMPARISON','Reasoning and answer rates also reverse',68,[
  'Connexion la plus directe entre les deux axes : même protocole de compression d’adapter sur MetaMathQA.',
  'Mais on score séparément les tokens de reasoning et ceux de final answer.',
  'Mistral : reasoning coûte 1.070 bits/value, answer 0.578.',
  'Qwen : reasoning coûte 0.471, answer 0.575 — l’ordre s’inverse.',
  'Donc même au sein d’un même dataset, le coût dépend du base model et de l’utilité que l’on veut préserver.',
  'Attention : c’est un taux de stockage d’update, pas la longueur informationnelle d’une CoT.'
 ],'Rapport §5.1–5.3.');
 addBarChart(s,['Mistral-7B','Qwen2.5-7B'],[{name:'Reasoning-span gain',values:[1.070,.471],color:C.teal},{name:'Answer-span gain',values:[.578,.575],color:C.amber}],0.67,2.0,11.65,3.75,1.25,'0.000',true);
 foot(s,'R*(0.90), bits per adapter value · MetaMathQA · next-token gain');
}
// 19 synthesis + next tests
{
 const s=baseSlide('SYNTHESIS','What the experiments establish — and what to test next',62,[
  'Fine-tuning : on a un taux rechargeable et comportemental ; le dataset seul ne fixe pas ce taux.',
  'Reasoning : des structures sont décodables, mais cela ne garantit ni réutilisation causale ni stabilité récursive.',
  'Lecture commune : l’information utile est relative à un récepteur et une tâche ; sous récursion, la règle d’update devient essentielle.',
  'Ce n’est pas encore une loi prédictive unique entre les deux axes.',
  'Prochain test fort : prédire R* prospectivement à partir des correction spectra, avant d’observer les taux.',
  'Autre pont : compresser un reasoning adapter et suivre séparément decoding, handoff et answer behavior.'
 ],'Rapport §3.8, §4.8 et §5.2–5.4.');
 label(s,'Established',0.67,1.92,4.0,C.teal);addText(s,'• receiver-dependent adapter rate\n• objective-dependent reasoning partitions\n• decodable ≠ causally reusable\n• recursive reliability is separate',0.67,2.40,5.45,2.60,{fontSize:19,bold:true,breakLine:true});
 label(s,'Next falsifiable tests',7.03,1.92,4.4,C.amber);addText(s,'01  predict rates before training\n\n02  compress one reasoning adapter\n     and compare failure points',7.03,2.40,5.10,2.60,{fontSize:20,bold:true,breakLine:true});
 callout(s,'Common interpretation now; common predictive law still open.',5.70,C.teal);
}
// 20 conclusion
{
 const s=baseSlide('CONCLUSION','Useful information depends on its use',28,[
  'Contribution centrale : remplacer des proxies vagues d’« information » par des tests comportementaux concrets.',
  'Fine-tuning : mesurer le message supplémentaire nécessaire à un base model donné.',
  'Reasoning : demander si un reasoning state permet réellement de continuer le calcul.',
  'Dans les deux cas : receiver + utility définissent ce qui compte comme information utile.',
  'Sous utilisation répétée, il faut en plus que la représentation reste correctement mise à jour.',
  'Dernière phrase : « information is not in the object alone; it is in the object-for-a-use ». Merci.'
 ],'Abstract, §5 et §6.',{dark:true});
 addText(s,'Receiver',0.67,2.18,11.3,0.60,{fontSize:34,color:'78C8BE',bold:true});addText(s,'Which model must use the information?',0.67,2.83,11.0,0.48,{fontSize:21,color:C.white});
 addText(s,'Task and update rule',0.67,4.15,11.3,0.60,{fontSize:34,color:'E4AA79',bold:true});addText(s,'Which behavior must survive, and for how long?',0.67,4.82,11.0,0.48,{fontSize:21,color:C.white});
}
// 21 backup exact finite control
{
 const s=baseSlide('BACKUP · EXACT FINITE CONTROL','Equal snapshot information, unequal memory',0,[
  'Contrôle fini exact, pas une expérience LLM.',
  'Full history et suffixe 12-bit ont initialement le même support et la même information instantanée sur l’état.',
  'Leurs règles d’update diffèrent ensuite : le suffixe oublie les observations anciennes.',
  'À H=32 : regret 2.20 contre 30.91 ; pooled suffix regret 7.19× plus grand.',
  'Message : snapshot information ne suffit pas à définir une mémoire utile ; la dynamique de mise à jour compte.'
 ],'Rapport §4.5.',{backup:true});
 addBarChart(s,['Full history','12-bit text suffix'],[{name:'Regret at horizon 32',values:[2.20,30.91],color:C.amber}],0.67,2.1,7.25,3.35,35,'0.00',false);
 addText(s,'Same initial information',8.55,2.30,3.65,0.50,{fontSize:22,bold:true});addText(s,'I(state; memory) = 2.512 bits\nPath leakage = 1.781 bits',8.55,3.38,3.70,1.05,{fontSize:18});
}
// 22 backup diversity
{
 const s=baseSlide('BACKUP · DIVERSITY','Distinct examples at fixed training exposure',0,[
  '2 000 optimizer steps et 32 000 présentations sont fixes dans toutes les conditions.',
  'Le taux moyen augmente globalement avec le nombre d’exemples distincts, mais pas de manière monotone.',
  'Fit sur 15 runs : R²=0.78, donc tendance interne à la campagne, pas loi d’échelle générale.',
  'Contrôle séparé de diversité de contenu : 0.682 → 0.742 bits/value sur six seeds.',
  'Les réplications SQL/XBRL montrent que la relation dépend encore du domaine et de la couverture.'
 ],'Rapport §3.5 et annexe.',{backup:true});
 addBarChart(s,['2,000','4,000','8,000','16,000','32,000'],[{name:'Mean R*(0.90)',values:[.645,.740,.709,.832,1.002],color:C.teal}],0.67,2.06,11.65,3.75,1.2,'0.000',false);
}
// 23 backup codec
{
 const s=baseSlide('BACKUP · MEASUREMENT CONTRACT','What the codec and threshold count',0,[
  'Le fichier contient facteurs quantifiés, scales, metadata, bit packing et zlib.',
  'Sous 1 bit/value, le codec peut supprimer des directions de rang A/B appariées.',
  'La normalisation reste le nombre de valeurs de l’adapter original.',
  'Le base model partagé est explicitement exclu du budget.',
  'R* est le minimum atteignable sur la ladder testée, pas le minimum de description global.',
  'Comparer des rangs différents demande aussi de regarder la taille totale du fichier.'
 ],'Rapport §3.3 et annexe Codec ladder.',{backup:true});
 label(s,'Included in the file',0.67,2.18,4.1,C.teal);addText(s,'Quantized factors\nScales and metadata\nBit-packed + zlib payload',0.67,2.67,5.15,1.70,{fontSize:20,bold:true});
 label(s,'Conditioned on',7.03,2.18,4.1,C.amber);addText(s,'Shared frozen base model\nFixed adapter checkpoint\nNamed held-out utility',7.03,2.67,5.12,1.70,{fontSize:20,bold:true});
 callout(s,'R* is attainable within the tested codec family.',5.62,C.teal);
}
// 24 backup metrics
{
 const s=baseSlide('BACKUP · METRIC DEFINITIONS','Prediction, accuracy, and state recovery',0,[
  'NLL, exact match, retained gain, exact state et boundary AUC/F1 répondent à des questions différentes.',
  'Retained gain normalise toujours une utility sous-jacente : elle doit être nommée.',
  'Exact state exige que le ledger fini complet soit correct.',
  'Boundary AUC mesure un ranking ; F1 mesure l’accord de points sélectionnés.',
  '90 % de gain NLL conservé ne veut pas dire 90 % d’accuracy finale.'
 ],'Rapport §2.7, §3.3, §4.3 et §4.7.',{backup:true});
 addTable(s,[['Metric','Question'],['Held-out NLL','Does the model predict the scored tokens?'],['Retained gain','How much improvement over the base survives?'],['Answer exact match','Is the final task answer correct?'],['Exact state','Does the complete supplied ledger match?'],['Boundary AUC / F1','Can we detect a target / do selected gaps agree?']],0.67,2.04,11.65,3.68,[3.55,8.10]);
}
// 25 backup judged spans
{
 const s=baseSlide('BACKUP · JUDGED REASONING SPANS','Semantic boundaries are decodable too',0,[
  'Un grand modèle juge neuf types d’édition dans des traces SmolLM courtes et correctes.',
  'Après alignement/filtrage : 1 761 spans sur 58 traces.',
  'Détecteur latent : AUC 0.982 ; loin des fins de phrase : 0.969.',
  'Mais TF–IDF lexical atteint déjà 0.892 : signal pas uniquement latent.',
  'Le transfert vers les quatre objectifs opérationnels reste faible.',
  'Donc structure sémantique apprenable, mais pas preuve d’une décomposition unique.'
 ],'Rapport §4.4.',{backup:true});
 addBarChart(s,['Latent detector','Away from sentence ends','Lexical TF–IDF'],[{name:'Held-out boundary AUC',values:[.982,.969,.892],color:C.amber}],0.67,2.05,11.65,3.70,1.1,'0.000',false);
}
// 26 backup predictor screen
{
 const s=baseSlide('BACKUP · PREDICTOR COMPARISON','Correction-spectrum screen and its limits',0,[
  '22 conditions distinctes, sept familles de tâches, dix mesures candidates.',
  'Le p ajusté tient compte du screening de plusieurs mesures.',
  'RMSE = leave-one-family-out : plus informatif qu’une simple corrélation in-sample, mais même campagne et mêmes familles de modèles.',
  'Effective rank a la meilleure RMSE ; log-volume la meilleure ordering within-model.',
  'Conclusion prudente : signal prometteur, prochaine étape = fixer la mesure et tester des conditions inédites.'
 ],'Rapport §3.7, table relative-info-screen.',{backup:true});
 addTable(s,[['Measure','Within-model ρ','Adjusted p','Held-out RMSE'],['Correction log-volume','0.764','0.00034','0.187'],['Correction effective rank','0.609','0.0112','0.181'],['Surprise-weighted log-volume','0.614','0.0103','0.204'],['Base target code length','0.200','0.524','0.261'],['Model-only fit','—','—','0.264']],0.67,2.02,11.65,3.70,[4.65,2.35,2.02,2.63]);
}

pptx.writeFile({ fileName: require('path').resolve(process.cwd(),'soutenance/output/soutenance_joey_david_v2.pptx') });
