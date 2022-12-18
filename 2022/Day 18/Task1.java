import java.io.File;
import java.util.*;

public class Task1 {

    static boolean[][][] matrix;

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

        matrix = new boolean[maxX + 1][maxY + 1][maxZ + 1];
        for (int i = 0; i < x.size(); i++) {
            matrix[x.get(i)][y.get(i)][z.get(i)] = true;
        }
        int count = 0;
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                for (int k = 0; k < matrix[i][j].length; k++) {
                    if (matrix[i][j][k]) {
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
        return !matrix[x][y][z];
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

}