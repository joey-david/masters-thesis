import matplotlib.pyplot as plt
import numpy as np
from pathlib import Path

OUT = Path(__file__).resolve().parent / 'assets'
OUT.mkdir(parents=True, exist_ok=True)
plt.rcParams.update({
    'font.family': 'DejaVu Sans',
    'font.size': 14,
    'axes.titlesize': 16,
    'axes.labelsize': 13,
    'xtick.labelsize': 11,
    'ytick.labelsize': 11,
})
NAVY='#17324d'; TEAL='#1f8a8a'; ORANGE='#d97745'; GRAY='#7b8794'; LIGHT='#dbe4ea'; RED='#b55353'; GREEN='#4d8f62'; INK='#17212b'

def clean(ax):
    ax.spines[['top','right']].set_visible(False)
    ax.grid(alpha=.14)

def save(fig, name):
    fig.tight_layout()
    fig.savefig(OUT / name, dpi=240, bbox_inches='tight', transparent=True)
    plt.close(fig)

# Distinct-example scaling
x=np.array([2000,4000,8000,16000,32000])
y=np.array([0.645,0.740,0.709,0.832,1.002])
lo=np.array([0.611,0.712,0.671,0.773,0.983])
hi=np.array([0.700,0.787,0.747,0.908,1.015])
fig,ax=plt.subplots(figsize=(7.2,4.3))
ax.errorbar(x,y,yerr=[y-lo,hi-y],fmt='o-',lw=2.7,ms=7,capsize=4,color=TEAL)
ax.set_xscale('log',base=2); ax.set_xticks(x); ax.set_xticklabels(['2k','4k','8k','16k','32k'])
ax.set_xlabel('distinct training examples'); ax.set_ylabel(r'$R^*(0.90)$  [bits / LoRA value]')
ax.text(2050,1.035,r'$R^2=0.78$',fontsize=13,fontweight='bold',color=INK)
clean(ax); save(fig,'distinct_rate.png')

# Receiver dependence
corpora=['Instruction','Summarization','Math','Code','Dialogue']
m=[0.643,0.652,0.737,0.891,0.913]
q=[0.774,0.388,0.411,0.668,1.176]
idx=np.arange(len(corpora)); w=.36
fig,ax=plt.subplots(figsize=(7.7,4.6))
ax.bar(idx-w/2,m,w,label='Mistral-7B',color=NAVY)
ax.bar(idx+w/2,q,w,label='Qwen2.5-7B',color=TEAL)
ax.set_xticks(idx); ax.set_xticklabels(corpora,rotation=15,ha='right')
ax.set_ylabel(r'$R^*(0.90)$'); ax.legend(frameon=False,ncol=2,loc='upper left')
ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False)
save(fig,'receiver_dependence.png')

# Correction-spectrum predictor screen
measures=['Correction log-volume','Correction eff. rank','Surprise-weighted\nhidden volume','Base-model\ncode length']
rho=[0.764,0.609,0.614,0.200]
fig,ax=plt.subplots(figsize=(7.5,4.4))
colors=[TEAL,NAVY,GRAY,LIGHT]
ax.barh(np.arange(4),rho,color=colors)
ax.set_yticks(np.arange(4)); ax.set_yticklabels(measures); ax.invert_yaxis(); ax.set_xlim(0,0.85)
ax.set_xlabel('within-model Spearman ρ')
for i,v in enumerate(rho): ax.text(v+.018,i,f'{v:.3f}',va='center',fontsize=12,fontweight='bold',color=INK)
ax.grid(axis='x',alpha=.14); ax.spines[['top','right','left']].set_visible(False)
save(fig,'correction_predictor.png')

# Objective-specific boundary detector AUC
objs=['Answer','Symbolic\nupdate','Correctness','Compression']
sm=[.999,.984,.849,.868]; qw=[.998,.992,.859,.825]
idx=np.arange(4); w=.36
fig,ax=plt.subplots(figsize=(7.4,4.25))
ax.bar(idx-w/2,sm,w,label='SmolLM3-3B',color=NAVY)
ax.bar(idx+w/2,qw,w,label='Qwen3-14B',color=TEAL)
ax.set_xticks(idx); ax.set_xticklabels(objs); ax.set_ylim(.75,1.02); ax.set_ylabel('boundary detector ROC–AUC')
ax.legend(frameon=False,ncol=2,loc='lower left'); ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False)
save(fig,'objective_auc.png')

