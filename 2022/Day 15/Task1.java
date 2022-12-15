import java.io.File;
import java.util.*;

public class Task1 {

    static List<Point> sensors = new ArrayList<>();
    static List<Point> beacons = new ArrayList<>();
    static int MIN_X = 10000000;
    static int MAX_X = 0;
    static int MIN_Y = 10000000;
    static int MAX_Y = 0;

    public static void main(String[] args) {
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine().replace(" ", "").substring(10);
                String[] sp = line.split(",y=|:", 3);
                String[] bp = sp[2].substring(19).split(",y=");//b[1].split(",y=");
                sensors.add(new Point(Integer.parseInt(sp[0]), Integer.parseInt(sp[1])));
                beacons.add(new Point(Integer.parseInt(bp[0]), Integer.parseInt(bp[1])));

                MIN_X = min(MIN_X, Integer.parseInt(sp[0]), Integer.parseInt(bp[0]));
                MAX_X = max(MAX_X, Integer.parseInt(sp[0]), Integer.parseInt(bp[0]));
                MIN_Y = min(MIN_Y, Integer.parseInt(sp[1]), Integer.parseInt(bp[1]));
                MAX_Y = max(MAX_Y, Integer.parseInt(sp[1]), Integer.parseInt(bp[1]));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        int ROW_INDEX = 2000000;
        boolean[] row = new boolean[10*(MAX_X)];
        for (int i = 0; i < beacons.size(); i++) {
            int mDist = beacons.get(i).manhattanDistance(sensors.get(i));
            for (int x = 0 - 5*MAX_X; x <= row.length; x++) {
                if (sensors.get(i).manhattanDistance(new Point(x, ROW_INDEX)) <= mDist) {
                    row[x + 5*MAX_X] = true;
                }
            }
        }
        int count = - beacons.stream().filter(b -> b.y == ROW_INDEX).distinct().toList().size();
        for (boolean b : row) {
            if (b) {
                count++;
            }
        }
        System.out.println(count);
    }

    static class Point {
        int x;
        int y;

        public Point(int x, int y) {
            this.x = x;
            this.y = y;
        }

        int manhattanDistance(Point p) {
            return Math.abs(x - p.x) + Math.abs(y - p.y);
        }

        @Override
        public boolean equals(Object obj) {
            return obj instanceof Point && ((Point) obj).x == x && ((Point) obj).y == y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    static int max(int a, int b, int c) {
        return Math.max(Math.max(a, b), c);
    }

    static int min(int a, int b, int c) {
        return Math.min(Math.min(a, b), c);
    }

}


