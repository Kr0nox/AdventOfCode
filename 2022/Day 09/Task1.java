import java.io.File;
import java.util.*;

public class Task1 {

    static Set<Point> tailPoints = new HashSet<>();
    static Rope rope = new Rope(10);

    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String input = scanner.nextLine();
                String[] inputArray = input.split(" ");
                int steps = Integer.parseInt(inputArray[1]);
                for (int i = 0; i < steps; i++) {
                    tailPoints.add(rope.getTail());
                    switch (inputArray[0]) {
                        case "U" -> rope.moveHead(0, 1);
                        case "D" -> rope.moveHead(0, -1);
                        case "L" -> rope.moveHead(-1, 0);
                        case "R" -> rope.moveHead(1, 0);
                    }
                }
            }
            tailPoints.add(rope.getTail());
            System.out.println(tailPoints.size());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    static class Rope {
        Point[] points;

        public Rope(int length) {
            points = new Point[length];
            for (int i = 0; i < length; i++) {
                points[i] = new Point(0, 0);
            }
        }

        void moveHead(int x, int y) {
            points[0].x += x;
            points[0].y += y;
            for (int i = 1; i < points.length; i++) {
                points[i] = points[i].getStepTowards(points[i - 1]);
            }
        }

        Point getTail() {
            return points[points.length - 1];
        }
    }

    static class Point {
        int x;
        int y;
        Point(int x, int y) {
            this.x = x;
            this.y = y;
        }

        boolean areTouching(Point p) {
            return (Math.abs(this.x - p.x) <= 1 && Math.abs(this.y - p.y) <= 1);
        }

        Point getStepTowards(Point p) {
            if (areTouching(p)) {
                return this;
            }
            return new Point(this.x + sign(p.x - this.x), this.y + sign(p.y - this.y));

        }

        Point copy() {
            return new Point(this.x, this.y);
        }

        @Override
        public boolean equals(Object obj) {
            if (obj == this) {
                return true;
            }
            if (!(obj instanceof Point)) {
                return false;
            }
            Point p = (Point) obj;
            return (this.x == p.x && this.y == p.y);
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    static int sign(int value) {
        return value == 0 ? 0 : value / Math.abs(value);
    }

}


