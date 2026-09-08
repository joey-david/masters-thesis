#!/usr/bin/env python3
"""Regenerate presentation assets from the final report + deterministic diagrams.

Run from the repository root or from soutenance/latex. Requires matplotlib and PyMuPDF.
The generated explanatory diagrams are adaptations of the canonical mechanisms cited on
slides (Transformer, LoRA, QLoRA, quantization), not copied paper figures.
"""
from __future__ import annotations
import os
from pathlib import Path
import math
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, Rectangle, Circle, FancyArrowPatch
import fitz

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
ASSETS = HERE / "assets"
REPORT = ROOT / "masters_thesis_joey_david_final.pdf"
if not REPORT.exists():
    local_report = Path("/mnt/data/report_assets/main.pdf")
    if local_report.exists():
        REPORT = local_report
ASSETS.mkdir(parents=True, exist_ok=True)

INK = "#142E38"; MUTED = "#577079"; TEAL = "#007F7B"; AMBER = "#C97433"
PALE = "#E4F1EE"; SAND = "#F6E9DC"; LINE = "#CBD6D6"; WHITE = "#FFFFFF"


def setup_ax():
    fig, ax = plt.subplots(figsize=(16.72, 9.41), dpi=100)
    fig.patch.set_facecolor(WHITE); ax.set_facecolor(WHITE)
    ax.set_xlim(0, 16.72); ax.set_ylim(0, 9.41); ax.axis("off")
    return fig, ax


def box(ax, x, y, w, h, text, *, fc=WHITE, ec=LINE, fs=18, bold=False, radius=.10, lw=2, color=INK):
    p = FancyBboxPatch((x,y),w,h,boxstyle=f"round,pad=0.02,rounding_size={radius}",facecolor=fc,edgecolor=ec,linewidth=lw)
    ax.add_patch(p); ax.text(x+w/2,y+h/2,text,ha="center",va="center",fontsize=fs,color=color,fontweight="bold" if bold else "normal")
    return p


def arrow(ax, xy1, xy2, *, color=MUTED, lw=2, style="-|>", rad=0.0, ls="-"):
    a = FancyArrowPatch(xy1,xy2,arrowstyle=style,mutation_scale=17,linewidth=lw,color=color,linestyle=ls,connectionstyle=f"arc3,rad={rad}")
    ax.add_patch(a); return a


def save(fig, name):
    fig.savefig(ASSETS/name, dpi=140, bbox_inches="tight", pad_inches=.06, facecolor=WHITE)
    plt.close(fig)


