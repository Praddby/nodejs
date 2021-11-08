# Task 1: Ciphering CLI Tool

> The main file to run the App: _`index.js`_.

> You can check the status code after exiting using _`echo $?`_ (if you use Git Bash).

> The **`input.txt`** file includes the text for the test from the task: _`This is secret. Message about "_" symbol!`\_.

> **`Output.txt`** file exists and is empty.

### CLI tool should accept 3 options (short alias and full name):

1. **`-c, --config`**: config for ciphers Config is a string with pattern {XY(-)}n, where:
   - `X` is a cipher mark:
     - `C` is for Caesar cipher (with shift 1)
     - `A` is for Atbash cipher
     - `R` is for ROT-8 cipher
   - `Y` is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
     - `1` is for encoding
     - `0` is for decoding
2. **`-i, --input`**: a path to input file
3. **`-o, --output`**: a path to output file

### To run the App:

1. You need to clone this [GitHub](https://github.com/Praddby/nodejs/tree/task-1/ciphering-cli-tool).
2. Open _`Git Bash`_ in directory of App (where you created clone).
3. Then enter follow at the command line and other examples from the task:
   - _`node index -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"`_;
   - _`node index -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"`_;
   - _`node index -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"`_;
   - _`node index -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"`_.
