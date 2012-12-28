.PHONY: all init local clean

all: clean init
	python server.py 8888 localhost:3306 bwitter root "" local

init:
	pip install -r requirements.txt

clean:
	rm -rf dist *egg*
