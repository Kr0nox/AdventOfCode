import numpy as np

def task1(input_lines: list[str]):
    input = input_lines[0].split(", ")
    x = 0
    y = 0
    dir = 1 + 0*1j
    for i in input:
        if i[0] == 'L':
            dir *= 1j
        else:
            dir *= -1j
        x += np.real(dir) * int(i[1:])
        y += np.imag(dir) * int(i[1:])
    
    print(int(abs(x)+abs(y)))



def task2(input_lines: list[str]):
    input = input_lines[0].split(", ")
    x = 0
    y = 0
    dir = 1 + 0*1j
    visited={(0,0)}
    for i in input:
        if i[0] == 'L':
            dir *= 1j
        else:
            dir *= -1j
        d = int(i[1:])
        for i in range(0,d):
            x += np.real(dir)
            y += np.imag(dir)
            if (x,y) in visited:
                print(int(abs(x)+abs(y)))
                return
            visited.add((x,y))