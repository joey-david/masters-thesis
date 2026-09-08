LATEXMK = latexmk -lualatex -interaction=nonstopmode -halt-on-error

.PHONY: all slides notes assets clean

all: slides notes

slides:
	$(LATEXMK) -jobname=soutenance main.tex

notes:
	$(LATEXMK) -jobname=soutenance-notes notes.tex

assets:
	python3 generate_assets.py

clean:
	rm -f soutenance.aux soutenance.bbl soutenance.bcf soutenance.blg soutenance.fdb_latexmk soutenance.fls soutenance.log soutenance.nav soutenance.out soutenance.run.xml soutenance.snm soutenance.toc soutenance.vrb
	rm -f soutenance-notes.aux soutenance-notes.bbl soutenance-notes.bcf soutenance-notes.blg soutenance-notes.fdb_latexmk soutenance-notes.fls soutenance-notes.log soutenance-notes.nav soutenance-notes.out soutenance-notes.run.xml soutenance-notes.snm soutenance-notes.toc soutenance-notes.vrb
