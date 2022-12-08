import java.io.File;
import java.util.*;

public class Task1 {

    static List<int[]> treeHeights = new ArrayList<>();
    static boolean[][] visible;

    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String input = scanner.nextLine();
                int[] heights = new int[input.length()];
                for (int i = 0; i < input.length(); i++) {
                    heights[i] = Integer.parseInt(input.charAt(i) + "");
                }
                treeHeights.add(heights);
            }
            calcVisible();
            System.out.println(countVisible());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    static void calcVisible() {
        visible = new boolean[treeHeights.size()][treeHeights.get(0).length];
        // set edges visible
        for (int i = 0; i < treeHeights.size(); i++) {
            visible[i][0] = true;
            visible[i][treeHeights.get(i).length - 1] = true;
        }
        for (int i = 0; i < treeHeights.get(0).length; i++) {
            visible[0][i] = true;
            visible[treeHeights.size() - 1][i] = true;
        }

        // set inside
        for (int x = 1; x < treeHeights.size() - 1; x++) {
            for (int y = 1; y < treeHeights.get(x).length - 1; y++) {
                visible[x][y] = true;
                for (int i = 0; i < x; i++) {
                    if (treeHeights.get(i)[y] >= treeHeights.get(x)[y]) {
                        visible[x][y] = false;
                        break;
                    }
                }
                if (visible[x][y]) {
                    continue;
                }

                visible[x][y] = true;
                for (int i = x + 1; i < treeHeights.size(); i++) {
                    if (treeHeights.get(i)[y] >= treeHeights.get(x)[y]) {
                        visible[x][y] = false;
                        break;
                    }
                }
                if (visible[x][y]) {
                    continue;
                }

                visible[x][y] = true;
                for (int i = 0; i < y; i++) {
                    if (treeHeights.get(x)[i] >= treeHeights.get(x)[y]) {
                        visible[x][y] = false;
                        break;
                    }
                }
                if (visible[x][y]) {
                    continue;
                }

                visible[x][y] = true;
                for (int i = y + 1; i < treeHeights.get(x).length; i++) {
                    if (treeHeights.get(x)[i] >= treeHeights.get(x)[y]) {
                        visible[x][y] = false;
                        break;
                    }
                }
            }
        }
    }

    static int countVisible() {
        int count = 0;
        for (int i = 0; i < treeHeights.size(); i++) {
            for (int j = 0; j < treeHeights.get(i).length; j++) {
                if (visible[i][j]) {
                    count++;
                }
            }
        }
        return count;
    }

}


