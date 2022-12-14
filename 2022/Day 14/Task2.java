import java.io.File;
import java.util.*;

public class Task2 {

    static List<List<Point>> input = new ArrayList<>();
    static int MIN_X = 500;
    static int MAX_X = 500;
    static int MAX_Y = 0;
    static boolean[][] grid;

    public static void main(String[] args) {
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine().replace(" ", "");
                String[] points = line.split("->");
                List<Point> list = new ArrayList<>();
                for (String point : points) {
                    String[] coordinates = point.split(",");
                    if (Integer.parseInt(coordinates[0]) < MIN_X) {
                        MIN_X = Integer.parseInt(coordinates[0]);
                    }
                    if (Integer.parseInt(coordinates[0]) > MAX_X) {
                        MAX_X = Integer.parseInt(coordinates[0]);
                    }
                    if (Integer.parseInt(coordinates[1]) > MAX_Y) {
                        MAX_Y = Integer.parseInt(coordinates[1]);
                    }
                    list.add(new Point(Integer.parseInt(coordinates[0]), Integer.parseInt(coordinates[1])));
                }
                input.add(list);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        grid = new boolean[MAX_X - MIN_X + MAX_Y + MAX_Y + 6][MAX_Y + 5];
        MIN_X -= MAX_Y + 3;
        input.add(Arrays.asList(new Point(MIN_X, MAX_Y + 2), new Point(grid.length+MIN_X-1, MAX_Y + 2)));
        for (List<Point> ps : input) {
            placeRock(ps);
        }
        int count = 0;
        while (!moveSand()) {
            count++;
        }
        System.out.println(count);
    }

    static void placeRock(List<Point> points) {
        for (int i = 0; i < points.size() - 1; i++) {
            Point p1 = points.get(i);
            Point p2 = points.get(i + 1);
            if (p1.x == p2.x) {
                for (int j = Math.min(p1.y,p2.y); j <= Math.max(p1.y,p2.y); j++) {
                    grid[p1.x - MIN_X][j] = true;
                }
            } else {
                for (int j = Math.min(p1.x, p2.x); j <= Math.max(p1.x,p2.x); j++) {
                    grid[j - MIN_X][p1.y] = true;
                }
            }
        }
    }

    static boolean moveSand() {
        Point p1 = new Point(500 - MIN_X, 0);
        if (grid[p1.x][p1.y]) {
            return true;
        }
        while (true) {
            if (!grid[p1.x][p1.y + 1]) {
                p1.y++;
            } else if (!grid[p1.x - 1][p1.y + 1]) {
                p1.x--;
                p1.y++;
            } else if (!grid[p1.x +1][p1.y + 1]) {
                p1.x++;
                p1.y++;
            } else {
                grid[p1.x][p1.y] = true;
                return false;
            }
        }
    }

    static class Point {
        int x;
        int y;

        public Point(int x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public boolean equals(Object obj) {
            return obj instanceof Point && ((Point) obj).x == x && ((Point) obj).y == y;
        }
    }

    static void printGrid() {
        for (int i = 0; i < grid[0].length; i++) {
            for (int j = 0; j < grid.length; j++) {
                if (i == 0 && j == 500 - MIN_X) {
                    System.out.print("+");
                } else {
                    System.out.print(grid[j][i] ? "#" : ".");
                }
            }
            System.out.println();
        }
    }

}


