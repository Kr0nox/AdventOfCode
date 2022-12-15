import java.io.File;
import java.util.*;

public class Task2 {

    static List<Point> sensors = new ArrayList<>();
    static List<Point> beacons = new ArrayList<>();
    static long MIN_X = 10000000;
    static long MAX_X = 0;
    static long MIN_Y = 10000000;
    static long MAX_Y = 0;

    public static void main(String[] args) {
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine().replace(" ", "").substring(10);
                String[] sp = line.split(",y=|:", 3);
                String[] bp = sp[2].substring(19).split(",y=");//b[1].split(",y=");
                sensors.add(new Point(Long.parseLong(sp[0]), Long.parseLong(sp[1])));
                beacons.add(new Point(Long.parseLong(bp[0]), Long.parseLong(bp[1])));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        long SIZE = 4000000;
        // save lines as points on y-axis
        long[] downLines = new long[sensors.size() * 2];
        long[] upLines = new long[sensors.size() * 2];
        for (int i = 0; i < beacons.size(); i++) {
            long mDist = beacons.get(i).manhattanDistance(sensors.get(i));
            Point sensor = sensors.get(i);
            downLines[i * 2] = sensor.y + sensor.x - mDist;
            downLines[i * 2 + 1] = sensor.y + sensor.x + mDist;
            upLines[i * 2] = sensor.y - sensor.x - mDist;
            upLines[i * 2 + 1] = sensor.y - sensor.x + mDist;
        }

        // find parallel lines with distance 2
        List<Long> downLinePairs = new ArrayList<>();
        List<Long> upLinePairs = new ArrayList<>();
        for (int i = 0; i < downLines.length; i ++) {
            for (int j = 0; j < downLines.length; j++) {
                long d = downLines[i] - downLines[j];
                if (d == 2) {
                    downLinePairs.add(downLines[i]);
                } else if (d == -2) {
                    downLinePairs.add(downLines[j]);
                }

                long u = upLines[i] - upLines[j];
                if (u == 2) {
                    upLinePairs.add(upLines[i]);
                } else if (u == -2) {
                    upLinePairs.add(upLines[j]);
                }
            }
        }

        // find intersections
        Set<Point> intersections = new HashSet<>();
        for (long p : downLinePairs) {
            for (long q : upLinePairs) {
                long x = (p - q) / 2;
                long y = p - x - 1;
                if (x > SIZE || y > SIZE || x < 0 || y < 0) {
                    continue;
                }
                intersections.add(new Point(x, y));
            }
        }
        for (Point p : intersections) {
            boolean valid = true;
            for (int i = 0; i < sensors.size(); i++) {
                long mDist = beacons.get(i).manhattanDistance(sensors.get(i));
                if (p.manhattanDistance(sensors.get(i)) <= mDist) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                System.out.println(p);
            }
        }
    }

    static class Point {
        long x;
        long y;

        public Point(long x, long y) {
            this.x = x;
            this.y = y;
        }

        long manhattanDistance(Point p) {
            return abs(x - p.x) + abs(y - p.y);
        }

        @Override
        public boolean equals(Object obj) {
            return obj instanceof Point && ((Point) obj).x == x && ((Point) obj).y == y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }

        @Override
        public String toString() {
            return "x=" + x + ",y=" + y + " | " + (x * 4000000 + y);
        }
    }

    static class Pair {
        int a;
        int b;

        public Pair(int x, int y) {
            this.a = x;
            this.b = y;
        }
    }

    static long abs(long a) {
        return a < 0 ? -a : a;
    }

    static long max(long a, long b, long c) {
        return Math.max(Math.max(a, b), c);
    }

    static long min(long a, long b, long c) {
        return Math.min(Math.min(a, b), c);
    }

}


