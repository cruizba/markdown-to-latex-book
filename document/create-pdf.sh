pandoc book.md -V geometry:margin=1.25in -V fontsize=11pt --bibliography bibliography.bib --csl ieee.csl --toc --include-in-header titlesec.tex --number-sections -o book.pdf
