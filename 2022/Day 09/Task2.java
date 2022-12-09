import java.io.File;
import java.util.*;

public class Task2 {

    static List<int[]> treeHeights = new ArrayList<>();
    static int[][] score;

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
            calcScore();
            System.out.println(getHeighestScore());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    static void calcScore() {
        score = new int[treeHeights.size()][treeHeights.get(0).length];
        // set edges visible
        for (int i = 0; i < treeHeights.size(); i++) {
            score[i][0] = 0;
            score[i][treeHeights.get(i).length - 1] = 0;
        }
        for (int i = 0; i < treeHeights.get(0).length; i++) {
            score[0][i] = 0;
            score[treeHeights.size() - 1][i] = 0;
        }

        // set inside
        for (int x = 1; x < treeHeights.size() - 1; x++) {
            for (int y = 1; y < treeHeights.get(x).length - 1; y++) {
                int x1 = x;
                int y1 = y;
                int x2 = treeHeights.size() - x-1;
                int y2 = treeHeights.get(x).length - y-1;

                for (int i = x - 1; i >= 0; i--) {
                    if (treeHeights.get(i)[y] >= treeHeights.get(x)[y]) {
                        x1 = x-i;
                        break;
                    }
                }

                for (int i = x + 1; i < treeHeights.size(); i++) {
                    if (treeHeights.get(i)[y] >= treeHeights.get(x)[y]) {
                        x2 = i-x;
                        break;
                    }
                }

                for (int i = y - 1; i >= 0; i--) {
                    if (treeHeights.get(x)[i] >= treeHeights.get(x)[y]) {
                        y1 = y-i;
                        break;
                    }
                }

                for (int i = y + 1; i < treeHeights.get(x).length; i++) {
                    if (treeHeights.get(x)[i] >= treeHeights.get(x)[y]) {
                        y2 = i-y;
                        break;
                    }
                }
                score[x][y] = x1 * y1 * x2 * y2;
            }
        }
    }

    static int getHeighestScore() {
        int heighestScore = 0;
        for (int[] ints : score) {
            for (int anInt : ints) {
                if (anInt > heighestScore) {
                    heighestScore = anInt;
                }
            }
        }
        return heighestScore;
    }

}