# Exact finite control
fig,ax=plt.subplots(figsize=(7.0,4.2))
labels=['Full history','12-bit suffix']; vals=[2.20,30.91]
ax.bar([0,1],vals,color=[TEAL,ORANGE],width=.58)
ax.set_xticks([0,1]); ax.set_xticklabels(labels); ax.set_ylabel('closed-loop regret · horizon 32'); ax.set_ylim(0,34)
for i,v in enumerate(vals): ax.text(i,v+1.0,f'{v:.2f}',ha='center',fontweight='bold',fontsize=14,color=INK)
ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False); save(fig,'snapshot_regret.png')

# Native handoff
labels=['Read supplied\nstate','Infer endpoint','Infer + use\nin one pass','Explicit\nhandoff']
vals=[100,76.98,13.44,76.98]
fig,ax=plt.subplots(figsize=(7.4,4.35))
cols=[GREEN,TEAL,RED,NAVY]
ax.bar(np.arange(4),vals,color=cols,width=.65)
ax.set_xticks(np.arange(4)); ax.set_xticklabels(labels); ax.set_ylim(0,110); ax.set_ylabel('accuracy (%)')
for i,v in enumerate(vals): ax.text(i,v+2.5,f'{v:.1f}%',ha='center',fontweight='bold',color=INK)
ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False); save(fig,'native_handoff.png')

# Explicit state codes
labels=['Lossy\n3-bit','Canonical\n4-bit','Padded\n5-bit','Path-aliased\n5-bit']
fig,ax=plt.subplots(figsize=(7.4,4.2))
ax.bar([1,2,3],[97.22,97.22,35.0],color=[TEAL,NAVY,ORANGE],width=.62)
ax.scatter([0],[5],marker='x',s=180,lw=3,color=RED)
ax.text(0,12,'cannot encode\nall 16 states',ha='center',va='bottom',fontsize=11,color=RED)
ax.set_xticks(range(4)); ax.set_xticklabels(labels); ax.set_ylim(0,110); ax.set_ylabel('final accuracy / exactness (%)')
ax.text(1,100,'97.2%',ha='center',fontweight='bold'); ax.text(2,100,'97.2%',ha='center',fontweight='bold'); ax.text(3,38,'30–40%',ha='center',fontweight='bold')
ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False); save(fig,'state_codes.png')

# Local vs global reliability
fig,ax=plt.subplots(figsize=(7.1,4.2))
labels=['1-step\ntransition','32-step\nself-fed','32-step\none-pass','chance']
vals=[89,7.92,5.83,6.25]
cols=[TEAL,ORANGE,GRAY,LIGHT]
ax.bar(range(4),vals,color=cols,width=.62)
ax.set_xticks(range(4)); ax.set_xticklabels(labels); ax.set_ylim(0,100); ax.set_ylabel('accuracy (%)')
for i,v in enumerate(vals): ax.text(i,v+2.4,f'{v:g}%',ha='center',fontweight='bold',color=INK)
ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False); save(fig,'local_global.png')

# Bridge experiment — rate thresholds
labels=['Reasoning','Answer']; m=[1.070,.578]; q=[.471,.575]
idx=np.arange(2); w=.34
fig,ax=plt.subplots(figsize=(6.4,4.1))
ax.bar(idx-w/2,m,w,label='Mistral-7B',color=NAVY); ax.bar(idx+w/2,q,w,label='Qwen2.5-7B',color=TEAL)
ax.set_xticks(idx); ax.set_xticklabels(labels); ax.set_ylabel(r'$R^*(0.90)$  [bits / value]')
ax.legend(frameon=False); ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False)
for i,v in enumerate(m): ax.text(i-w/2,v+.03,f'{v:.3f}',ha='center',fontsize=11)
for i,v in enumerate(q): ax.text(i+w/2,v+.03,f'{v:.3f}',ha='center',fontsize=11)
save(fig,'bridge_rates.png')

# Bridge experiment — reasoning-token gain
full=[.567,.101]; reason=[.568,.100]; idx=np.arange(2); w=.34
fig,ax=plt.subplots(figsize=(6.5,4.1))
ax.bar(idx-w/2,full,w,label='Full response',color=NAVY); ax.bar(idx+w/2,reason,w,label='Reasoning only',color=TEAL)
ax.set_xticks(idx); ax.set_xticklabels(['Mistral-7B','Qwen2.5-7B']); ax.set_ylabel('bits / reasoning token saved')
ax.legend(frameon=False); ax.grid(axis='y',alpha=.14); ax.spines[['top','right']].set_visible(False)
for i,v in enumerate(full): ax.text(i-w/2,v+.012,f'{v:.3f}',ha='center',fontsize=11)
for i,v in enumerate(reason): ax.text(i+w/2,v+.012,f'{v:.3f}',ha='center',fontsize=11)
save(fig,'reasoning_gain.png')
