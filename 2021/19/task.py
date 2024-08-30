import numpy as np

def task1(input_lines: list[str]):
    beacons: list[list[int]] = []
    for line in input_lines:
        if line == '':
            continue
        if line.startswith('--'):
            beacons.append([])
            continue
        beacons[len(beacons)-1].append([eval(i) for i in line.split(',')])
    
    rots = ((generate_all_rotations()))
    found = []
    for r in rots:
        v = np.ndarray.tolist(np.matmul(r,[1,0,0]))
        if v in found:
            print(v)
        else:
            found.append(v)

    
        

def task2(input_lines: list[str]):
    print("Unimplemented")

def generate_all_rotations():
    xRot = [
        [[1,0,0],[0,0,-1],[0,-1,0]],
        [[1,0,0],[0,-1,0],[0,0,-1]],
        [[1,0,0],[0,0,1],[0,-1,0]]
    ]
    yRot = [
        [[0,0,1],[0,1,0],[-1,0,0]],
        [[-1,0,0],[0,1,0],[0,0,-1]],
        [[0,0,-1],[0,1,0],[1,0,0]]
    ]
    zRot = [
        [[0,-1,0],[1,0,0],[0,0,1]],
        [[-1,0,0],[0,-1,0],[0,0,1]],
        [[0,1,0],[-1,0,0],[0,0,1]]
    ]
    rots = [np.array([[1,0,0],[0,1,0],[0,0,1]])]
    for x in xRot:
        rots.append(np.array(x))
    for x in yRot:
        rots.append(np.array(x))
    for x in zRot:
        rots.append(np.array(x))
    for y in yRot:
        rots.append(np.matmul())
