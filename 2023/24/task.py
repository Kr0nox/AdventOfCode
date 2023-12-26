import re
from sympy import Symbol
from sympy import solve_poly_system


def task1(input_lines: list[str]):
    print("Unimplemented")

def task2(input_lines: list[str]):
    lines = list(map(lambda i: list(map(int, i)), list(map(lambda i: re.match("(-?[0-9]+), (-?[0-9]+), (-?[0-9]+) @ (-?[0-9]+), (-?[0-9]+), (-?[0-9]+)", i).groups(), input_lines[:3]))))
    px = Symbol('px')
    py = Symbol('py')
    pz = Symbol('pz')
    vx = Symbol('vx')
    vy = Symbol('vy')
    vz = Symbol('vz')
    ts = [Symbol('t'+str(i)) for i in range(3)]
    equations = []

    for i, l in enumerate(lines):
        equations.append(px + vx * ts[i] - l[0] - l[3] * ts[i])
        equations.append(py + vy * ts[i] - l[1] - l[4] * ts[i])
        equations.append(pz + vz * ts[i] - l[2] - l[5] * ts[i])
    
    result = solve_poly_system(equations, px, py, pz, vx, vy, vz, *ts)
    print(result[0][0] + result[0][1] + result[0][2])