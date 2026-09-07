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

pptx.writeFile({ fileName: '/mnt/data/soutenance_joey_david_v2_revised_fr_notes.pptx' });