def transformer():
    fig, ax = setup_ax()
    toks=["The","model","reasons","..."]
    x=.65
    for i,t in enumerate(toks):
        box(ax,x+i*.92,6.5,.78,.62,t,fc=PALE,ec=TEAL,fs=14,bold=(i==2),lw=1.6)
    arrow(ax,(4.25,6.81),(5.05,6.81),color=TEAL)
    ax.text(5.65,7.45,"embeddings",ha="center",fontsize=14,color=MUTED,fontweight="bold")
    for i in range(5):
        ax.add_patch(Rectangle((5.2+i*.18,6.25),.12,1.05,facecolor=["#BFD9D7","#95C6C2","#6FB3AE","#3C9690","#177F79"][i],edgecolor="none"))
    arrow(ax,(6.2,6.81),(6.95,6.81),color=TEAL)
    ax.text(9.0,7.72,"Transformer blocks × N",ha="center",fontsize=16,color=INK,fontweight="bold")
    for j in range(3):
        yy=5.65+j*.55
        box(ax,7.15,yy,3.75,.42,"self-attention   +   MLP   +   residual",fc=PALE if j<2 else "#D5EAE7",ec=TEAL,fs=12,lw=1.4)
    ax.text(9.0,5.35,"repeated deep nonlinear computation",ha="center",fontsize=12,color=MUTED)
    arrow(ax,(10.95,6.81),(11.65,6.81),color=TEAL)
    box(ax,11.7,6.28,1.18,1.05,"logits",fc=WHITE,ec=LINE,fs=16,bold=True,lw=1.6)
    arrow(ax,(12.92,6.81),(13.55,6.81),color=TEAL)
    ax.text(14.55,7.55,"softmax",ha="center",fontsize=13,color=MUTED,fontweight="bold")
    vals=[.22,.46,.82,.34,.12]
    for i,v in enumerate(vals):
        ax.add_patch(Rectangle((13.8+i*.30,6.28),.18,v,facecolor=TEAL if i==2 else "#A9D0CD",edgecolor="none"))
    arrow(ax,(15.32,6.81),(15.78,6.81),color=AMBER)
    box(ax,15.8,6.37,.68,.88,"next\ntoken",fc=SAND,ec=AMBER,fs=12,bold=True,lw=1.6)
    arrow(ax,(16.13,6.30),(2.75,5.45),color=AMBER,lw=2.2,rad=-.28)
    ax.text(9.3,4.55,"append prediction to the prefix → repeat",ha="center",fontsize=16,color=AMBER,fontweight="bold")
    ax.text(8.36,2.35,r"$p_\theta(y_{1:T}\mid x)=\prod_{t=1}^{T}p_\theta(y_t\mid x,y_{<t})$",ha="center",fontsize=28,color=INK)
    ax.text(8.36,1.25,"For Part I, the entire network can be treated as a fixed differentiable receiver  $f_{\\theta_0}$.",ha="center",fontsize=18,color=MUTED)
    save(fig,"transformer_autoregressive.jpg")


def lora():
    fig, ax = setup_ax()
    ax.text(.9,4.95,"x",fontsize=30,color=INK,fontweight="bold",ha="center",va="center")
    ax.add_patch(Circle((1.55,4.95),.06,color=INK)); arrow(ax,(1.0,4.95),(1.48,4.95),color=INK)
    box(ax,3.0,5.25,4.15,2.0,"",fc="#F4F6F6",ec=MUTED,fs=16,lw=2)
    ax.text(5.07,6.75,"W",ha="center",fontsize=33,color=INK,fontweight="bold")
    ax.text(5.07,5.72,"pretrained · frozen",ha="center",fontsize=15,color=MUTED)
    for i in range(7): ax.plot([3.25+i*.53,3.25+i*.53],[5.4,7.05],color=LINE,lw=.7)
    for j in range(4): ax.plot([3.15,7.0],[5.55+j*.40,5.55+j*.40],color=LINE,lw=.7)
    arrow(ax,(1.58,4.98),(2.98,6.2),color=MUTED,lw=2)
    box(ax,3.25,2.35,1.55,1.25,"A",fc=SAND,ec=AMBER,fs=28,bold=True,lw=2)
    box(ax,5.35,2.05,1.25,1.85,"B",fc=SAND,ec=AMBER,fs=28,bold=True,lw=2)
    arrow(ax,(1.58,4.92),(3.22,2.97),color=AMBER,lw=2.2)
    arrow(ax,(4.82,2.97),(5.32,2.97),color=AMBER,lw=2.2)
    ax.text(4.98,3.28,r"$r\ll d$",ha="center",fontsize=18,color=AMBER,fontweight="bold")
    ax.text(4.95,1.55,"trainable low-rank branch",ha="center",fontsize=15,color=AMBER,fontweight="bold")
    ax.add_patch(Circle((9.0,4.95),.43,facecolor=WHITE,edgecolor=INK,linewidth=2)); ax.text(9.0,4.95,"+",ha="center",va="center",fontsize=28,color=INK)
    arrow(ax,(7.18,6.2),(8.65,5.17),color=MUTED,lw=2.1)
    arrow(ax,(6.62,2.95),(8.65,4.74),color=AMBER,lw=2.1)
    arrow(ax,(9.45,4.95),(10.45,4.95),color=TEAL,lw=2.2)
    ax.text(10.82,4.95,"h",fontsize=30,color=INK,fontweight="bold",va="center")
    ax.text(13.5,6.25,r"$W' = W + \Delta W$",ha="center",fontsize=28,color=INK)
    ax.text(13.5,5.15,r"$\Delta W = \frac{\alpha}{r}BA$",ha="center",fontsize=31,color=AMBER)
    box(ax,11.55,2.15,4.1,1.55,"rank controls geometry\nnot serialized bit-rate",fc=PALE,ec=TEAL,fs=18,bold=True,lw=2)
    save(fig,"lora_classic.jpg")


