from pathlib import Path
p=Path('report/soutenance/.build/build.mjs')
s=p.read_text().replace("bg:'#FAFAF7'", "bg:'#FFFFFF'")
s=s.replace("const p=Presentation.create", "const assets=Object.fromEntries(await Promise.all((await fs.readdir(path.join(ROOT,'.build','math'))).filter(n=>n.endsWith('.png')).map(async n=>[n.slice(0,-4),await fs.readFile(path.join(ROOT,'.build','math',n))])));\nconst p=Presentation.create")
s=s.replace("function rule(s,x,y,w", "function equation(s,name,x,y,w,h,alt=name){s.images.add({blob:assets[name],contentType:'image/png',alt,fit:'contain',position:{left:x,top:y,width:w,height:h}});}\nfunction rule(s,x,y,w")
s=s.replace("({8:'Retained task gain',11:'Detector AUC',12:'Final-answer accuracy',19:'Regret',23:'Boundary AUC'})[index]", "({'Retained task gain':'Retained task gain','Own-objective detector AUC':'Detector AUC','Final-answer accuracy':'Final-answer accuracy','Regret at horizon 32':'Regret','Held-out boundary AUC':'Boundary AUC'})[series[0].name]")
s=s.replace("'soutenance_joey_david.pptx'", "'soutenance_joey_david_v2.pptx'")
s=s.replace("text(s,'pθ(x₁,…,xT) = ∏ₜ pθ(xₜ | x₁,…,xₜ₋₁)',64,195,1120,85,47,C.teal,true)", "equation(s,'autoregressive',64,184,1050,104,'Autoregressive factorization over tokens')")
s=s.replace("text(s,'W′ = W + (α/r) BA',64,190,1140,80,48,C.teal,true)", "equation(s,'lora',64,185,1152,92,'Low-rank update and dimensions of A and B')")
s=s.replace("text(s,'d × d values',64,484,560,42,27,C.muted,false,'center');text(s,'2dr values, with r ≪ d',664,484,552,42,27,C.muted,false,'center')", "equation(s,'lora_count',210,478,860,67,'Trainable value count P equals r times the sum of matrix dimensions')")
# Add a quantitative compression slide after the LoRA definition.
needle="s=slide('Coding and rate–distortion'"
extra="""s=slide('The adapter’s numerical code determines its rate', 'FOUNDATIONS · LORA COMPRESSION',55,`The low-rank factorization reduces the number P of values we need to store. It does not specify how many bits each value needs. For a uniform b-bit quantizer, the packed payload contains bP bits, plus scales and metadata. The hats denote the dequantized factors the receiver actually uses. Our implementation then applies zlib to the complete payload. Repeated codes and compressible structure can reduce the resulting file size. We measure that size directly and reload it. The reconstruction of BA can differ from the original, so the decisive question is what happens to the model’s output. Nothing here claims that low rank alone guarantees a particular behavioral compression rate.`, 'Report §2.3–2.5, §3.3 and Appendix Codec ladder. The fixed-width storage equation is direct parameter accounting.');
equation(s,'quantized',64,191,1152,97,'Reconstructed LoRA update and fixed-width bit count');
label(s,'Before entropy coding',64,332);text(s,'b bits per value, plus the information\\nneeded to decode the numbers',64,383,548,105,29);label(s,'After packing and zlib',700,332);text(s,'The actual file length determines R.\\nThe original value count P stays fixed.',700,383,516,105,29);equation(s,'rate',64,510,1152,76,'Exact serialized rate in bits per original adapter value');note(s,'Backbone weights remain shared. This rate counts only the complete adapter file.');
"""
s=s.replace(needle,extra+needle)
# Formal coding definitions, with less prose.
start=s.index("text(s,'Ideal code length'")
end=s.index("s=slide('Reasoning as sequential computation'",start)
s=s[:start]+"""equation(s,'entropy',64,199,1135,90,'Ideal code length and entropy as expected code length');label(s,'Lossy coding',64,339);text(s,'Minimize the message length\\nunder an error constraint.',64,390,535,100,32,C.amber,true);label(s,'Side information',700,339);text(s,'Both sides already have the base model.\\nOnly the update enters the file budget.',700,390,510,111,29);callout(s,'The distortion measure specifies the behavior to preserve.');
"""+s[end:]
# Replace the old CoT intro with the user's report graph and add its generative construction.
start=s.index("s=slide('Reasoning as sequential computation'")
end=s.index("s=slide('An exact rate",start)
s=s[:start]+"""s=slide('A chain of thought for April and May sales', 'FOUNDATIONS · COT EXAMPLE',55,`Consider the example from the report: Natalia sold 48 clips in April, then half as many in May. The goal is the total. The graph separates facts read from the prompt from derived claims. The first calculation gives May as 24. The final calculation combines that with April to get 72. A written chain of thought can spell out these intermediate claims before the answer. This graph describes an idealized dependency structure. It is the hypothesis that motivated my trajectory work, not an observed circuit inside the model. The next slide shows how an autoregressive model actually generates the text that expresses such a computation.`, 'Report §4.2, Figure 8, Idealized solution object as a DAG. Original TikZ graph reused from tex/04_reasoning_trajectories.tex.');
text(s,'April: 48 clips\\nMay: half as many\\n\\nTotal over both months?',64,232,322,234,31,C.ink,true);equation(s,'solution_graph',390,192,830,382,'Report Figure 8: n_Apr=48, n_May=n_Apr/2=24, total=n_Apr+n_May=72');callout(s,'Intermediate claims make the computation explicit.',568,C.amber);note(s,'The report’s hypothetical solution graph. Its nodes need not coincide with token or hidden-state boundaries.');
s=slide('How the model builds a chain of thought', 'FOUNDATIONS · AUTOREGRESSIVE COMPUTATION',65,`Let x be the problem, z the intermediate trace, and y the final answer. The joint probability factorizes into next-token probabilities for the trace and the probability of the answer given that trace. Generation samples, or greedily selects, a token and appends it to the context. Each added token gives the transformer another forward pass. The semantic node n May equals 24 can require several tokens, so semantic steps and token steps differ. Training on demonstrations maximizes this joint likelihood. With final-answer rewards, a reinforcement learning objective instead weights generated traces by their outcomes. Conceptually we can marginalize over traces, but standard generation samples a path rather than evaluating that sum. The displayed answer distribution is the distribution induced by this CoT procedure.`, 'Report §2.1–2.2 and §4.1. Joint factorization and marginalization follow the probability chain rule.');
equation(s,'cot_joint',64,191,1152,112,'Joint probability of the reasoning trace and answer');label(s,'Generate a token, then extend the context',64,340,1120,C.amber);equation(s,'cot_generate',64,392,1152,74,'Sample a next reasoning token and append it to the prefix');text(s,'Each token adds a transformer pass.\\nOne semantic step can span many tokens.',64,507,610,97,28);equation(s,'cot_marginal',736,504,460,66,'CoT answer distribution marginalizes over possible traces');text(s,'Generation samples a path through this sum.',726,579,490,41,20,C.muted);
"""+s[end:]
# Formal operational optimization and retained utility.
start=s.index("text(s,'R = 8 × file bytes")
end=s.index("s=slide('Weight error",start)
s=s[:start]+"""equation(s,'retention',260,309,760,98,'Gain retained after compression relative to the raw adapter');equation(s,'constraint',64,448,1152,93,'Minimum measured rate over the codec family subject to 90 percent retained utility');note(s,'C: tested codecs     M: frozen model     U: scored behavior     L: held-out loss');
"""+s[end:]
# Use typeset correction equations, including the eigenvalue expression.
start=s.index("text(s,'gₜ = hₜ")
end=s.index("text(s,'0.764'",start)
s=s[:start]+"""equation(s,'corr_gradient',64,212,750,93,'Projected token-gradient second moment');equation(s,'corr_volume',64,356,760,100,'Correction log-volume equals the sum of log one plus eigenvalues');text(s,'Large corrections across many directions',64,481,755,54,26,C.muted);"""+s[end:]
# Add the self-fed state equation to the reliability result.
s=s.replace("rule(s,64,440,1152);text(s,'Chance: 6.25%       One-pass reasoning: 5.83%',64,469,1152,57,29,C.muted)", "equation(s,'recurrence',145,424,990,74,'Predicted states are fed into the next update before final readout');text(s,'Chance: 6.25%       One-pass reasoning: 5.83%',64,512,1152,40,25,C.muted)")
# Keep the talk at about twenty minutes despite the added explanation.
for old,new in [("PSL · 2026',30,","PSL · 2026',25,"),("'RESEARCH QUESTION',40,","'RESEARCH QUESTION',30,"),("'FOUNDATIONS 1 / 4',55,","'FOUNDATIONS · LANGUAGE MODELS',50,"),("'FOUNDATIONS 2 / 4',80,","'FOUNDATIONS · LOW-RANK ADAPTATION',70,"),("'FOUNDATIONS 3 / 4',80,","'FOUNDATIONS · INFORMATION THEORY',60,"),("'I · CURRENT HYPOTHESIS',90,","'I · CURRENT HYPOTHESIS',80,"),("'CONCLUSION',30,","'CONCLUSION',25,")]:
 s=s.replace(old,new)
p.write_text(s)
