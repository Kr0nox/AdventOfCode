import java.io.File;
import java.util.*;

public class Task2 {

    static int[][][] matrix;

    public static void main(String[] args) {
        List<Integer> x = new ArrayList<>();
        List<Integer> y = new ArrayList<>();
        List<Integer> z = new ArrayList<>();
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String[] line = scanner.nextLine().split(",");
                x.add(Integer.parseInt(line[0]));
                y.add(Integer.parseInt(line[1]));
                z.add(Integer.parseInt(line[2]));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        int maxX = x.stream().max(Integer::compareTo).get();
        int maxY = y.stream().max(Integer::compareTo).get();
        int maxZ = z.stream().max(Integer::compareTo).get();
        int minX = x.stream().min(Integer::compareTo).get();
        int minY = y.stream().min(Integer::compareTo).get();
        int minZ = z.stream().min(Integer::compareTo).get();

        matrix = new int[maxX - minX + 4][maxY - minY + 4][maxZ - minZ + 4];
        for (int i = 0; i < x.size(); i++) {
            matrix[x.get(i) + 2 - minX][y.get(i) + 2 - minY][z.get(i) + 2 - minZ] = 1;
        }

        // fill border of matrix with 2
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                matrix[i][j][0] = 2;
            }
        }
        int reps = (int)Math.pow(Math.max(maxX, Math.max(maxY, maxZ)) + 2, 3);
        for (int r = 0; r < reps; r++) {
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[i].length; j++) {
                    for (int k = 0; k < matrix[i][j].length; k++) {
                        if (matrix[i][j][k] == 2) {
                            setTwo(i-1, j, k);
                            setTwo(i+1, j, k);
                            setTwo(i, j-1, k);
                            setTwo(i, j+1, k);
                            setTwo(i, j, k-1);
                            setTwo(i, j, k+1);
                        }
                    }
                }
            }
        }

        int count = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                for (int k = 0; k < matrix[i][j].length; k++) {
                    if (matrix[i][j][k] == 1) {
                        count += checkNeighbours(i, j, k);
                    }
                }
            }
        }

        System.out.println(count);
    }

    static boolean checkNeighbour(int x, int y, int z) {
        if (x < 0 || y < 0 || z < 0) {
            return true;
        }
        if (x >= matrix.length || y >= matrix[x].length || z >= matrix[x][y].length) {
            return true;
        }
        return matrix[x][y][z] == 2;
    }

    static int checkNeighbours(int x, int y, int z) {
        int count = 0;
        count += checkNeighbour(x -1, y, z) ? 1:0;
        count += checkNeighbour(x +1, y, z) ? 1:0;
        count += checkNeighbour(x, y -1, z) ? 1:0;
        count += checkNeighbour(x, y +1, z) ? 1:0;
        count += checkNeighbour(x, y, z -1) ? 1:0;
        count += checkNeighbour(x, y, z +1) ? 1:0;
        return count;
    }

    static void setTwo(int x, int y, int z) {
        if (x < 0 || y < 0 || z < 0) {
            return;
        }
        if (x >= matrix.length || y >= matrix[x].length || z >= matrix[x][y].length) {
            return;
        }
        if (matrix[x][y][z] == 0) {
            matrix[x][y][z] = 2;
        }
    }
}