def qlora():
    fig, ax = setup_ax()
    box(ax,.7,4.65,1.75,1.05,"minibatch",fc=WHITE,ec=LINE,fs=18,bold=True,lw=1.8)
    arrow(ax,(2.48,5.18),(3.2,5.18),color=TEAL)
    box(ax,3.25,3.35,4.5,3.55,"",fc=PALE,ec=TEAL,fs=16,lw=2.2)
    ax.text(5.5,6.43,"4-bit frozen backbone",ha="center",fontsize=24,color=INK,fontweight="bold")
    ax.text(5.5,5.98,"NF4 weight storage",ha="center",fontsize=15,color=MUTED)
    for j in range(4):
        yy=4.0+j*.43
        box(ax,3.75,yy,3.5,.30,"Transformer block",fc="#F7FBFA",ec=LINE,fs=11,lw=.9,radius=.04)
    arrow(ax,(7.8,5.18),(8.55,5.18),color=TEAL,lw=2.3)
    box(ax,8.6,4.55,1.65,1.25,"dequantize\nfor compute",fc=WHITE,ec=LINE,fs=16,bold=True,lw=1.8)
    arrow(ax,(10.28,5.18),(11.0,5.18),color=TEAL,lw=2.3)
    box(ax,11.05,4.25,2.15,1.85,"forward\nactivations",fc=PALE,ec=TEAL,fs=18,bold=True,lw=2)
    box(ax,4.0,1.45,3.0,1.25,"LoRA A, B\ntrainable",fc=SAND,ec=AMBER,fs=19,bold=True,lw=2.2)
    arrow(ax,(7.0,2.08),(11.0,4.55),color=AMBER,lw=2.2,rad=-.08)
    ax.text(8.6,2.65,"adapter contribution",fontsize=14,color=AMBER,fontweight="bold")
    box(ax,14.0,4.55,1.65,1.25,"loss",fc=WHITE,ec=LINE,fs=18,bold=True,lw=1.8)
    arrow(ax,(13.25,5.18),(13.95,5.18),color=TEAL,lw=2.2)
    arrow(ax,(14.8,4.45),(5.5,2.75),color=AMBER,lw=2.3,rad=.12,ls="--")
    ax.text(10.2,1.2,"backpropagation → update LoRA only",fontsize=16,color=AMBER,fontweight="bold",ha="center")
    ax.text(5.5,3.02,"FROZEN",fontsize=16,color=TEAL,fontweight="bold",ha="center")
    ax.text(14.1,2.3,"Our later question:\nfix one trained adapter,\ncompress its representation,\nreload and score behavior.",fontsize=17,color=INK,ha="center",va="center")
    save(fig,"qlora_classic.jpg")


