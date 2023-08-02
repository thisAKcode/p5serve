import os
import re


file_path = 'C:/p5serve/stuff2.html' 
with open(file_path, 'r') as file:
    content = file.read()
pattern = r'<div id="container">.*?</div><br>'
match = re.search(pattern, content, re.DOTALL)
extracted_block = match.group()
print(extracted_block)

my_directory = f'c:/p5serve/sketches' 
entries = os.listdir(my_directory)
print(entries)
