LATEXMK=latexmk

all: slides notes

slides:
	$(LATEXMK) -lualatex -interaction=nonstopmode -halt-on-error -jobname=soutenance main.tex

notes:
	$(LATEXMK) -lualatex -interaction=nonstopmode -halt-on-error -jobname=soutenance-notes notes.tex

clean:
	$(LATEXMK) -C
	rm -f soutenance*.bbl soutenance*.bcf soutenance*.run.xml
