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
