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