def quantization():
    fig, ax = setup_ax()
    xs=np.linspace(-2.6,2.6,300); ys=np.exp(-xs**2/1.25); ys=2.4*ys/ys.max()+3.0
    ax.plot(1.0+(xs+2.6)*.9,ys,color=TEAL,lw=3)
    ax.text(3.25,6.15,"FP weights",fontsize=20,color=INK,fontweight="bold",ha="center")
    sample=np.array([-2.3,-1.9,-1.4,-.9,-.55,-.1,.2,.65,1.1,1.7,2.15])
    sy=np.exp(-sample**2/1.25); sy=2.4*sy/sy.max()+3.0
    sx=1.0+(sample+2.6)*.9
    ax.scatter(sx,sy,s=40,color=TEAL,zorder=5)
    levels=np.linspace(-2,1.75,16)
    codes=[format(i,'04b') for i in range(16)]
    xlev=8.1
    ax.text(xlev,7.1,"16 levels",ha="center",fontsize=19,color=INK,fontweight="bold")
    for i,(lv,code) in enumerate(zip(levels[::-1],codes[::-1])):
        yy=1.45+i*.33
        col=plt.cm.GnBu(.25+.65*i/15)
        ax.add_patch(Rectangle((xlev-.22,yy-.12),.44,.24,facecolor=col,edgecolor=WHITE,linewidth=.4))
        ax.text(xlev+.42,yy,f"{lv:+.2f}",va="center",fontsize=10,color=MUTED)
        ax.text(10.55,yy,code,va="center",ha="center",fontsize=10,color=INK,family="monospace")
    ax.text(10.55,7.1,"4-bit code",ha="center",fontsize=19,color=INK,fontweight="bold")
    for idx in [0,2,4,6,8,10]:
        val=sample[idx]; nearest=int(np.argmin(abs(levels-val))); yy=1.45+(15-nearest)*.33
        arrow(ax,(sx[idx]+.08,sy[idx]),(xlev-.28,yy),color=MUTED,lw=1.2)
    ax.text(13.85,7.1,"dequantized value",ha="center",fontsize=19,color=INK,fontweight="bold")
    for i,lv in enumerate(levels[::-1]):
        yy=1.45+i*.33
        arrow(ax,(10.95,yy),(12.75,yy),color=LINE,lw=1.0)
        ax.text(13.85,yy,f"{lv:+.2f}",va="center",ha="center",fontsize=10,color=MUTED)
    box(ax,14.85,3.2,1.3,1.65,"scale\n+\nmetadata",fc=SAND,ec=AMBER,fs=16,bold=True,lw=1.8)
    save(fig,"quantization_4bit.jpg")


def crop_report():
    if not REPORT.exists():
        raise FileNotFoundError(f"Expected final report at {REPORT}")
    doc=fitz.open(REPORT)
    clips={
      'fig_rmse.pdf':(11,(72,72,543,245)),
      'fig_distinct_rate.pdf':(12,(80,145,535,300)),
      'fig_content_diversity.pdf':(12,(80,500,535,650)),
      'fig_known_info.pdf':(13,(175,285,455,485)),
      'table_model_rate.pdf':(14,(155,120,455,205)),
      'fig_diversity_replication.pdf':(14,(80,475,535,640)),
      'table_predictors.pdf':(15,(77,405,535,492)),
      'fig_container_controls.pdf':(16,(92,72,538,430)),
      'fig_solution_object.pdf':(18,(135,220,480,370)),
      'fig_objective_matrices.pdf':(19,(78,82,538,235)),
      'fig_closed_loop_regret.pdf':(20,(90,190,525,380)),
      'fig_native_handoff.pdf':(21,(70,70,540,210)),
      'fig_state_rate.pdf':(21,(150,545,485,715)),
      'fig_surface_depth.pdf':(22,(75,120,535,252)),
      'fig_recursive_reliability.pdf':(22,(170,395,445,550)),
      'fig_reasoning_answer_rate.pdf':(23,(80,490,540,642)),
    }
    for name,(pno,bbox) in clips.items():
        page=doc[pno-1]; r=fitz.Rect(*bbox)&page.rect
        nd=fitz.open(); npg=nd.new_page(width=r.width,height=r.height)
        npg.show_pdf_page(npg.rect,doc,pno-1,clip=r)
        nd.save(ASSETS/name,garbage=4,deflate=True); nd.close()


def main():
    transformer(); lora(); qlora(); quantization(); crop_report()
    print(f"Generated presentation assets in {ASSETS}")

if __name__ == '__main__': main()
